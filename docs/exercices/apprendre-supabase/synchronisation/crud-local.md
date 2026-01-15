# 9️⃣.3️⃣ CRUD local avec SQLite

Maintenant que la base SQLite est initialisée et que la table `cards` existe, nous allons créer un service dédié pour effectuer le **CRUD local**.

Nous devrons pouvoir **lire**, **ajouter**, **mettre à jour** et **supprimer** des cartes dans la base SQLite locale **sans réseau**, mettre à jour l'interface rapidement en gardant un code propre.

## 9️⃣.3️⃣.1️⃣ Modèle de données local

Nous avons déjà un modèle de données TypeScript dans `src/types/Card.ts` (utilisé pour Supabase).
Dans une logique **offline-first**, une carte stockée localement a besoin de champs supplémentaires :

- `updated_at` : date de dernière modification (sert à gérer les conflits)
- `synced` : indique si la carte est synchronisée avec Supabase

👉 **Une carte n’a pas exactement la même “forme” dans le cloud et en local.**

- Dans **Supabase** : c’est la version “cloud”.
- Dans **SQLite** : on garde la version cloud **+ des champs techniques** pour l’offline-first.

C’est pour ça qu’on va faire évoluer le fichier `src/types/Card.ts`.

> Actuellement, vous aviez :
> - l'interface `Card` : la carte telle qu'elle existe dans Supabase
> - les types `CardInsert` et `CardUpdate` pour les opérations d'insertion et de mise à jour.

Nous devons désormais distinguer les deux versions de la carte !

::: details 1. Renommer l'interface `Card` en `CardCloud` et ajouter le timestamp `updated_at`
Tout d'abord, renommons l'interface pour clarifier qu'elle représente la carte dans le cloud, puis ajoutons le champ `updated_at`.
```ts [src/types/Card.ts]
export interface Card { // [!code --]
export interface CardCloud { // [!code ++]
    id: string
    name: string
    rarity: Rarity
    elixir_cost: number
    role: Role
    hitpoints: number
    damage: number
    arena: number
    is_favorite: boolean
    created_at: string
    updated_at: string // [!code ++]
}
```
:::
::: details 2. Créer l'interface `CardLocal`
Ensuite, créons une nouvelle interface `CardLocal` sur la base de `CardCloud` pour la carte locale avec les champs supplémentaires.
```ts [src/types/Card.ts]
export interface CardLocal extends CardCloud {
    synced: number
}
```
> `synced` permet de repérer les cartes devant être envoyées au cloud (0 = non synchronisée, 1 = synchronisée). SQLite ne gère pas les booléens, on utilise donc un entier.

:::
::: details 3. Mettre à jour les types d'insertion et de mise à jour pour le Cloud
Enfin, ajustons les types `CardInsert` et `CardUpdate` pour qu'ils correspondent à la nouvelle interface `CardCloud`. De plus, nous supprimons `id` de `CardInsert` car il sera généré côté application pour l'offline-first.
```ts [src/types/Card.ts]
export type CardInsert = Omit<Card, 'id' | 'created_at'> // [!code --]
export type CardInsert = Omit<CardCloud, id | 'created_at' | 'updated_at'> // [!code ++]

export type CardUpdate = Partial<CardInsert> // [!code --]
// ✅ UPDATE cloud : champs optionnels, mais jamais l’id // [!code ++]
export type CardUpdate = Partial<Omit<CardInsert, 'id'>> // [!code ++]
```
> Ces types restent utilisés pour :
> - créer / modifier une carte via Supabase,
> - valider un formulaire,
> - typer les appels API. 
> 
> Ils doivent rester basés sur la version cloud (`CardCloud`).

:::

