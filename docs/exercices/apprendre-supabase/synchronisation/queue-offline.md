# 9️⃣.4️⃣ Queue offline avec Capacitor Preferences

Dans une approche **offline-first**, on fait toujours deux choses quand l'utilisateur agit :

1. ✅ **On applique l'action immédiatement en local** (SQLite) &rarr; l'UI reste fluide.
2. 🕒 **On mémorise l'intention** pour pouvoir la rejouer plus tard sur Supabase &rarr; c'est la **queue offline**

> 👉 Ce chapitre met en place **uniquement la queue** (pas encore de synchronisation).

## 9️⃣.4️⃣.1️⃣ Pourquoi une queue offline ?

SQLite contient **l'état local** (les cartes visibles dans l'app).
Mais quand l'utilisateur est hors-ligne, Supabase ne reçoit rien.

Exemples :
- je crée une carte hors-ligne &rarr; Supabase ne sait pas qu'elle existe.
- je modifie une carte hors-ligne &rarr; Supabase ne sait pas la dernière version.
- je supprime une carte hors-ligne &rarr; Supabase ne supprime rien.

👉 On a donc besoin d’un mécanisme qui garde en mémoire :
> “qu’est-ce que l’utilisateur a fait, dans quel ordre, et quoi rejouer quand le réseau revient”.

## 9️⃣.4️⃣.2️⃣ Pourquoi Capacitor Preferences (et pas SQLite) ?

Rappel de la théorie :
- **SQLite** = données métier structurées (ici : `cards`)
- **Preferences** = stockage **clé/valeur** simple (petites données JSON)

La queue offline est parfaite pour Preferences car :
- c'est un tableau JSON
- pas énorme en taille
- facile à lire/écrire
- persistant

## 9️⃣.4️⃣.3️⃣ Installer Capacitor Preferences
Dans le terminal :

```bash
npm install @capacitor/preferences
```

## 9️⃣.4️⃣.4️⃣ Définir le type `OfflineAction`
Créez le fichier `src/types/OfflineAction.ts` :
```ts [src/types/OfflineAction.ts]
import type { CardLocal } from '@/types/Card'

/**
 * Une action offline représente une “intention utilisateur”
 * à rejouer plus tard sur Supabase.
 *
 * - id : identifiant unique de l’action (pour la retirer après sync)
 * - type : CREATE / UPDATE / DELETE
 * - payload : données nécessaires pour rejouer l’action
 * - createdAt : timestamp de l’action (utile pour debug + ordre)
 */
export type OfflineAction =
  | {
      id: string
      type: 'CREATE'
      payload: CardLocal
      createdAt: string
    }
  | {
      id: string
      type: 'UPDATE'
      payload: CardLocal
      createdAt: string
    }
  | {
      id: string
      type: 'DELETE'
      payload: { id: string } // on a juste besoin de l’id à supprimer
      createdAt: string
    }
```

## 9️⃣.4️⃣.5️⃣ Créer le service `offlineQueueService`
Créez le fichier `src/services/offlineQueueService.ts`.

Ce service :
- lit la queue depuis Preferences,
- ajoute des actions,
- supprime des actions.
- vide la queue.

```ts [src/services/offlineQueueService.ts]
import { Preferences } from '@capacitor/preferences'
import type { OfflineAction } from '@/types/OfflineAction'

/**
 * Clé unique dans Preferences.
 * Toute la queue est stockée en JSON sous cette clé.
 */
const QUEUE_KEY = 'offline_queue_cards'

/**
 * Lit la queue depuis Preferences.
 * Si rien n’existe encore, on renvoie un tableau vide.
 */
export async function getQueue(): Promise<OfflineAction[]> {
  const { value } = await Preferences.get({ key: QUEUE_KEY })

  // value est une string JSON ou null
  if (!value) return []

  try {
    return JSON.parse(value) as OfflineAction[]
  } catch {
    // si JSON cassé (rare), on repart sur une queue vide
    return []
  }
}

/**
 * Sauvegarde une queue complète dans Preferences.
 * (fonction interne pour centraliser l’écriture JSON)
 */
async function saveQueue(queue: OfflineAction[]): Promise<void> {
  await Preferences.set({
    key: QUEUE_KEY,
    value: JSON.stringify(queue)
  })
}

/**
 * Ajoute une action à la queue (en fin de liste).
 * -> l’ordre est important (on rejouera dans le même ordre plus tard)
 */
export async function enqueue(action: OfflineAction): Promise<void> {
  const queue = await getQueue()
  queue.push(action)
  await saveQueue(queue)
}

/**
 * Retire une action de la queue (par id).
 * -> utilisé après une sync réussie (chapitre 9.5)
 */
export async function removeFromQueue(actionId: string): Promise<void> {
  const queue = await getQueue()
  const newQueue = queue.filter((a) => a.id !== actionId)
  await saveQueue(newQueue)
}

/**
 * Vide complètement la queue.
 * -> utile pour debug / reset
 */
export async function clearQueue(): Promise<void> {
  await Preferences.remove({ key: QUEUE_KEY })
}
```

