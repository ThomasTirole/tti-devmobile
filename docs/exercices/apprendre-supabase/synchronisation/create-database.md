# 9️⃣.2️⃣ Création de la base SQLite locale et de la table `cards`

Nous allons maintenant créer la **base de données locale SQLite** et définir la table `cards` qui stockera les données métier **hors-ligne**.

L'objectif est simple :
- que l'application puisse **lire et écrire des cartes sans réseau**,
- avec une structure proche de celle utilisée dans Supabase.

## 9️⃣.2️⃣.1️⃣ Schéma de la table `cards`

La table locale `cards` doit contenir :
- les données métier,
- les métadonnées nécessaires à la synchronisation.

### Colonnes retenues

| Colonne       | Type    | Rôle                                      |
|---------------|---------|-------------------------------------------|
| `id`          | TEXT    | Identifiant unique (UUID généré côté app) |
| `title`       | TEXT    | Titre de la carte                         |
| `description` | TEXT    | Description                               |
| `rarity`      | TEXT    | Rareté (ex: common, rare, epic…)          |
| `updated_at`  | TEXT    | Dernière modification (ISO string)        |
| `synced`      | INTEGER | 1 = synchronisé, 0 = modification locale  |

> 👉 Le champ `synced` nous aidera à savoir quelles cartes doivent être envoyées au backend.

## 9️⃣.2️⃣.2️⃣ Création d'un service SQLite centralisé
Pour éviter de disperser le code SQLite dans les stores ou les composants, nous allons créer un **service dédié**.

**Créez le fichier `src/services/sqliteService.ts`.**

## 9️⃣.2️⃣.3️⃣ Initialisation de la base SQLite
```ts [src/services/sqliteService.ts]
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite'

/**
 * Connexion SQLite globale
 */
const sqlite = new SQLiteConnection(CapacitorSQLite)

let db: SQLiteDBConnection | null = null

/**
 * Initialise la base SQLite locale
 * - ouvre la base
 * - crée la table cards si nécessaire
 */
export async function initDB() {
    
  // Ouverture (ou création) de la base locale
  db = await sqlite.createConnection(
    'cards-db', // nom de la base
    false,
    'no-encryption',
    1,
    false
  )

    await db.open()
  
    // Création de la table cards
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS cards (
                                             id TEXT PRIMARY KEY NOT NULL,
                                             name TEXT NOT NULL,
                                             rarity TEXT NOT NULL,
                                             elixir_cost INTEGER NOT NULL,
                                             role TEXT NOT NULL,
                                             hitpoints INTEGER NOT NULL,
                                             damage INTEGER NOT NULL,
                                             arena INTEGER NOT NULL,
                                             is_favorite INTEGER NOT NULL,
                                             created_at TEXT NOT NULL,
                                             updated_at TEXT NOT NULL,
                                             synced INTEGER NOT NULL
        );
    `
    await db.execute(createTableSQL)
}

/**
 * Accès sécurisé à la base
 */
export function getDB(): SQLiteDBConnection {
  if (!db) {
    throw new Error('SQLite DB not initialized')
  }
  return db
}
```

> - SQLite est **ouvert une seule fois**,
> - La table est créée si elle n'existe pas.
> - le service expose uniquement ce qui est nécessaire pour accéder à la base.

## 9️⃣.2️⃣.4️⃣ Initialiser SQLite au lancement de l'app
SQLite doit être prêt **avant toute lecture ou écriture**.

👉 Comme pour l'auth et le réseau, on initialise une seule fois dans `src/main.ts`.

De plus, nous allons encapsuler l'initialisation avec un `bootstrap` asynchrone. Sans ça, on a uen erreur au build car `await` n'est pas autorisé au top-level.

```ts [src/main.ts]
import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue} from '@ionic/vue';
import {createPinia} from 'pinia';
import {useAuthStore} from '@/stores/authStore';
import {useNetworkStore} from '@/stores/networkStore';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader'
import { initDB } from '@/services/sqliteService' // [!code ++]

// ...

async function bootstrap() {
// 🔹 Création de l’app
    const app = createApp(App)
        .use(IonicVue)

// 🔹 IMPORTANT : on garde une référence à Pinia
    const pinia = createPinia()
    app.use(pinia)

// 🔹 Initialisation réseau (1 seule fois)
    const networkStore = useNetworkStore(pinia)
    networkStore.init()

// 🔹 Router inchangé
    app.use(router)

// 🔹 INITIALISATION AUTH (1 seule fois)
    const authStore = useAuthStore(pinia)
    authStore.init()

// Initialisation SQLite // [!code ++]
    await initDB() // [!code ++]

// 🔹 Mount final inchangé
    router.isReady().then(() => {
        app.mount('#app')
    })
}

bootstrap()

```
::: warning **⚠️ Attention !**
L'initialisation de SQLite doit être fait **avant** toute synchronisation ou lecture locale.
:::

## 🔜 La suite...
Nous avons maintenant une base SQLite locale prête à l'emploi, une table `cards` créée, et l'application peut stocker des cartes hors-ligne.

Nous allons ensuite :
- lire les cartes depuis SQLite,
- écrire / modifier / supprimer localement,
- sans encore parler de Supabase.