::: details 4. Résultat final du fichier `src/types/Card.ts`
```ts [src/types/Card.ts]
// Types “fermés” (union types) : on limite les valeurs possibles.
// Ça aide l’IDE + évite les fautes de frappe.
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type Role = 'troop' | 'spell' | 'building'

/**
 * ✅ CHANGEMENT 1 : on renomme Card -> CardCloud
 *
 * Pourquoi ?
 * Avant : Card représentait la forme “cloud” (Supabase).
 * Maintenant : on a aussi une forme “locale” (SQLite) avec des champs en plus.
 *
 * Donc on nomme explicitement :
 * - CardCloud : la carte telle qu’elle existe dans Supabase
 * - CardLocal : la carte telle qu’elle existe dans SQLite (offline-first)
 */

// Interface = “contrat” de forme pour un objet Card.
// Ce sont les champs exactement comme dans la table Supabase `cards`.
export interface CardCloud {
  id: string
  name: string
  rarity: Rarity
  elixir_cost: number
  role: Role
  hitpoints: number
  damage: number
  arena: number
  is_favorite: boolean
  created_at: string

  /**
   * ✅ AJOUT 1 : updated_at
   *
   * Pourquoi ?
   * En offline-first, on doit pouvoir comparer la version locale vs la version cloud.
   * updated_at sert à :
   * - savoir quelle version est la plus récente
   * - gérer les conflits
   * - implémenter une règle “local prioritaire” proprement
   */
  updated_at: string
}

/**
 * ✅ AJOUT 2 : CardLocal (forme SQLite)
 *
 * Pourquoi ?
 * Dans la base locale (SQLite), on garde les mêmes champs métier que Supabase,
 * mais on ajoute un champ technique pour l’offline-first.
 */
export interface CardLocal extends CardCloud {
  /**
   * 1 = synchronisée avec Supabase
   * 0 = modification locale en attente (offline)
   *
   * Pourquoi ?
   * Ça permet de repérer les cartes qui doivent être envoyées au cloud.
   */
  synced: number
}

/**
 * ✅ CHANGEMENT 2 : CardInsert et CardUpdate se basent sur CardCloud
 *
 * Pourquoi ?
 * - Ces types servent pour les appels Supabase (cloud).
 * - On ne met pas `synced` ici car c’est un champ local SQLite.
 *
 * Point clé offline-first :
 * - L’app génère l’UUID `id` (stable partout : SQLite + queue + Supabase).
 * - Supabase gère `created_at` et `updated_at` via defaults / triggers.
 */

// ❌ On n’envoie pas created_at / updated_at (gérés côté Supabase) et l'id est sera randomisé plus tard dans l'app.
export type CardInsert = Omit<CardCloud, 'id' | 'created_at' | 'updated_at'>

// ✅ UPDATE cloud : champs optionnels, mais jamais l’id
export type CardUpdate = Partial<Omit<CardInsert, 'id'>>

```
::: warning ⚠️ Offline-first et génération des identifiants
Dans une application **online-only**, on laisse souvent la base de données générer les identifiants (`id`).
En **offline-first**, ce n’est plus possible : l’application doit créer des données **sans réseau**.

👉 L’UUID est donc **généré côté application** pour rester **stable** entre :

* SQLite (local),
* la queue offline,
* Supabase (cloud).

Supabase conserve néanmoins `default gen_random_uuid()` comme **fallback**, au cas où aucun `id` n’est fourni.
:::

## 9️⃣.3️⃣.2️⃣ Créer le service SQLite `cardsLocalService.ts`

Créez le fichier `src/services/cardsLocalService.ts`

> Ce service va :
> - utiliser `getDB()` du `sqliteService.ts` pour obtenir la connexion à la base SQLite.
> - exposer des fonctions simples pour effectuer les opérations CRUD sur la table `cards`.
> - gérer automatiquement les champs offline-first (`updated_at`, `synced`) lors des écritures locales.

## 9️⃣.3️⃣.3️⃣ Importer les types `CardCloud` et `CardLocal`
On a déjà défini les types dans `src/types/Card.ts`, on va les importer ici.

```ts [src/services/cardsLocalService.ts]
import { getDB } from '@/services/sqliteService'
import type { CardCloud, CardLocal } from '@/types/Card'
```

## 9️⃣.3️⃣.4️⃣ Lire toutes les cartes locales

Cette fonction sera utilisée au démarrage :
```ts [src/services/cardsLocalService.ts]
/**
 * Récupère toutes les cartes depuis SQLite
 * -> l'UI peut s'afficher même sans réseau
 */
export async function getAllLocalCards(): Promise<CardLocal[]> {
  const db = getDB()

  // Tri par "updated_at" (plus récent en premier)
  const res = await db.query('SELECT * FROM cards ORDER BY updated_at DESC;')

  // SQLite renvoie parfois des nombres/booleans sous forme "0/1"
  // On normalise pour avoir un objet CardLocal propre
  return (res.values ?? []).map((row: any) => ({
    ...row,
    elixir_cost: Number(row.elixir_cost),
    hitpoints: Number(row.hitpoints),
    damage: Number(row.damage),
    arena: Number(row.arena),
    is_favorite: Boolean(row.is_favorite),
    synced: Number(row.synced)
  })) as CardLocal[]
}
```

