# 9️⃣.1️⃣ Installation et configuration de SQLite
Pour stocker les **données métier** (les cartes) de manière durable et hors-ligne, nous allons utiliser **SQLite**.

Nous allons utiliser le plugin communautaire officiel : `@capacitor-community/sqlite`.

> 💬 Sur le web, SQLite est simulé à l'aide d'IndexedDB.
> Le comportement reste identique du point de vue de l'application.

## 9️⃣.1️⃣.1️⃣ Installation du plugin SQLite

Dans le terminal :
```bash
npm install @capacitor-community/sqlite
```

::: details **NE PAS FAIRE** 9️⃣.1️⃣.2️⃣ Configuration spécifique pour le navigateur (Web)
Sur **Android** et **iOS**, SQLite est fourni nativement par le système.

Sur le **navigateur**, en revanche, SQLite n’existe pas directement.
Le plugin utilise donc :
- un **Web Component** (`jeep-sqlite`),
- et stocke les données dans **IndexedDB**.

Pour que SQLite fonctionne dans le navigateur (`ionic serve`), un **Web Component** est nécessaire.

Installez le loader web :
```bash
npm install jeep-sqlite
```

Ensuite, enregistrez le composant `jeep-sqlite` dans `src/main.ts` :
```ts [src/main.ts]
import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue} from '@ionic/vue';
import {createPinia} from 'pinia';
import {useAuthStore} from '@/stores/authStore';
import {useNetworkStore} from '@/stores/networkStore';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader' // [!code ++]
```

Puis, avant de créer l'application Vue (`app.mount(...)`), ajoutez le code suivant pour enregistrer le composant :
```ts [src/main.ts]
// ...

const pinia = createPinia()
app.use(pinia)

// Initialisation réseau
const networkStore = useNetworkStore(pinia)
networkStore.init()

// Initialisation auth
const authStore = useAuthStore(pinia)
authStore.init()

// 🔹 SQLite Web (IndexedDB) // [!code ++]
jeepSqlite(window) // [!code ++]

router.isReady().then(() => {
  app.mount('#app')
})
```

Pour que SQLite fonctionne réellement dans le navigateur, le composant `jeep-sqlite` doit être inséré dans le DOM.
Dans le fichier `index.html`, ajoutez la ligne suivante **juste avant** la balise fermante `</body>` :
```html [src/index.html]
  <!-- ... -->
  <body>
    <div id="app"></div>
    <jeep-sqlite></jeep-sqlite> <!-- 🔹 SQLite Web (IndexedDB) -->
  </body>
```

> 👉 Sans cette étape, SQLite ne fonctionnera pas dans le navigateur.
:::

## 9️⃣.1️⃣.3️⃣ Principe d'initialisation de SQLite
Avant d'utiliser SQLite, il faut :
1. ouvrir une base locale,
2. créer les tables si elles n'existent pas encore,
3. garder une référence à la base.

Nous allons créer un **service dédié**, afin de centraliser cette logique. Ceci permettra de ne pas polluer les stores, réutiliser le code facilement et séparer la logique métier de la persistance des données.

## 9️⃣.1️⃣.4️⃣ Préparer Supabase pour la synchronisation
Avant d’implémenter la synchronisation offline &harr; online, il est indispensable que la base de données **cloud** soit prête à gérer des conflits et des comparaisons de versions.

> 👉 Pour cela, chaque carte doit disposer d’un champ `updated_at` fiable côté Supabase.

Ce champ nous permettra :
- de comparer une version **locale** et une version **cloud** ;
- de décider laquelle est la plus récente ;
- d’appliquer notre règle métier (dans notre cas : **local prioritaire**).

::: details 1. Ajouter le champ `updated_at` dans Supabase
Dans le **SQL Editor** de Supabase, exécutez la requête suivante pour ajouter le champ `updated_at` dans la table `cards` :
```sql
ALTER TABLE public.cards
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
```
> - `TIMESTAMPTZ` est le type de données pour une date/heure avec fuseau horaire.
> - `DEFAULT now()` garantit que toute nouvelle carte aura toujours un `updated_at`, même si le front ne l’envoie pas.
:::

::: details 2. Initialiser `updated_at` pour les cartes existantes
Si des cartes existent déjà, leur champ `updated_at` est actuellement `NULL`.
On va donc les initialiser avec la date de création `created_at` :
```sql
UPDATE public.cards
SET updated_at = created_at
WHERE updated_at IS NULL;
```
:::

::: details 3. Mettre à jour automatiquement `updated_at` lors des modifications
Lorsqu'une carte est modifiée (`UPDATE`), on veut que `updated_at` reflète automatiquement la date de la dernière modification.

Pour cela, on crée une fonction SQL et un trigger associé :
```sql
-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
   
-- Trigger pour appeler la fonction avant chaque UPDATE
DROP TRIGGER IF EXISTS set_cards_updated_at ON public.cards;

CREATE TRIGGER set_cards_updated_at
    BEFORE UPDATE ON public.cards
    FOR EACH ROW
    EXECUTE PROCEDURE public.set_updated_at();
```

> À chaque `UPDATE` sur la table `cards`, le trigger mettra automatiquement à jour le champ `updated_at` avec la date/heure actuelle.
:::
> 
## 🔜 La suite...
Dans la section suivante, nous allons :
- créer un service `sqliteService.ts`,
- initialiser la base locale,
- créer la table `cards`,
- préparer les méthodes CRUD locales.




