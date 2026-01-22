# 9️⃣ Synchronisation offline-first (SQLite + Preferences)

Dans les chapitres précédents, nous avons mis en place :
- une **authentification utilisateur** avec Supabase Auth ;
- un **backend sécurisé** (RLS) ;
- une **détection fiable du réseau**.

Il est maintenant temps d'exploiter tout cela pour construire une application **offline-first** ! c'est à dire :
> une application qui fonctionne **même sans réseau**,
> 
> et qui se synchronise automatiquement lorsque la connexion revient.

## 🧠 Principe fondamental : local d'abord, cloud ensuite
Dans une application mobile moderne suivant la logique du offline-first :
- le **stockage local** est la source de vérité immédiate pour l'interface,
- le **cloud** sert à :
  - sauvegarder,
  - synchroniser,
  - partager les données.

> 👉 **L'interface n'attend donc pas sur le réseau.**

## 🧱 Architecture choisie (approche hybride)

Nous utilisons volontairement **deux types de stockage local**, chacun avec un rôle précis.

### 🗃️ SQLite - données métier
SQLite est utilisé pour stocker :
- les **cartes** (entité métier),
- avec leur structure complète,
- de manière durable et performante.

**Pourquoi SQLite ?**
- standard sur Android et iOS,
- requêtes SQL possibles,
- fonctionne hors-ligne,
- adapté au données structurées.

> 💬 SQLite est la base locale "sérieuse" d'une application mobile.

### 🔑 Capacitor Preferences - stockage léger
Capacitor Preferences est utilisé pour : 
- la **queue des actions offline**,
- des petits états (timestamps, flags).

**Pourquoi Preferences ?**
- stockage clé-valeur simple,
- persistant,
- plus fiable que `localStorage` sur mobile.

> 💬 Preferences n'est pas une base de données : c'est un complément.

## 🔄️ Vue d'ensemble du workflow offline first 
Voici le comportement global que nous allons implémenter :

::: details **🟦 Au démarrage de l'application**
1. Lecture des cartes depuis **SQLite**
2. Affichage immédiat dans l'interface
3. Si le réseau est disponible :
   - récupération des données depuis Supabase
   - mise à jour de SQLite en arrière-plan
:::

::: details **🟦 Lorsqu'un utilisateur agit (CRUD)**
- l'action est appliquée **localement d'abord** (SQLite)
- l'interface se met à jour immédiatement
- si le réseau est :
  - **online** &rarr; requête Supabase
  - **offline** &rarr; action ajoutée à une queue locale.
:::

::: details **🟦 Lorsque le réseau revient**
- l'application détecte l'événement (`Network`)
- la queue des actions offline est rejouée
- SQLite est synchronisé
- Supabase devient cohérent avec le local
:::

## ⚔️ Gestion des conflits : règle métier choisie

Dans notre application, nous adoptons la règle suivante :

> **Les données modifiées hors-ligne par l'utilisateur sont prioritaires.**

Concrètement :
- chaque carte possède un champ `updated_at` (timestamp de la dernière modification),
- lors de la synchronisation :
  - la version locale est envoyée vers Supabase,
  - Supabase est mis à jour via un **`UPSERT`**,
  - le local reste la référence.

> 💬 Cette règle est simple, compréhensible et cohérente pour une application mono-utilisateur.

## 🧩 Découpage technique
Ce chapitre étant conséquent, nous allons le diviser en plusieurs sous-parties. Dans les sections suivantes, nous allons implémenter :

- 1️⃣ Installation et configuration de SQLite
- 2️⃣ Création de la base locale et de la table `cards`
- 3️⃣ Service SQWLite (CRUD local)
- 4️⃣ Queue offline avec `Capacitor Preferences`
- 5️⃣ Synchronisation automatique avec Supabase