## 9️⃣.3️⃣.5️⃣ Ajouter une carte locale
Selon les règles : on écrit localement d'abord, avec `synced = 0` (car pas encore envoyé au cloud), et `created_at` et `updated_at` à la date actuelle.
```ts [src/services/cardsLocalService.ts]
/**
 * Crée une carte dans SQLite
 * - synced = 0 car pas encore synchronisée
 * - created_at / updated_at = now (pour le local)
 */
export async function createLocalCard(card: CardLocal): Promise<void> {
  const db = getDB()

  await db.run(
    `
    INSERT INTO cards (
      id, name, rarity, elixir_cost, role,
      hitpoints, damage, arena, is_favorite,
      created_at, updated_at, synced
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      card.id,
      card.name,
      card.rarity,
      card.elixir_cost,
      card.role,
      card.hitpoints,
      card.damage,
      card.arena,
      card.is_favorite ? 1 : 0,
      card.created_at,
      card.updated_at,
      0 // ✅ offline-first : modification locale en attente
    ]
  )
}
```

## 9️⃣.3️⃣.6️⃣ Mettre à jour une carte locale
Lors de la mise à jour locale, on met à jour `updated_at` à la date actuelle et on marque `synced = 0`.
```ts [src/services/cardsLocalService.ts]
/**
 * Met à jour une carte dans SQLite (offline-first)
 * - updated_at = now
 * - synced = 0 (à renvoyer au cloud)
 */
export async function updateLocalCard(card: CardLocal): Promise<void> {
  const db = getDB()
  const now = new Date().toISOString()

  await db.run(
    `
    UPDATE cards
    SET
      name = ?,
      rarity = ?,
      elixir_cost = ?,
      role = ?,
      hitpoints = ?,
      damage = ?,
      arena = ?,
      is_favorite = ?,
      updated_at = ?,
      synced = ?
    WHERE id = ?;
    `,
    [
      card.name,
      card.rarity,
      card.elixir_cost,
      card.role,
      card.hitpoints,
      card.damage,
      card.arena,
      card.is_favorite ? 1 : 0,
      now,
      0,
      card.id
    ]
  )
}
```

## 9️⃣.3️⃣.7️⃣ Supprimer une carte locale
```ts [src/services/cardsLocalService.ts]
/**
 * Supprime une carte de SQLite
 * -> si offline, on stockera aussi l’action dans la queue (chapitre 9.5)
 */
export async function deleteLocalCard(id: string): Promise<void> {
  const db = getDB()
  await db.run('DELETE FROM cards WHERE id = ?;', [id])
}
```

## 9️⃣.3️⃣.8️⃣ UPSERT local (cloud &rarr; local)
Quand on récupère les cartes depuis Supabase, on veut :
- insérer si absent,
- mettre à jour si déjà présent,
- et marquer `synced = 1` (car on vient du cloud).
```ts [src/services/cardsLocalService.ts]
/**
 * Insère ou met à jour plusieurs cartes dans SQLite
 * -> utilisé après un fetch Supabase
 * -> synced = 1 car les données viennent du cloud
 */
export async function upsertManyLocalCards(cards: CardCloud[]): Promise<void> {
  const db = getDB()

  for (const c of cards) {
    await db.run(
      `
      INSERT INTO cards (
        id, name, rarity, elixir_cost, role,
        hitpoints, damage, arena, is_favorite,
        created_at, updated_at, synced
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        rarity = excluded.rarity,
        elixir_cost = excluded.elixir_cost,
        role = excluded.role,
        hitpoints = excluded.hitpoints,
        damage = excluded.damage,
        arena = excluded.arena,
        is_favorite = excluded.is_favorite,
        created_at = excluded.created_at,
        updated_at = excluded.updated_at,
        synced = excluded.synced;
      `,
      [
        c.id,
        c.name,
        c.rarity,
        c.elixir_cost,
        c.role,
        c.hitpoints,
        c.damage,
        c.arena,
        c.is_favorite ? 1 : 0,
        c.created_at,
        c.updated_at,
        1
      ]
    )
  }
}
```

## 9️⃣.3️⃣.9️⃣ Résultat final du fichier `cardsLocalService.ts`
::: details Solution complète
```ts [src/services/cardsLocalService.ts]
import { getDB } from '@/services/sqliteService'
import type { CardCloud, CardLocal } from '@/types/Card'

