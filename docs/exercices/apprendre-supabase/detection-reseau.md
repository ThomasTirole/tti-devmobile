# 8️⃣ Détection du réseau (Online / Offline)

Dans une application mobile, la connectivité peut changer à tout moment :
- sortie d'un bâtiment,
- Wi-Fi perdu,
- mode avion activé,
- etc.

> 👉 **Une app mobile fiable doit réagir** à ces changements, et informer l'utilisateur.

::: tip Dans ce chapitre, nous allons...
- détecter l'état réseau au démarrage,
- écouter les changements (offline ↔ online),
- afficher un **toast de 5 secondes** :
> 🔴 _"Réseau déconnecté"_ quand on passe hors-ligne,
>
> 🟢 _"Connecté au réseau"_ quand on revient en ligne.
:::

## 💡 Rappel d'éléments théoriques clés
Une application **ne vérifie pas le réseau en boucle**.
> 👉 C'est **l'OS** (Android / iOS) qui envoie un événement quand l'état change.

Capacitor expose ces événements via le plugin [Network](https://capacitorjs.com/docs/apis/network).

## 8️⃣.1️⃣ Installer le plugin Network de Capacitor
Dans le terminal, installez l'API Network de Capacitor :
```bash
npm install @capacitor/network
````

::: info
Même si on teste dans un navigateur (`ionic serve`), ça fonctionne aussi, grâce à une simulation interne.
:::

## 8️⃣.2️⃣ Créer un store réseau (Pinia)

On aimerait créer **un état global**, accessible depuis partout dans l'application, pour savoir si on est en ligne ou hors-ligne.

* `connected` : boolean (true/false)
* `connectionType` : string (wifi, cellular, none...)
* une méthode `init()` pour démarrer la détection

Créer le fichier `networkStore.ts` dans le dossier `src/stores` :

```ts [src/stores/networkStore.ts]
import { defineStore } from 'pinia'
import { Network } from '@capacitor/network'

/**
 * Store réseau :
 * - contient l’état de connectivité
 * - écoute les changements envoyés par l’OS (ou le navigateur)
 */
export const useNetworkStore = defineStore('network', {
  state: () => ({
    // true = online, false = offline
    connected: true,

    // ex: 'wifi', 'cellular', 'none', 'unknown'
    connectionType: 'unknown' as string
  }),

  actions: {
    /**
     * init():
     * 1) récupère l’état réseau au démarrage
     * 2) écoute les changements de connectivité
     *
     * Note :
     * On ne met PAS de UI ici (pas de toast dans le store).
     * Le store garde seulement l’état.
     */
    async init() {
      // 1) Statut au démarrage
      const status = await Network.getStatus()
      this.connected = status.connected
      this.connectionType = status.connectionType

      // 2) Listener des changements (OS → app)
      Network.addListener('networkStatusChange', (status) => {
        this.connected = status.connected
        this.connectionType = status.connectionType
      })
    }
  }
})
```

## 8️⃣.3️⃣ Initialiser le store réseau au démarrage de l'app

👉 Comme pour l'auth, on initialise une fois au démarrage de l'application.

Dans `src/main.ts`, ajoutez l'import et l'appel `init()` :

```ts [src/main.ts]
import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue} from '@ionic/vue';
import {createPinia} from 'pinia';
import {useAuthStore} from '@/stores/authStore';
import {useNetworkStore} from '@/stores/networkStore'; // [!code ++]

// ...

// 🔹 Création de l’app
const app = createApp(App)
    .use(IonicVue)

// 🔹 IMPORTANT : on garde une référence à Pinia
const pinia = createPinia()
app.use(pinia)

// 🔹 Initialisation réseau (1 seule fois)
const networkStore = useNetworkStore(pinia) // [!code ++]
networkStore.init() // [!code ++]

// 🔹 Router inchangé
app.use(router)

// 🔹 INITIALISATION AUTH (1 seule fois)
const authStore = useAuthStore(pinia)
authStore.init()

// 🔹 Mount final inchangé
router.isReady().then(() => {
    app.mount('#app')
})
```

> **✅ Résultat** : l'état réseau est disponible dans toute l'app.

## 8️⃣.4️⃣ Afficher un toast selon l'état réseau

On va afficher :

* un toast **au démarrage** pour indiquer l’état réseau,
* puis un toast à **chaque changement de connectivité**.

Pour ceci, nous allons utiliser un **watcher** dans le composant racine `App.vue`.

*Pourquoi dans `App.vue` ?*

* C'est le composant parent de toute l'application.
* La connectivité concerne **toute l'application**.

> ⚠️ Le code ci-dessous ne modifie pas votre template.



### 8️⃣.4️⃣.1️⃣ Toast utilitaire

```ts [src/App.vue]
import { watch, onMounted } from 'vue'
import { toastController } from '@ionic/vue'
import { useNetworkStore } from '@/stores/networkStore'

/**
 * Store réseau global
 */
const network = useNetworkStore()

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
```

### 8️⃣.4️⃣.2️⃣ Vérifier l’état réseau au lancement

```ts [src/App.vue]
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
  } else {
    await showToast('🔴 Réseau déconnecté (mode hors-ligne)')
  }
})
```

### 8️⃣.4️⃣.3️⃣ Détecter les changements de connectivité

```ts [src/App.vue]
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
    }
  },
  { immediate: true }
)
```

## 8️⃣.5️⃣ Tester la détection réseau en classe (PC)

### ✅ Test simulé recommandé

* Chrome DevTools → onglet **Network**
* cochez **Offline**
* puis revenez en **Online**

> 💬 Sur PC, le throttling est la méthode la plus fiable pour simuler une perte réseau.

## ✅ Résultat attendu

* l'état réseau est géré dans un store global,
* l'OS notifie l'app quand ça change,
* l'utilisateur est informé par des toasts visibles 5 secondes.

## 🤔 Et maintenant ?

Maintenant que l'on détecte correctement le passage offline/online, nous pouvons implémenter une logique de synchronisation des données comme présenté dans le chapitre
**🔄️ 2.6.8 - Synchronisation cloud ↔ local**.

Nous mettrons en place une logique **offline-first** :

* si offline : on enregistre les actions localement (queue),
* quand le réseau revient : on synchronise automatiquement avec Supabase.

