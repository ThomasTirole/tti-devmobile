# 9️⃣.5️⃣ Synchronisation automatique avec Supabase

Maintenant que :
- ✅ les cartes sont stockées en local (SQLite),
- ✅ chaque action utilisateur est enregistrée dans une queue (Preferences),
- ✅ on sait détecter le réseau (chapitre 8),

... on peut implémenter la **synchronisation automatique**.

> 👉 Dans notre règle métier, on part sur une approche **local prioritaire** :
> la version locale (celle modifiée par l’utilisateur) est considérée comme la plus récente.

## 9️⃣.5️⃣.1️⃣ Créer un service de synchronisation : `syncService.ts`

Créez le fichier `src/services/syncService.ts`.

Ce service va :
- lire la queue (Preferences),
- exécuter chaque action sur Supabase,
- mettre à jour SQLite,
- retirer l'action de la queue si elle a réussie.

::: details Création du service de synchronisation `syncService.ts`
```ts [src/services/syncService.ts]
import { getQueue, removeFromQueue } from '@/services/offlineQueueService'
import { useAuthStore } from '@/stores/authStore'
import { useNetworkStore } from '@/stores/networkStore'

import {
    createCard,
    updateCard,
    deleteCard,
    fetchCards
} from '@/services/cardsService'

import { upsertManyLocalCards } from '@/services/cardsLocalService'

import type { OfflineAction } from '@/types/OfflineAction'
import type { CardInsert, CardUpdate, CardLocal } from '@/types/Card'

/**
 * Empêche plusieurs synchronisations en parallèle
 * (ex: réseau qui clignote online/offline)
 */
let isSyncing = false

/**
 * 🔄 Synchronise la queue offline vers Supabase
 *
 * Règles :
 * - ne fait rien si offline
 * - ne fait rien si pas connecté
 * - rejoue les actions dans l’ordre
 * - nettoie la queue si succès
 * - remet SQLite à jour depuis le cloud
 */
export async function syncOfflineQueue(): Promise<void> {
    if (isSyncing) return

    const network = useNetworkStore()
    const auth = useAuthStore()

    // ❌ Pas de réseau → pas de sync
    if (!network.connected) return

    // ❌ Pas d’utilisateur → pas de sync (RLS)
    if (!auth.user) return

    isSyncing = true

    try {
        const queue = await getQueue()

        // 1️⃣ Rejouer chaque action offline
        for (const action of queue) {
            await syncOneAction(action)
            await removeFromQueue(action.id)
        }

        // 2️⃣ Rafraîchir SQLite depuis Supabase
        // (on s’assure que le local reflète le cloud)
        const cloudCards = await fetchCards()
        await upsertManyLocalCards(cloudCards)
    } finally {
        isSyncing = false
    }
}

/**
 * 🔁 Synchronise UNE action vers Supabase
 * Approche : LOCAL PRIORITAIRE
 */
async function syncOneAction(action: OfflineAction): Promise<void> {
    switch (action.type) {
        case 'CREATE':
            await createCard(toCloudInsert(action.payload))
            return

        case 'UPDATE':
            await updateCard(
                action.payload.id,
                toCloudUpdate(action.payload)
            )
            return

        case 'DELETE':
            await deleteCard(action.payload.id)
            return
    }
}

/**
 * Omet des clés d’un objet (utilitaire)
 * → utile pour transformer CardLocal → CardInsert / CardUpdate
 * On évite les erreurs ESLint pour des attributs non utilisés. (Merci ChatGPT)
 */
function omit<T extends object, K extends keyof T>(obj: T, keys: readonly K[]) {
    const copy = { ...obj }
    for (const k of keys) delete copy[k]
    return copy as Omit<T, K>
}

/**
 * 🔄 CardLocal → CardInsert (CREATE cloud)
 *
 * - on garde l’id (offline-first)
 * - on enlève les champs locaux
 * - Supabase gère created_at / updated_at
 */
function toCloudInsert(local: CardLocal): CardInsert {
    // On enlève synced, created_at, updated_at avec la fonction omit (adieu ESLint)
    return omit(local, ['synced', 'created_at', 'updated_at'] as const) as CardInsert
}

/**
 * 🔄 CardLocal → CardUpdate (UPDATE cloud)
 *
 * - id passé séparément
 * - pas de synced
 * - updated_at géré par trigger Supabase
 */
function toCloudUpdate(local: CardLocal): CardUpdate {
    // On enlève synced, created_at, updated_at avec la fonction omit (adieu ESLint)
    return omit(local, ['id', 'synced', 'created_at', 'updated_at'] as const) as CardUpdate
}

```
:::

