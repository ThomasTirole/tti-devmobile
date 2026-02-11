# 🗃️ 2.3 Architecture et composants d'une application mobile

<iframe src="https://slides.com/tirtho/2-3-architecture-et-composants-d-une-application-mobile/embed" width="576" height="420" title="🗃️ 2.3 Architecture et composants d'une application mobile" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## 🎯 Objectif d'apprentissage
À la fin de ce chapitre, vous serez capable de :
- Comprendre la **structure interne** d'une application mobile.
- Identifier les **modèles d'architectures** les plus utilisés (MVC, MVVM, Clean Architecture).
- Expliquer le rôle et la communication entre les **différentes couches** d'une application.
- Appréhender les **principes de gestion d'état** et de modularité.

## 🧱 2.3.1 Introduction : pourquoi une architecture ?
Une application mobile n'est pas un simple enchaînement d'écrans et de boutons.
C'est un **ensemble de composants interconnectés**, chacun ayant un rôle bien défini : afficher des informations, exécuter une logique, stocker ou échanger des données.

**L'architecture** définit la **façon dont ces composants s'organisent et communiquent**.
Elle permet de construire une application :
- **plus claire** (le rôle de chaque fichier est identifiable) ;
- **plus maintenable** (les évolutions n'affectent pas tout le code) ;
- **plus testable** (chaque couche peut être validée indépendamment).

::: details **💡 Exemple concret :** {open}
Une application météo comporte :
- une **interface (View)** qui affiche la température,
- une **logique (Controller / ViewModel)** qui interroge le service météo,
- un **modèle (Model)** qui représente les données reçues de l'API.
:::

> **🎯 But de ce chapitre :** comprendre comment ces couches s'articulent pour concevoir des applications structurées, performantes et faciles à faire évoluer.

## 🧱 2.3.1bis Les 3 couches universelles d’une application

Avant de parler de MVC ou MVVM, retenez qu’une application est presque toujours organisée autour de **3 grandes couches** :

1. **Interface (UI)** : ce que l’utilisateur voit et manipule (écrans, boutons, formulaires).
2. **Logique / État** : ce qui décide *quoi faire* quand l’utilisateur agit (règles métier, état de l’app).
3. **Données** : où sont stockées les informations (API, base de données, localStorage, fichiers…).

#### 🔍 Exemple concret : app Ionic-Vue “TaskIonic”

Imaginons une petite app de **liste de tâches** en Ionic-Vue.

On peut relier ses fichiers aux 3 couches :

| Couche             | Rôle                                | Exemple dans TaskIonic          |
| ------------------ | ----------------------------------- | ------------------------------- |
| **Interface (UI)** | Afficher les infos, gérer les clics | `TasksPage.vue`, `TaskItem.vue` |
| **Logique / État** | Gérer l’état et la logique métier   | `useTasksStore.ts` (Pinia)      |
| **Données**        | Lire / écrire les données           | `tasksApi.ts`, `Task.ts`        |

💡 **Réflexe à adopter :**

Quand vous ne savez pas où mettre un morceau de code, posez-vous la question :

- Est-ce que ça affiche quelque chose ou réagit à un clic ? 👉 **Interface (UI)**
- Est-ce que ça décide *quoi faire* (validation, règles métier, calcul, choix) ? 👉 **Logique / État**
- Est-ce que ça lit ou écrit des données “persistantes” (API, storage, BDD) ? 👉 **Données**

Les modèles comme **MVC**, **MVVM** ou **Clean Architecture** sont différentes façons d’organiser ces 3 couches.

## 🗃️ 2.3.2 Les modèles d’architectures les plus utilisés

::: details 🧭 Ces architectures ne sont pas réservées à Android

Les architectures comme **MVC**, **MVVM** ou **Clean Architecture** ne sont **pas propres à Android**.

Ce sont des **modèles généraux** pour organiser le code d’une application :

- au départ utilisées sur **desktop** et **web** ;
- adaptées ensuite à **Android**, **iOS**, **Flutter**, **React Native**… ;
- et tout à fait pertinentes pour des apps **hybrides** comme **Ionic + Vue + Capacitor**.

Dans tous les cas, on retrouve les mêmes questions :

- Où mettre la **logique métier** ?
- Où gérer l’**état** de l’application ?
- Où accéder aux **données** (API, storage, BDD) ?
- Comment éviter le “gros fichier unique” ingérable ?

Les patterns (MVC, MVVM, Clean…) sont simplement des **façons différentes de séparer** ces responsabilités.

:::

Les architectures logicielles (MVC, MVVM, Clean…) définissent **comment organiser les 3 couches** vues précédemment :

- **Interface (UI)** ;
- **Logique / État** ;
- **Données**.

Elles répondent toutes aux mêmes objectifs :

- **séparer les responsabilités** (ce qui affiche, ce qui décide, ce qui stocke) ;
- rendre le code **plus lisible**, **plus testable** et **plus maintenable** ;
- permettre à plusieurs développeurs de travailler **en parallèle** sans se gêner.

Dans ce cours, nous allons surtout nous référer à :

- **MVC (Model – View – Controller)** ;
- **MVVM (Model – View – ViewModel)** ;
- **Clean Architecture** (version simplifiée).

> 🧩 **Lien avec notre app Ionic-Vue “TaskIonic” :**
>
> - **Model / Données** : `Task.ts`, `tasksApi.ts`
> - **View / UI** : `TasksPage.vue`, `TaskItem.vue`
> - **Controller / ViewModel** : `useTasksStore.ts` (Pinia, logique + état)

L’idée importante à retenir n’est pas le nom précis du pattern, mais le **principe** :
> 👉 *ce qui affiche* ≠ *ce qui décide* ≠ *ce qui stocke*.

### 🔹 MVC (Model - View - Controller)

Le modèle **MVC** est l'un des plus anciens et des plus répandus.
Il repose sur une séparation en trois couches :

| Élément        | Rôle                                     | Exemple                                      |
|----------------|------------------------------------------|----------------------------------------------|
| **Model**      | Gère les données et la logique métier    | Les objets “Météo”, “Utilisateur”            |
| **View**       | Affiche les informations à l’écran       | L’interface météo avec température et icônes |
| **Controller** | Fait le lien entre la vue et les données | Le code qui récupère les infos depuis l’API  |

> **💬 Exemple :**
> 
> Dans une application météo, le contrôleur récupère les données depuis une API, les convertit en objets `Model` et met à jour la `View` avec la température.

**Avantages :**
- Simple à comprendre et à mettre en place.
- Structure claire et intuitive.

**Limites :**
- Le contrôleur peut devenir trop chargé à mesure que l'application grandit (_"fat controller"_).

::: tip  Architecture présente dans :
Android (Activities + Layouts XML), iOS (ViewControllers), Ionic (composants + services).
:::

![mvc.png](/2.3/mvc.png)

### 🔸 MVVM (Model - View - ViewModel)
Le modèle **MVVM** est une évolution du MVC, conçue pour mieux séparer la logique de présentation de la logique métier.

| Élément       | Rôle                                             | Exemple                                                        |
|---------------|--------------------------------------------------|----------------------------------------------------------------|
| **Model**     | Représente les données et la logique métier      | Données de l’utilisateur ou d’un produit                       |
| **View**      | Interface graphique de l’application             | Écran avec champs, boutons, etc.                               |
| **ViewModel** | Gère l’état de la vue et réagit aux interactions | Stocke la liste des produits et informe la vue d’un changement |

Dans ce modèle, la `ViewModel` "observe" le `Model` : dès qu'une donnée change, la vue est automatiquement mise à jour (**data binding**).

> **💬 Exemple :**
> 
> Dans une app de notes, la ViewModel garde une liste réactive de notes.
> 
> Lorsqu'une note est ajoutée, la vue se met à jour sans code supplémentaire.

**Avantages :**
- Meilleure gestion de l'état.
- Moins de code "colle" entre la logique et la vue.
- Très utilisé dans Android (Jetpack Compose), Flutter, Vue ou React Native

**Limites :**
- Plus complexe à comprendre au départ
- Requiert une bonne maîtrise des notions de **réactivité** et d'**observation**.

![mvvm.png](/public/2.3/mvvm.png)

### ▫️ Clean Architecture
La **Clean Architecture**, popularisé par Robert C. Martin ("Uncle Bob"), pousse la séparation encore plus loin pour les projets complexes.

| Couche                | Contenu                                   | Exemple                                    |
|-----------------------|-------------------------------------------|--------------------------------------------|
| **Présentation (UI)** | L’affichage et l’interaction utilisateur  | Écrans, widgets, formulaires               |
| **Domaine**           | Logique métier pure et cas d’usage        | Calcul de panier, validation d’inscription |
| **Données**           | Gestion des sources de données (API, BDD) | Requêtes HTTP, stockage local              |

Cette approche permet de **tester et modifier** une couche sans impacter les autres.

> **💬 Exemple :**
> 
> - Le **domaine** gère la logique des commandes.
> - La **couche données** récupère les produits via une API.
> - La **présentation** affiche la liste et gère les interactions.

**Avantages :**
- Très modulaire et évolutive.
- Parfaite pour les projets collaboratifs et à long terme.

**Limites :**
- Complexité initiale plus élevée (plus de dossiers, plus d'abstractions).

::: tip Utilisée dans :
grands projets Android / Flutter / React Native professionnels.
:::

![clean-architecture.png](/2.3/clean-architecture.png)

## 📱 2.3.2bis Comment ces architectures se traduisent dans une app Ionic-Vue ?

Avec **Ionic + Vue + Pinia**, nous allons utiliser une architecture qui ressemble à une combinaison de **MVVM** et de **Clean Architecture simplifiée**.

#### 🧩 Rôle des dossiers dans un projet Ionic-Vue

| Dossier / fichier         | Couche            | Rôle principal                                           |
|---------------------------|-------------------|----------------------------------------------------------|
| `views/` (`*.vue`)        | Interface (UI)    | Écrans, navigation, mise en forme                       |
| `components/` (`*.vue`)   | Interface (UI)    | Petits blocs réutilisables (card, liste, bouton custom) |
| `stores/` (Pinia)         | Logique / État    | État global, règles métier, actions                     |
| `models/` (`*.ts`)        | Modèle / Domaine  | Types, interfaces, parfois petites fonctions métier     |
| `services/` (`*Api.ts`)   | Données           | Accès aux API, localStorage, SQLite, etc.               |

#### 🔁 Exemple concret : scénarios dans l’app TaskIonic

1. L’utilisateur clique sur **“Ajouter”** dans `TasksPage.vue`.
2. La vue appelle une **action** du store : `tasksStore.addTask(title)`.
3. Le store met à jour l’**état** (liste des tâches) et appelle `tasksApi.saveTasks(...)`.
4. La couche **données** (service) s’occupe de **persister** la liste (localStorage ou API).
5. Vue se **met à jour automatiquement** grâce à la réactivité de Vue / Pinia.

On peut visualiser ce flux :
![architecture-ionic-task.svg](/2.3/architecture-ionic-task.svg)

::: details 🔁 Lecture du diagramme : scénario “Ajouter une tâche”

Ce diagramme montre ce qui se passe dans l’app quand l’utilisateur ajoute une tâche.

- **UI (Vue / Ionic – `TasksPage.vue`)**  
  L’utilisateur remplit le champ texte et clique sur **Ajouter**.  
  👉 La vue déclenche un événement (`@submit` / `@click`) et appelle une action du store :  
  `tasksStore.addTask(title)`.

- **VM (Store Pinia – `useTasksStore`)**  
  Le store reçoit la demande, crée une nouvelle tâche, met à jour la liste en mémoire  
  et appelle un service de données pour la sauvegarder.  
  👉 C’est ici que se trouve la **logique métier** et la **gestion de l’état**.

- **DATA (Service – `tasksApi`)**  
  Le service gère la **persistance** : enregistre les tâches dans le `localStorage`  
  (ou plus tard, dans une API / base de données).  
  👉 La Vue ne sait pas *où* ni *comment* les données sont stockées.

Grâce à la **réactivité de Vue / Pinia**, dès que le store met à jour la liste `tasks`,  
l’UI se met automatiquement à jour et la nouvelle tâche apparaît à l’écran.

> 🎯 Idée clé :
> - UI = affiche + récupère les clics
> - Store = décide quoi faire + gère l’état
> - Service = lit / écrit les données
:::

💬 **À retenir pour vos projets Ionic :**
- Les **composants Vue/Ionic** ne devraient contenir que :
  - de l’affichage ; 
  - la gestion d’événements (clic, submit) ; 
  - des appels à des **actions** (du store, des services…).

- Les **stores Pinia** :
  - gèrent l’**état** ; 
  - contiennent la **logique métier** (règles, validations, calculs) ; 
  - appellent les **services de données**.

- Les **services** :
  - encapsulent tout ce qui touche aux **APIs** et au **stockage** ; 
  - rendent le reste du code indépendant de la technologie utilisée (API, localStorage, etc.).

> 🎯 **Objectif pédagogique :**
> Habituez-vous à vous demander, pour chaque morceau de code :
>
> * “Est-ce que ça touche à l’interface ?” → Vue / composants
> * “Est-ce que ça touche à l’état ou à la logique métier ?” → store / composables
> * “Est-ce que ça touche à une source de données ?” → service / API


## 🔄️ 2.3.3 Gestion de l'état
Une application doit souvent gérer des données dynamiques : utilisateur connecté, panier, liste de favoris, onglet actif, etc.

Ces informations constituent **l'état** de l'application.

### 🔧 Définition
L'**état** représente tout ce qui peut changer dans l'application au fil du temps.
La **gestion d'état** consiste à maintenir et synchroniser ces données entre les **différentes parties de l'app**.

> **💬 Exemple :**
> 
> Si un utilisateur ajoute un article à son panier, ce changement doit apparaître sur tous les écrans (panier, menu, résumé, etc.).

### 🧰 Outils selon les environnements
| Environnement    | Outil de gestion d’état  | Particularité                       |
|------------------|--------------------------|-------------------------------------|
| **Vue / Ionic**  | Pinia, Vuex              | Données réactives centralisées      |
| **React Native** | Redux, Zustand           | Flux unidirectionnel et prévisible  |
| **Flutter**      | Provider, Riverpod, Bloc | Widgets observant l’état            |
| **Android**      | LiveData, ViewModel      | Persistance d’état entre les écrans |

::: details **💡 Exemple concret :** {open}
Dans Vue avec **Pinia**, on stocke la variable `isLoggedIn` dans un store central : tous les composants de l'app réagissent automatiquement à son changement, comme l'affichage du menu utilisateur.
:::

### 🤔 Pourquoi c'est important
- Simplifie la logique de mise à jour des écrans.
- Améliore la **prévisibilité** (on sait toujours d'où vient une donnée).
- Évite les erreurs dues à la duplication de données dans plusieurs composants.
> 🎯 Une bonne gestion d'état = une application fluide, cohérente et facile à déboguer.

## ☎️ 2.3.4 Communication entre couches et modularité
Une application bien structurée repose sur une **communication claire entre ses couches**.
Chaque couche à son rôle et ne doit pas "empiéter" sur les autres.

### 🗄️ Organisation typique
1. L'utilisateur interagit avec la **vue** (**UI**).
2. La **logique (Controller / ViewModel)** traite la demande.
3. La **couche données** (API ou BDD) fournit ou enregistre l'information.
4. Le résultat remonte vers la vue.

> **💬 Exemple :**
> 
> Un clic sur "Actualiser la météo" &rarr;  ViewModel appelle un service API &rarr; réponse JSON &rarr; mise à jour de l'interface.

### ⚙️ Principes de modularité
- **Responsabilité unique :** chaque module doit faire une seule chose (principe de _"Single Responsibility"_).
- **Réutilisabilité :** une logique métier peut être utilisée dans plusieurs vues.
- **Évolutivité :** on peut remplacer une couche (ex. API) sans modifier toute l'application.
> 💡 Une architecture modulaire permet à plusieurs développeurs de travailler ensemble sans conflit.

### 📁 Schéma de communication recommandé

![schema-communication.svg](/2.3/schema-communication.svg)

> 💬 Ce modèle simple illustre la circulation de l'information dans une application bien structurée.

## 🧩 2.3.5 Activités pédagogiques

### 🧠 Exercice 1 – Identifier l’architecture

Observez une application simple (par exemple une **app météo** ou une **liste de tâches**).

> ➡️ Identifiez les trois grandes couches : **données**, **logique**, et **interface**.
> 
> ➡️ Classez les fichiers et fonctions selon le modèle **MVC** ou **MVVM**.
> 
> ➡️ Expliquez la responsabilité de chaque partie : où se trouve la logique métier ? où sont stockées les données ?

💬 *But de l’exercice : apprendre à repérer la structure interne d’une application et à comprendre la logique de séparation.*

### 🔄 Exercice 2 – Gestion de l’état

Scénario : vous devez concevoir une mini-application avec un **compteur**, un **panier** ou une **liste de tâches**.

> ➡️ Décrivez ce qui constitue l’“état” de votre application.
> 
> ➡️ Expliquez comment cet état évolue lors d’une action (ex. ajout d’un article, suppression d’une note).
> 
> ➡️ Indiquez où et comment vous stockeriez cet état (ex. Pinia, Redux, Provider, ou simple variable réactive).

💬 *Cet exercice permet de comprendre la notion d’état partagé et sa propagation dans l’interface.*

### 💡 Exercice bonus – Simplifier un code “spaghetti”

On vous donne un code mal structuré (ex. tout dans un seul fichier JS).

> ➡️ Réorganisez-le selon un modèle d’architecture (MVC ou MVVM).
> 
> ➡️ Identifiez ce qui relève du **modèle**, de la **vue**, et du **contrôleur / ViewModel**.

🎯 *Objectif : expérimenter la refactorisation d’un projet vers une structure claire et modulaire.*

## 🔗 2.3.6 Références et ressources

- [**Android Jetpack – Architecture Guide**](https://developer.android.com/jetpack/guide)

- [**Apple Developer – MVC & MVVM Patterns**](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html)

- [**Flutter – State Management**](https://docs.flutter.dev/data-and-backend/state-mgmt)

- [**Vue.js – State Management (Pinia)**](https://pinia.vuejs.org)

- [**Clean Architecture – Robert C. Martin (“Uncle Bob”)**](https://blog.cleancoder.com/)

## 📔 TL;DR
::: details Récapitulatif du chapitre {open}
Ce chapitre explique l’architecture en 3 couches (UI, logique/état, données) et les patterns MVC/MVVM/Clean. Il montre comment ces concepts s’appliquent à Ionic‑Vue avec stores et services. Il couvre la gestion d’état, la communication entre couches et la modularité.
:::

