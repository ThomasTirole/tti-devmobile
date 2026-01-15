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
Enfin, ajustons les types `CardInsert` et `CardUpdate` pour qu'ils correspondent à la nouvelle interface `CardCloud`.
```ts [src/types/Card.ts]
export type CardInsert = Omit<Card, 'id' | 'created_at'> // [!code --]
export type CardInsert = Omit<CardCloud, 'id' | 'created_at' | 'updated_at'> // [!code ++]

export type CardUpdate = Partial<CardInsert> // inchangé
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
 * Ce sont des types utilisés côté "cloud" (Supabase).
 * On ne met pas synced ici car synced est un champ local SQLite,
 * pas un champ cloud (à ce stade).
 */

// Quand on crée une carte, c’est nous qui générons l’id (UUID) côté app (offline-first),
// mais Supabase gère les timestamps automatiquement selon ton setup.
// -> On ne fournit donc pas created_at / updated_at depuis le formulaire.
export type CardInsert = Omit<CardCloud, 'id' | 'created_at' | 'updated_at'>

// Quand on modifie une carte, on ne modifie pas forcément tout.
// Partial = tous les champs deviennent optionnels.
export type CardUpdate = Partial<CardInsert>
```
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
export async function createLocalCard(card: CardCloud): Promise<void> {
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
export async function createLocalCard(card: CardCloud): Promise<void> {
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
:::
```


## 🔜 La suite...
Nous avons maintenant un service SQLite complet pour gérer le CRUD local des cartes en mode offline-first. Nous procéderons ensuite à la création d'une queue offline pour stocker les actions effectuées hors-ligne et les synchroniser avec Supabase lorsque le réseau est disponible (chapitre 9.5).