## 9️⃣.5️⃣.2️⃣ Déclencher la synchronisation au retour réseau
Si l'utilisateur est **offline** &rarr; il continue à travailler (SQLite + queue). Dès que le réseau revient (`connected = true`), on lance `syncOfflineQueue()`.
> On ne met pas cette logique  dans le store réseau. Le store garde l'état, l'UI (et la synchronisation) réagit dans `App.vue`.

::: details 1. Importer le service sync dans `App.vue`
```ts [src/App.vue]
import { syncOfflineQueue } from '@/services/syncService'
```
:::

::: details 2. Adapter le watcher sur `network.connected` d'affichage du toast.
```ts [src/App.vue]
watch(
    () => network.connected,
    async (connected) => {
        // Au premier run, on ne veut pas spammer un toast
        if (!hasInitialized) {
            hasInitialized = true
            return
        }

        if (!connected) {
            // 🔴 Offline
            await showToast('🔴 Réseau déconnecté (mode hors-ligne)')
            return
        }

        // 🟢 Online
        await showToast('🟢 Connecté au réseau')

        // ✅ Réseau revenu : on lance la synchronisation
        await syncOfflineQueue()
    }
)
```
:::

## 9️⃣.5️⃣.3️⃣ Synchroniser au démarrage si on est online
Pourquoi ?
Même sans changement de réseau, il peut exister une queue offline (actions faites hier / fermeture de l'app / crash). Donc si l'app démarre en ligne, on lance une synchronisation **une seule fois**.

::: details Ajouter un appel après l'initialisation
Dans `src/App.vue`, dans le `<script setup>`, ajoutez :
```ts [src/App.vue]
import { onMounted } from 'vue'
import { syncOfflineQueue } from '@/services/syncService'
import { useNetworkStore } from '@/stores/networkStore'
import { useAuthStore } from '@/stores/authStore'
```
Puis :
```ts [src/App.vue]
const network = useNetworkStore()
const auth = useAuthStore()

/**
* Au démarrage :
* - si on est online
* - et si un utilisateur est connecté
* => on tente une synchronisation (si queue vide, ça ne fait rien)
  */

onMounted(async () => {
    // Si l’app démarre avec du réseau,
    // on tente une synchronisation immédiate.
    // (si pas d’utilisateur ou queue vide → le service ne fait rien)
    if (network.connected) {
        await syncOfflineQueue()
    }
})
```
:::

## 9️⃣.5️⃣.4️⃣ Mettre à jour l'UI après synchronisation
Après une synchronisation, on souhaite que l'UI reflète l'état actuel des données (SQLite). Pour cela, on peut déclencher le rechargement des cartes locales.

1. `syncOfflineQueue()` synchronise la queue vers Supabase
2. Puis elle "rafraîchit" SQLite depuis le cloud.
3. Ensuite, on demande au store **de relire SQLite** &rarr; l'UI se met à jour.

::: details 1. Adapter le store de cartes `cardStore.ts`
1. Dans votre store de cartes `src/stores/cardStore.ts`, ajoutez la méthode `loadFromLocal()` &rarr; elle remplace en fait l'ancienne méthode `load()` qui servaient à récupérer les datas depuis Supabase quand on avait pas encore implémenté la synchro offline-online. 

2. De plus, nous allons profitez pour mettre à jour le store avec les nouveaux types importés (`CardLocal`, etc.).

3. Ensuite, nous créons une méthode `syncIfPossible()` qui va appeler `syncOfflineQueue()` si on est online et si un utilisateur est connecté. Ça permet de ce communiquer directement avec le backend après chaque action (ajout, modification, suppression) si on est en ligne. Nous ajoutons cete méthode dans chaque action du store (add, edit, remove).

4. Enfin, nous créons une petite fonction `refresh()` qui va permettre de forcer le rechargement des cartes depuis le backend puis SQLite (utile pour le pull-to-refresh dans l'UI).

Comme ça fait un peu beaucoup jusqu'à maintenant, je vous remets le code complet du store avec les modifications, parce qu'on est tous un peu des flemmards au fond. 😉

::: warning **⚠️ Important**
Le store **ne gère pas directement la queue offline**.
Les appels à `enqueue()` sont faits **dans `cardsLocalService`** (chapitre 9.4), afin de centraliser la logique offline-first et éviter les duplications.

```ts [src/stores/cardStore.ts]
import { defineStore } from 'pinia'
import { useNetworkStore } from '@/stores/networkStore'
import { useAuthStore } from '@/stores/authStore'
import type { CardInsert, CardLocal, CardUpdate } from '@/types/Card'

import {
    getAllLocalCards,
    createLocalCard,
    updateLocalCard,
    deleteLocalCard
} from '@/services/cardsLocalService'

import { syncOfflineQueue } from '@/services/syncService'

export const useCardsStore = defineStore('cards', {
    state: () => ({
        cards: [] as CardLocal[],
        loading: false,
        error: null as string | null
    }),

    actions: {
        /**
         * Source de vérité : SQLite
         */
        async loadFromLocal() {
            this.loading = true
            this.error = null

            try {
                this.cards = await getAllLocalCards()
            } catch (e: any) {
                this.error = e?.message ?? 'Erreur de chargement local'
            } finally {
                this.loading = false
            }
        },

        /**
         * Sync automatique si online
         */
        async syncIfPossible() {
            const network = useNetworkStore()
            const auth = useAuthStore()

            if (!network.connected) return
            if (!auth.user) return

            await syncOfflineQueue()
        },

        /**
         * Ajout offline-first
         * -> SQLite + queue (géré dans le service)
         */
        async add(payload: CardInsert) {
            this.error = null
            this.loading = true
            try {
                const now = new Date().toISOString()

                const localCard: CardLocal = {
                    id: crypto.randomUUID(),
                    ...payload,
                    created_at: now,
                    updated_at: now,
                    synced: 0
                }

                await createLocalCard(localCard)

                await this.syncIfPossible()
                await this.loadFromLocal()
            } catch (e: any) {
                this.error = e?.message ?? 'Erreur ajout'
            } finally {
                this.loading = false
            }
        },

        /**
         * Update offline-first
         */
        async edit(id: string, patch: CardUpdate) {
            this.error = null
            this.loading = true
            try {
                const current = this.cards.find(c => c.id === id)
                if (!current) return

                const updated: CardLocal = {
                    ...current,
                    ...patch,
                    synced: 0
                }

                await updateLocalCard(updated)
                await this.syncIfPossible()
                await this.loadFromLocal()
            } catch (e: any) {
                this.error = e?.message ?? 'Erreur mise à jour'
            } finally {
                this.loading = false
            }
        },

        /**
         * Delete offline-first
         */
        async remove(id: string) {
            this.error = null
            this.loading = true
            try {
                await deleteLocalCard(id)

                await this.syncIfPossible()
                await this.loadFromLocal()
            } catch (e: any) {
                this.error = e?.message ?? 'Erreur suppression'
            } finally {
                this.loading = false
            }
        },

        async refresh(): Promise<void> {
            this.error = null
            try {
                await this.syncIfPossible()
                await this.loadFromLocal()
            } catch (e: any) {
                this.error = e?.message ?? 'Erreur de rafraîchissement'
            }
        },

        async toggleFavorite(id: string) {
            const card = this.cards.find(c => c.id === id)
            if (!card) return
            await this.edit(id, { is_favorite: !card.is_favorite })
        },

        /**
         * Sync manuel (debug / bouton)
         */
        async syncNow() {
            await syncOfflineQueue()
            await this.loadFromLocal()
        }
    }
})
```
:::


::: details 2. Modifier l'appel au store dans `Tab1Page.vue`
Ici, on adapte les types des interfaces des Cards et on remplace l'appel à `store.load()` par `store.loadFromLocal()`. Aussi, on modifie notre pull-to-refresh pour utiliser la nouvelle méthode `refresh()` du store.
```ts [src/views/Tab1Page.vue]
/**
 * Composition API
 * - ref : pour des valeurs primitives (modalOpen, editing)
 * - reactive : pour l’objet form (plus pratique qu’un ref d’objet ici)
 */
import { reactive, ref, onMounted } from 'vue'
import { useCardsStore } from '@/stores/cardsStore'
// import type { Card, CardInsert, Rarity, Role } from '@/types/Card' // [!code --]
import type { CardLocal, CardInsert, Rarity, Role } from '@/types/Card' // [!code ++]
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

/**
 * Imports Ionic : uniquement ce qu’on utilise
 * (évite de tout importer “au hasard”)
 */
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonBadge, IonButton, IonButtons, IonText, IonSpinner,
  IonModal, IonItem, IonInput, IonSelect, IonSelectOption, IonToggle,
  IonGrid, IonRow, IonCol,
  IonRefresher, IonRefresherContent
} from '@ionic/vue'

/**
 * Store Pinia :
 * - store.cards = données
 * - store.loadFromLocal() = charge depuis SQLite
 */
const store = useCardsStore()

/** Ouverture/fermeture du modal */
const modalOpen = ref(false)

/**
 * editing = null => mode “create”
 * editing = Card => mode “edit”
 */
// const editing = ref<null | Card>(null) // [!code --]
const editing = ref<null | CardLocal>(null) // [!code ++]

/**
 * Formulaire (valeurs par défaut).
 * Type CardInsert = tous les champs nécessaires à l’insertion.
 */
const form = reactive<CardInsert>({
  name: '',
  rarity: 'common' as Rarity,
  elixir_cost: 3,
  role: 'troop' as Role,
  hitpoints: 500,
  damage: 100,
  arena: 1,
  is_favorite: false
})

/** Au chargement de la page, on récupère les cartes */
onMounted(() => {
  store.loadFromLocal()
})

/** Remet le form dans son état “neuf” */
function resetForm() {
  form.name = ''
  form.rarity = 'common'
  form.elixir_cost = 3
  form.role = 'troop'
  form.hitpoints = 500
  form.damage = 100
  form.arena = 1
  form.is_favorite = false
}

/** Ouvre le modal en mode création */
function openCreate() {
  editing.value = null
  resetForm()
  modalOpen.value = true
}

/** Ouvre le modal en mode édition et copie la carte dans le form */
// function openEdit(card: Card) { // [!code --]
function openEdit(card: CardLocal) { // [!code ++]
  editing.value = card

  // On copie les champs dans le formulaire
  form.name = card.name
  form.rarity = card.rarity
  form.elixir_cost = card.elixir_cost
  form.role = card.role
  form.hitpoints = card.hitpoints
  form.damage = card.damage
  form.arena = card.arena
  form.is_favorite = card.is_favorite

  modalOpen.value = true
}

/** Ferme le modal */
function closeModal() {
  modalOpen.value = false
}

/**
 * submit :
 * - si editing != null => update
 * - sinon => insert
 */
async function submit() {
  // Validation minimale : name obligatoire
  if (!form.name.trim()) return

  if (editing.value) {
    await store.edit(editing.value.id, { ...form })
  } else {
    await store.add({ ...form })
  }

  closeModal()
}


async function onRefresh(ev: CustomEvent) {
  // await store.load() // [!code --]
    await store.refresh() // [!code ++]
    const refresher = ev.target as HTMLIonRefresherElement
    refresher.complete()
}

```
:::

## 9️⃣.5️⃣.5️⃣ C'est l'heure  de tester
::: details Copier-coller ce code dans `App.vue`, c'est une solution de secours car j'ai pas eu le temps de gérer tous les cas :

```ts [src/App.vue]
<template>
    <ion-app>
<ion-router-outlet />
</ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import { watch, onMounted } from 'vue'
import { toastController } from '@ionic/vue'
import { useNetworkStore } from '@/stores/networkStore'
import { syncOfflineQueue } from '@/services/syncService'
import {upsertManyLocalCards} from "@/services/cardsLocalService";
import {fetchCards} from "@/services/cardsService";
import {useCardsStore} from "@/stores/cardsStore";


/**
 * Store réseau global
 */
const network = useNetworkStore()

const cardsStore = useCardsStore()

/**
 * Fonction utilitaire : affiche un toast simple
 */
async function showToast(message: string, duration = 5000) {
    const toast = await toastController.create({
        message,
        duration,
        position: 'top'
    })
    await toast.present()
    return toast
}

onMounted(async () => {
    // Toast temporaire : vérification réseau en cours
    const checkingToast = await showToast('⏳ Vérification du réseau…', 0)

    // Petite pause pour s'assurer que le store est prêt
    await new Promise(r => setTimeout(r, 50))

    // Fermeture du toast de vérification
    await checkingToast.dismiss()

    // Toast résultat
    if (network.connected) {
        await showToast('🟢 Connecté au réseau')
        const cloudCards = await fetchCards()
        await upsertManyLocalCards(cloudCards)
        await cardsStore.loadFromLocal()
        // await syncOfflineQueue()
    } else {
        await showToast('🔴 Réseau déconnecté (mode hors-ligne)')
    }
})

watch(
    () => network.connected,
    async (connected, oldConnected) => {
        /**
         * oldConnected est undefined uniquement
         * lors du premier appel du watcher.
         * On l’ignore pour éviter un toast inutile au démarrage.
         */
        if (oldConnected === undefined) return

        if (!connected) {
            await showToast('🔴 Réseau déconnecté (mode hors-ligne)')
        } else {
            await showToast('🟢 Connecté au réseau')
            // ✅ Réseau revenu : on lance la synchronisation
            await syncOfflineQueue()
        }
    },
    { immediate: true }
)
</script>
```
:::

1. Installer Android Studio (même si vous n'allez pas coder en natif, c'est nécessaire pour l'émulateur Android)
2. Effectuer les commandes suivantes :
```bash
npm i @capacitor/android @capacitor/ios
npx ionic build
npx cap add android
```
> Ceci installe la plateforme et dépendances pour Android.

3. Synchroniser
```bash
npx cap sync
```
> Ceci copie le build web dans le projet Android.

4. Ouvrir Android Studio
```bash
npx cap open android
```
> Ceci ouvre le projet Android dans Android Studio. C'est possible que ça ne fonctionne pas car il faut avoir une variable d'environnement définie. Dans ce cas, ouvrez Android Studio et ouvrez le dossier `android` manuellement.
> Patientez le temps que Gradle télécharge les dépendances.

5. Lancer un émulateur Android (ou connecter un appareil réel en USB avec le mode développeur activé).
6. Lancer l'application depuis Android Studio (Run 'app').
7. Ouvrez votre base Supabase dans le navigateur et vérifiez les changements.
8. Tester la synchronisation offline/online.
> - **Activez le Wi-Fi &rarr; observez le toast &rarr; faites une modification &rarr; vérifiez Supabase. (la modif apparaît)**
> - **Désactivez le Wi-Fi &rarr; observez le toast &rarr; faites une modification &rarr; vérifiez Supabase. (la modif n'apparaît pas) &rarr; réactivez le Wi-Fi &rarr; observez le toast &rarr; vérifiez Supabase. (la modif apparaît)**
> - **Activez le Wi-Fi &rarr; observez le toast &rarr; faites une modif DANS Supabase (via le navigateur) &rarr; actualisez la liste dans l'app (tirer vers le bas) &rarr; vérifiez que la modif apparaît.**

::: danger Problèmes connus :
- Rien ne s'affiche &rarr; c'est normal il faut se logger. Ensuite, quittez l'application, puis relancez-là. Le `onMounted()` va faire son travail.
- Si des boutons de navigation ou d'actions (submit) ne fonctionnent plus, quittez l'app et revenez. Je n'ai pas encore pris le temps de résoudre ces bugs-ci...
### ...DÉSOLÉ

![img.png](https://img.wattpad.com/e93f381761e4281ee115e64ed8d7525bff639d13/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f69535a336f6730765850356132513d3d2d313033363039393334372e313636396335633236366262313361353631303834373436343535352e676966)
:::

## 9️⃣.5️⃣.6️⃣ Checkpoint
> Si vous êtes arrivés jusqu'ici, félicitations ! 🎉 Prenez une pause bien méritée, asseyez-vous autour du feu pendant que je vous explique les derniers éléments de ce chapitre.

![img.png](https://media1.tenor.com/m/lcrQBLljnNcAAAAd/dark-souls-knight.gif)


On a mis en place une belle synchronisation online-offline avec Supabase, SQLite et une queue d'actions.
Votre application est maintenant robuste face aux coupures réseau.

Le but était surtout que vous puissiez visualiser cette évolution step-by-step, ainsi que d'avoir un exemple de projet avec une belle séparation des responsabilités (services, stores, composants).

Si vous êtes intéressé à avoir un projet à jour pour tester rapidement sur d'autres appareils sans devoir tout refaire le tuto, je vous ai préparé une branche sur mon projet GitHub avec tout le code final :
[Checkpoint 9.5](https://github.com/ThomasTirole/clash-cards/tree/checkpoint-9.5)

- N'oubliez pas de configurer vos variables d'environnement `.env` avec votre propre instance Supabase ! Le fichier `.env.example` est là pour vous aider.
- Exécutez les commandes nécessaires comme au début du tuto (installation des dépendances, capacitor, android, build, sync, etc.)


