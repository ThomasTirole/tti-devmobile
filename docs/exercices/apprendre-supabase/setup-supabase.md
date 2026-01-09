# ⚡ Apprenons Supabase
L'objectif de cas pratique est de réussir à créer une app Ionic (avec un template) qui affiche une liste de cartes/personnages", puis permet de faire un **CRUD complet** sur une table Supabase.

::: warning ⚠️ Attention ⚠️
Tout ceci va ressembler à ce que vous avez fait en Vue.JS en 2e année. Puisque Ionic utilise Vue.JS, vous allez retrouver beaucoup de similitudes. Cependant, l'objectif est ici de vous faire découvrir Supabase et son intégration dans une application mobile hybride.
:::

> ✅ Résultat attendu :
>
> * vous voyez les cartes depuis Supabase
> * vous pouvez **ajouter / modifier / supprimer**
> * vous pouvez **toggle “favori”**
> * les données sont gérées via **Pinia** (store)

## 🛠️ Prérequis
- Avoir suivi les chapitres :
  - [Persistance cloud et BaaS](../module/concevoir-concept-solution/persistance-cloud-baas.md)
  - [Introduction à TypeScript](../module/programmer-application/typescript.md)
  - [Mise en place de l'environnement de développement](../module/programmer-application/setup-environnement.md)

## 1️⃣ Mise en place de Supabase

## 1️⃣.1️⃣ Créer un compte Supabase
1. Rendez-vous sur [supabase.com](https://supabase.com/) et connectez-vous avec votre compte GitHub.
2. Créer une nouvelle `Organization`
   - Définissez un `Name`
   - Choisissez `Personal` comme type d'organisation
   - Sélectionnez `Free` comme plan
   - Cliquez sur `Create Organization`

## 1️⃣.2️⃣ Créer un nouveau projet
3. Créer un nouveau `Project`
    - Sélectionnez votre organisation.
    - Définissez un `Project name` (ex: `m335-mobile-app`)
    - Définissez un `Password` (notez-le quelque part)
    - Choisissez la région `Europe`
    - Cliquez sur `Create new project`

## 1️⃣.3️⃣ Créer la table `cards`
1. Dans le menu de gauche, cliquez sur `SQL Editor`.
2. Cliquez sur `New query` et copiez-collez le code SQL suivant pour créer la table `cards` :

```sql
create table public.cards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rarity text not null check (rarity in ('common','rare','epic','legendary')),
  elixir_cost int not null check (elixir_cost >= 1 and elixir_cost <= 10),
  role text not null check (role in ('troop','spell','building')),
  hitpoints int not null check (hitpoints >= 1),
  damage int not null check (damage >= 0),
  arena int not null check (arena >= 1),
  is_favorite boolean not null default false,
  created_at timestamptz not null default now()
);

create index cards_rarity_idx on public.cards (rarity);
create index cards_elixir_idx on public.cards (elixir_cost);
create index cards_arena_idx on public.cards (arena);
```
3. Cliquez sur `Run` pour exécuter la requête et créer la table.

> ✅ La table `cards` est maintenant créée dans votre base de données Supabase.

## 1️⃣.4️⃣ Insérer des données initiales
1. Toujours dans le `SQL Editor`, créez une nouvelle requête et copiez-collez le code SQL suivant pour insérer des données initiales dans la table `cards` :

```sql
insert into public.cards (name, rarity, elixir_cost, role, hitpoints, damage, arena, is_favorite) values
('Knight',        'common',    3, 'troop',    1400,  160, 1, false),
('Archer',        'common',    3, 'troop',     450,  110, 1, false),
('Giant',         'rare',      5, 'troop',    3200,  210, 3, false),
('Fireball',      'rare',      4, 'spell',       1,  350, 5, false),
('Mini P.E.K.K.A','rare',      4, 'troop',    1100,  450, 4, true),
('Witch',         'epic',      5, 'troop',     900,  140, 6, false),
('Balloon',       'epic',      5, 'troop',    1800,  600, 6, false),
('Inferno Tower', 'epic',      5, 'building', 1500,  100, 7, false),
('Ice Wizard',    'legendary', 3, 'troop',     700,  120, 8, false),
('Log',           'legendary', 2, 'spell',       1,  240, 9, false);
```
2. Cliquez sur `Run` pour exécuter la requête et insérer les données.

> ✅ La table `cards` est maintenant peuplée avec des données initiales.

## 1️⃣.5️⃣ Vérifier les données
1. Allez dans le menu de gauche et cliquez sur `Table Editor`.
2. Sélectionnez la table `cards` pour voir les données que vous venez d'insérer.
3. Vous devriez voir une liste de cartes avec leurs propriétés.

> ✅ Si vous voyez les cartes &rarr; le backend est prêt.

## 1️⃣.6️⃣ Récupérer les clés Supabase
Ceci vous servira pour connecter votre application Ionic à Supabase.
1. En haut de la page, cliquez sur le badge `Connect`.
2. Sélectionnez `App Frameworks` &rarr; `Vue.JS`.
3. Copiez la `SUPABASE_URL` et la `SUPAPABSE_KEY` (publishable key) dans un endroit sûr, vous en aurez besoin plus tard.
> Ne les partagez pas publiquement ! Nous les utiliserons plus tard dans le fichier `.env`.