## 9️⃣.4️⃣.6️⃣ Ajouter des helpers pour créer une action rapidement
Pour simplifier l’ajout d’actions dans la queue, on crée des fonctions utilitaires dans `src/services/offlineQueueService.ts`. Ajoutez en bas du fichier :

```ts [src/services/offlineQueueService.ts]
import type { CardLocal } from '@/types/Card'

/**
 * Génère un id unique pour une action.
 * crypto.randomUUID() marche sur la plupart des navigateurs modernes.
 * (sinon on verra un fallback plus tard si besoin)
 */
function newActionId(): string {
  return crypto.randomUUID()
}

/**
 * Fabrique une action CREATE
 */
export function makeCreateAction(card: CardLocal) {
  return {
    id: newActionId(),
    type: 'CREATE' as const,
    payload: card,
    createdAt: new Date().toISOString()
  }
}

/**
 * Fabrique une action UPDATE
 */
export function makeUpdateAction(card: CardLocal) {
  return {
    id: newActionId(),
    type: 'UPDATE' as const,
    payload: card,
    createdAt: new Date().toISOString()
  }
}

/**
 * Fabrique une action DELETE
 */
export function makeDeleteAction(id: string) {
  return {
    id: newActionId(),
    type: 'DELETE' as const,
    payload: { id },
    createdAt: new Date().toISOString()
  }
}
```
> Ces helpers évitent de recopier la même structure d’action partout dans le code. Par exemple `makeCreateAction(card)` crée une action CREATE complète avec un id et un timestamp automatiquement, au lieu de devoir le faire manuellement à chaque fois.

## 9️⃣.4️⃣.7️⃣ Brancher la queue sur le CRUD local
Ici, on relie ce qu'on a fait au chapitre 9.3 :
- quand on crée/modifie/supprime en local
- on ajoute aussi l'action dans la queue.

*** warning **⚠️ Important**
On le fait seulement si l'action n'est pas déjà "cloud". (les actions "cloud &rarr; local" via `upsertManyLocalCards() ne doivent pas créer de queue)
:::

::: details 1. Création local &rarr; queue
Dans `src/services/cardsLocalService.ts`, importez :
```ts [src/services/cardsLocalService.ts]
import { enqueue, makeCreateAction, makeUpdateAction, makeDeleteAction } from '@/services/offlineQueueService'
```
Puis dans `createLocalCard()` ajoutez après l'insertion SQLite :
```ts [src/services/cardsLocalService.ts]
// ✅ On ajoute une action CREATE dans la queue
await enqueue(makeCreateAction({ ...card, synced: 0 }))
```
Exemple de version complète de `createLocalCard()` :
```ts [src/services/cardsLocalService.ts]
export async function createLocalCard(card: CardCloud): Promise<void> {
  const db = getDB()

  await db.run(/* ... insert ... */)

  // On pousse l’action dans la queue offline
  // -> elle sera rejouée sur Supabase quand le réseau reviendra
  await enqueue(makeCreateAction({ ...card, synced: 0 }))
}
```
:::

::: details 2. Mise à jour local &rarr; queue
Dans `updateLocalCard()`, ajoutez après la mise à jour SQLite :
```ts [src/services/cardsLocalService.ts]
// On pousse l’action UPDATE dans la queue
await enqueue(makeUpdateAction({ ...card, synced: 0, updated_at: now }))
```
Exemple de version complète de `updateLocalCard()` :
```ts [src/services/cardsLocalService.ts]
export async function updateLocalCard(card: CardLocal): Promise<void> {
  const db = getDB()
  const now = new Date().toISOString()

  await db.run(/* ... update ... */)

  // Ajout en queue : on rejouera cet UPDATE sur Supabase plus tard
  await enqueue(makeUpdateAction({ ...card, synced: 0, updated_at: now }))
}
```
:::

::: details 3. Suppression local &rarr; queue
Dans `deleteLocalCard()`, ajoutez après la suppression SQLite :
```ts [src/services/cardsLocalService.ts]
// On pousse l’action DELETE dans la queue
await enqueue(makeDeleteAction(id))
```
Exemple de version complète de `deleteLocalCard()` :
```ts [src/services/cardsLocalService.ts]
export async function deleteLocalCard(id: string): Promise<void> {
  const db = getDB()
  await db.run('DELETE FROM cards WHERE id = ?;', [id])

  // Ajout en queue : on rejouera ce DELETE sur Supabase plus tard
  await enqueue(makeDeleteAction(id))
}
```

## 9️⃣.4️⃣.8️⃣ Teste la queue rapidement
1. Lancez l'app
2. Faites une action locale (create/update/delete)
3. Dans le navigateur, ouvrez la console et testez :
```ts
import { getQueue } from '@/services/offlineQueueService'
getQueue().then(console.log)
```
Vous devez voir un tableau avec des actions `CREATE`/`UPDATE`/`DELETE` correspondant à vos actions.

## 🔜 La suite...
Synchronisation automatique :
- dès que le réseau revient, on lit la queue, on rejoue les actions sur Supabase, et on les retire de la queue.