/**
 * Récupère toutes les cartes depuis SQLite
 * -> l'UI peut s'afficher même sans réseau
 */
export async function getAllLocalCards(): Promise<CardLocal[]> {
  const db = getDB()

  // Tri par "updated_at" (plus récent en premier)
  const res = await db.query('SELECT * FROM cards ORDER BY updated_at DESC;')

  // SQLite renvoie parfois des nombres/booleans sous forme "0/1"
  // On normalise pour avoir un objet CardLocal propre
  return (res.values ?? []).map((row: any) => ({
    ...row,
    elixir_cost: Number(row.elixir_cost),
    hitpoints: Number(row.hitpoints),
    damage: Number(row.damage),
    arena: Number(row.arena),
    is_favorite: Boolean(row.is_favorite),
    synced: Number(row.synced)
  })) as CardLocal[]
}

/**
 * Crée une carte dans SQLite
 * - synced = 0 car pas encore synchronisée
 * - created_at / updated_at = now (pour le local)
 */
export async function createLocalCard(card: CardLocal): Promise<void> {
  const db = getDB()

  await db.run(
    `
    INSERT INTO cards (
      id, name, rarity, elixir_cost, role,
      hitpoints, damage, arena, is_favorite,
      created_at, updated_at, synced
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      card.id,
      card.name,
      card.rarity,
      card.elixir_cost,
      card.role,
      card.hitpoints,
      card.damage,
      card.arena,
      card.is_favorite ? 1 : 0,
      card.created_at,
      card.updated_at,
      0 // ✅ offline-first : modification locale en attente
    ]
  )
}

/**
 * Met à jour une carte dans SQLite (offline-first)
 * - updated_at = now
 * - synced = 0 (à renvoyer au cloud)
 */
export async function updateLocalCard(card: CardLocal): Promise<void> {
  const db = getDB()
  const now = new Date().toISOString()

  await db.run(
    `
    UPDATE cards
    SET
      name = ?,
      rarity = ?,
      elixir_cost = ?,
      role = ?,
      hitpoints = ?,
      damage = ?,
      arena = ?,
      is_favorite = ?,
      updated_at = ?,
      synced = ?
    WHERE id = ?;
    `,
    [
      card.name,
      card.rarity,
      card.elixir_cost,
      card.role,
      card.hitpoints,
      card.damage,
      card.arena,
      card.is_favorite ? 1 : 0,
      now,
      0,
      card.id
    ]
  )
}

/**
 * Supprime une carte de SQLite
 * -> si offline, on stockera aussi l’action dans la queue (chapitre 9.5)
 */
export async function deleteLocalCard(id: string): Promise<void> {
  const db = getDB()
  await db.run('DELETE FROM cards WHERE id = ?;', [id])
}

/**
 * Insère ou met à jour plusieurs cartes dans SQLite
 * -> utilisé après un fetch Supabase
 * -> synced = 1 car les données viennent du cloud
 */
export async function upsertManyLocalCards(cards: CardCloud[]): Promise<void> {
  const db = getDB()

  for (const c of cards) {
    await db.run(
      `
      INSERT INTO cards (
        id, name, rarity, elixir_cost, role,
        hitpoints, damage, arena, is_favorite,
        created_at, updated_at, synced
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        rarity = excluded.rarity,
        elixir_cost = excluded.elixir_cost,
        role = excluded.role,
        hitpoints = excluded.hitpoints,
        damage = excluded.damage,
        arena = excluded.arena,
        is_favorite = excluded.is_favorite,
        created_at = excluded.created_at,
        updated_at = excluded.updated_at,
        synced = excluded.synced;
      `,
      [
        c.id,
        c.name,
        c.rarity,
        c.elixir_cost,
        c.role,
        c.hitpoints,
        c.damage,
        c.arena,
        c.is_favorite ? 1 : 0,
        c.created_at,
        c.updated_at,
        1
      ]
    )
  }
}
```
:::

## 9️⃣.3️⃣.🔟 VOTRE ATTENTION S'IL VOUS PLAÎT !
Comme vous l'avez remarqué, nous avons changé la dénomination de l'interface principale de `Card` à `CardCloud` pour mieux refléter son rôle dans notre architecture offline-first. Assurez-vous de mettre à jour toutes les références à cette interface dans votre code pour éviter toute confusion ou erreur de typage.
Je pense vous que voyez où je veux en venir, n'est-ce pas... ?  Et oui.. nous allons devoir adapter le code à différents endroits de l'application pour utiliser `CardCloud` et `CardLocal` de manière appropriée.

C'est pas l'idéal je le conçois, mais c'est le but recherché avec cet exercice, j'aimerais que vous voyez l'évolution de l'application et ce que ça engendre.

Mais comme je ne suis pas sadique, je vous ai préparé la liste des endroits à modifier :

::: details `cardService.ts`
```ts [src/services/cardService.ts]
import { supabase } from '@/lib/supabase'
// import type { Card, CardInsert, CardUpdate } from '@/types/Card' // [!code --]
import type { CardCloud, CardInsert, CardUpdate } from '@/types/Card' // [!code ++]

/**
 * Récupère toutes les cartes depuis Supabase.
 * - select('*') : récupère toutes les colonnes
 * - order('created_at') : tri pour afficher les plus récentes en premier
 */
// export async function fetchCards(): Promise<Card[]> { // [!code --]
export async function fetchCards(): Promise<CardCloud[]> { // [!code ++]
    const { data, error } = await supabase
        .from('cards') // table
        .select('*')
        .order('created_at', { ascending: false })

    // Toujours gérer l’erreur : sinon on “échoue silencieusement”
    if (error) throw error

    // data peut être null, donc on retourne [] par défaut
    // return (data ?? []) as Card[] // [!code --]
    return (data ?? []) as CardCloud[] // [!code ++]
}

/**
 * Crée une carte.
 * - insert(payload) : ajoute une ligne
 * - select('*').single() : on veut récupérer la ligne créée directement
 */
// export async function createCard(payload: CardInsert): Promise<Card> { // [!code --]
export async function createCard(payload: CardInsert): Promise<CardCloud> { // [!code ++]
    const { data, error } = await supabase
        .from('cards')
        .insert(payload)
        .select('*')   // demande à Supabase de renvoyer la ligne créée
        .single()      // on veut un objet (pas un tableau)

    if (error) throw error
    // return data as Card // [!code --]
    return data as CardCloud // [!code ++]
}

/**
 * Met à jour une carte (PATCH).
 * - update(patch) : met à jour les champs fournis
 * - eq('id', id) : cible la bonne carte
 * - select('*').single() : renvoie la carte mise à jour
 */
// export async function updateCard(id: string, patch: CardUpdate): Promise<Card> { // [!code --]
export async function updateCard(id: string, patch: CardUpdate): Promise<CardCloud> { // [!code ++]
    const { data, error } = await supabase
        .from('cards')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single()

    if (error) throw error
    // return data as Card // [!code --]
    return data as CardCloud // [!code ++]
}

/**
 * Supprime une carte par id.
 * Ici on ne renvoie rien : void.
 */
export async function deleteCard(id: string): Promise<void> { 
    const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', id)

    if (error) throw error
}

```
:::

::: details `Tab1Page.vue`
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
  // Cette méthode sera modifiée pour charger depuis SQLite dans le chapitre 9.5, mais je prévois déjà ici... // [!code ++]
  await store.loadFromLocal() // [!code ++]
  const refresher = ev.target as HTMLIonRefresherElement
  refresher.complete()
}

```
:::


## 🔜 La suite...
Nous avons maintenant un service SQLite complet pour gérer le CRUD local des cartes en mode offline-first. Nous procéderons ensuite à la création d'une queue offline pour stocker les actions effectuées hors-ligne et les synchroniser avec Supabase lorsque le réseau est disponible (chapitre 9.5).

