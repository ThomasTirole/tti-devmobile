# 7️⃣ Row-Level-Security (RLS)

Jusqu’ici, on a volontairement **désactivé la sécurité avancée** pour se concentrer sur :
- la communication app ↔ backend,
- le CRUD,
- l’authentification.

Dans un vrai projet, ce serait évidemment **inacceptable** en production.

Maintenant que l’authentification fonctionne, on peut ajouter la **vraie sécurité côté base de données** : le **Row-Level-Security (RLS)**.

Chaque utilisateur :
- ne verra que **ses cartes**,
- ne pourra **modifier / supprimer que ses cartes**.



## 7️⃣.1️⃣ Ajouter une colonne `user_id` à la table `cards`

Dans le **SQL Editor** de Supabase, créez une nouvelle requête et exécutez le code SQL suivant :

```sql
alter table public.cards
add column user_id uuid references auth.users(id);
````

> 💬 On relie chaque carte à l’utilisateur qui l’a créée.



## 7️⃣.2️⃣ Backfill simple (données existantes)

Pour les cartes déjà existantes, on effectue un **backfill simple** en les attribuant à un utilisateur de test.

Remplacez `USER_UUID_HERE` par l’UUID d’un utilisateur (visible dans **Authentication → Users**) :

```sql
update public.cards
set user_id = 'USER_UUID_HERE';
```

> ✅ Toutes les cartes existantes sont maintenant associées à un utilisateur.



## 7️⃣.3️⃣ Associer automatiquement les nouvelles cartes à l’utilisateur (Trigger)

À ce stade, l’application Ionic **n’envoie pas** le champ `user_id` lors de la création d’une carte.

> 👉 Plutôt que de modifier le code côté client, nous allons résoudre ce problème **côté base de données**, à l’aide d’un **trigger SQL**.

L’objectif est de :
- associer automatiquement chaque nouvelle carte à l’utilisateur connecté, 
- sans ajouter de logique dans l’application Ionic.

### 🛠️ Création de la fonction SQL

Dans le **SQL Editor** :

```sql
create or replace function public.set_user_id()
returns trigger as $$
begin
  -- Associe automatiquement la carte à l'utilisateur connecté
  new.user_id := auth.uid();
  return new;
end;
$$ language plpgsql security definer;
```

### 🛠️ Création du trigger

```sql
drop trigger if exists set_cards_user on public.cards;

create trigger set_cards_user
before insert on public.cards
for each row
execute procedure public.set_user_id();
```

> 💡 À chaque `INSERT` dans la table `cards`,
> la base de données remplit automatiquement `user_id` avec l’UUID de l’utilisateur connecté.



## 7️⃣.4️⃣ Activer le Row-Level-Security (RLS)

Toujours dans le **SQL Editor** :

```sql
alter table public.cards enable row level security;
```

> ⚠️ À partir de maintenant, **aucune requête n’est autorisée par défaut**.
> Tout doit être explicitement autorisé par des règles (*policies*).



## 7️⃣.5️⃣ Créer des *policies* (le cœur du RLS)

On va maintenant créer des **policies** pour autoriser les opérations CRUD uniquement si l’utilisateur est légitime.



### 🔹 SELECT — lire uniquement ses cartes

```sql
create policy "Select own cards"
on public.cards
for select
using (user_id = auth.uid());
```



### 🔹 INSERT — créer une carte (utilisateur connecté requis)

Le trigger se charge automatiquement de remplir `user_id`.

```sql
create policy "Insert cards (logged in)"
on public.cards
for insert
with check (auth.uid() is not null);
```



### 🔹 UPDATE — modifier uniquement ses cartes

```sql
create policy "Update own cards"
on public.cards
for update
using (user_id = auth.uid());
```



### 🔹 DELETE — supprimer uniquement ses cartes

```sql
create policy "Delete own cards"
on public.cards
for delete
using (user_id = auth.uid());
```

> 💬 À chaque fois, on se pose la même question :
> **l’utilisateur connecté (`auth.uid()`) est-il bien le propriétaire de la carte (`user_id`) ?**

## 7️⃣.6️⃣ Tester le RLS dans l’application Ionic
À ce stade, l’application Ionic doit continuer à fonctionner **sans aucun changement** dans le code.
Testez les opérations suivantes avec différents utilisateurs :
- création de cartes ;
- lecture des cartes ;
- modification de cartes ;
- suppression de cartes.
- toggle “favori”.

> ✅ Si tout est correctement configuré, chaque utilisateur ne verra et ne pourra modifier que ses propres cartes.

## 7️⃣.7️⃣ Conclusion
Le Row-Level-Security (RLS) est une fonctionnalité puissante de Supabase/PostgreSQL qui permet de sécuriser les données au niveau des lignes, en fonction de l’utilisateur connecté. En combinant RLS avec des triggers SQL, on peut automatiser la gestion des permissions sans complexifier le code côté client.

::: tip 🔚 Fin du module "Apprendre Supabase"
Félicitations ! Vous avez terminé le module "Apprendre Supabase". Vous avez acquis des compétences essentielles pour intégrer Supabase dans vos applications mobiles Ionic-Vue, en assurant la sécurité et la gestion des données utilisateur.
:::
