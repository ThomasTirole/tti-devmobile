# 🛠️ Mise en place de l'environnement de développement
Durant ce module, nous allons apprendre à développer une application mobile avec Ionic (via Vue) en TypeScript et Capacitor (pour l'accès natif aux APIs). De ce fait, vous devez donc disposer d'un **environnement de développement complet** : outils, CLI, émulateurs, ...

L'objectif de cette section et que vous puissiez :
- installer les outils nécessaire ;
- créer un **premier projet Ionic-Vue** ;
- comprendre la **structure des dossiers** ;
- lancer l'application dans le **navigateur** puis, plus tard, sur un **émulateur ou un appareil réel**.

## 🧰 3.1.1 Outils nécessaires 
Pour ce module, vous aurez besoin des éléments suivants :
- **Node.js** (gestionnaire d'exécution JavaScript + npm)
- **Ionic CLI** (outil en ligne de commande de Ionic)
- **Un IDE** (WebStorm ou VSCode)
- **Git** (gestionnaire de versions)
- Pour la suite du module (émulateurs, builds) :
  - **Android Studio** (pour Android)
  - **Xcode** (pour iOS, uniquement sur macOS) --> nous utiliserons des solutions cloud pour les builds iOS ou machines virtuelles macOS.
> Même sans Android/iOS, il sera possible de travailler **entièrement** dans le navigateur** avec `ionic serve` (c'est l'équivalent du `npm run dev` de Vue.JS). L'intégration mobile native viendra dans un second temps.

## 🔧 3.1.2 Installation de Node.js et vérifications
1. Rendez-vous sur le site officiel de [Node.js](https://nodejs.org/) et téléchargez la version LTS (Long Term Support) recommandée pour votre système d'exploitation.
2. Une fois installé, vérifiez dans un terminal :

::: code-group
```bash [Terminal]
node -v
npm -v
```

```bash [Output]
v24.x.x  # Exemple de version node.js
11.x.x.x  # Exemple de version npm
```

:::

## 🌐 3.1.3 Installation de Ionic CLI
Ionic CLI est l'outil principal pour :
- créer un nouveau projet ;
- lancer l'application en mode développement ;
- ajouter Capacitor, Android, iOS ;
- construire la version de production.

Installez Ionic CLI globalement avec npm :
```bash
npm install -g @ionic/cli
```
Vérifiez l'installation :
::: code-group
```bash [Terminal]
ionic -v
```

```bash [Output]
8.x.x  # Exemple de version Ionic
```
:::

## 🧪 3.1.4 Création d'un projet Ionic-Vue (Vue 3 + Vite)
Nous allons créer une application de base Ionic **avec Vue 3** (Composition API) basée sur **Vite**.
Dans un terminal, exécutez :
```bash
ionic start my-first-app tabs --type vue
```
- `my-first-app` : nom du projet
- `tabs` : template de base avec une navigation par onglets
- `--type vue` : utilisation de Vue.JS comme framework

Si on vous demande de créer un compte Ionic, vous pouvez ignorer cette étape pour l'instant (appuyez sur `N`).

Placez-vous dans le dossier du projet :
```bash
cd my-first-app
```

## ▶️ 3.1.5 Lancer l'application dans le navigateur
Pour lancer l'app en mode développement dans le navigateur :
```bash
ionic serve
```
Cette commande lance un serveur de développement (avec Vite), ouvre automatiquement votre navigateur et recharge la page à chaque modification du code (Live Reload).
Vous devriez voir l'application de base avec :
- un header Ionic ;
- une barre de navigation par onglets en bas (Tabs) ;
- des pages préconfigurées.

> 🎯 À ce stade, vous avez déjà **une vraie application web mobile**, prête à être transformée en app Android/iOS via Capacitor dans les chapitres suivants.

## 🗂️ 3.1.6 Anatomie d'un projet
Une fois le projet créé, jetez un oeil aux dossiers principaux :
```text
my-first-app/
├─ node_modules/          # Dépendances installées (ne pas modifier)
├─ public/                # Fichiers statiques
├─ src/                   # Code source principal de l'app
│  ├─ assets/             # Images, icônes, CSS additionnelles
│  ├─ components/         # Composants Vue réutilisables
│  ├─ views/              # Écrans / pages de l'application
│  ├─ router/             # Configuration de vue-router
|  ├─ theme/              # Thèmes et variables Ionic pour le style
│  ├─ App.vue             # Composant racine de l'app
│  └─ main.ts             # Point d'entrée (Vue + Ionic)
├─ capacitor.config.ts    # Configuration Capacitor (mobile)
├─ package.json           # Liste des scripts et dépendances
└─ vite.config.ts         # Configuration Vite

```

#### Quelques fichiers importants :
### Quelques fichiers importants

* `src/main.ts`
  → Initialise Vue, Ionic, le router, et plus tard **Pinia**.

* `src/views/`
  → Contient les pages comme `HomePage.vue`, `Tab1Page.vue`, etc.

* `capacitor.config.ts`
  → Sert à configurer le nom de l’application, son identifiant (`appId`), et les plateformes (Android / iOS).

> 💡 Dans les chapitres suivants, nous viendrons **ajouter progressivement** :
>
> * Pinia (store global),
> * des services API,
> * des appels à Capacitor,
> * la configuration Android/iOS.

## 🧩 3.1.7 Activité : valider votre environnement

👉 **Objectif :** vérifier que tout le monde a un environnement fonctionnel.

1. Installez Node.js et Ionic CLI.
2. Créez un projet `ionic start lab-335 tabs --type vue`.
3. Lancez `ionic serve`.
4. Modifiez le texte du premier onglet dans `src/views/Tab1Page.vue` (par exemple, changez le titre).
5. Vérifiez que la modification se met bien à jour dans le navigateur.

> ✅ Si vous arrivez à modifier le texte et voir le résultat dans le navigateur, votre environnement est prêt pour la suite du module.

::: tip **💡 Astuce**
Pour voir le rendu iOS/Android dans le navigateur, vous pouvez utiliser les outils de développement (DevTools) de votre navigateur (F12) et activer le mode "Appareil mobile" (icône de smartphone/tablette).
Choisissez ensuite un modèle d'appareil (iPhone, Samsung) et rafraîchissez pour simuler l'OS.
:::


## 📔 TL;DR
::: details Récapitulatif du chapitre
Ce chapitre liste les outils nécessaires, l’installation de Node.js et Ionic CLI, et la création d’un projet Ionic‑Vue. Il montre comment lancer `ionic serve` et décrit la structure d’un projet. Il propose une activité de validation de l’environnement.
:::

