# 🧑‍🏫 3.2 Rappel UX mobile & introduction aux composants Ionic
Dans cette section, nous allons rappeler brièvement les bases de l'ergonomie mobile pour comprendre **pourquoi** les composants Ionic sont conçus de cette manière.
Nous entrerons ensuite directement dans le concret avec les **composants de base** d'Ionic-Vue, ceux que vous utiliserez dans la majorité de vos applications.

## 💭 3.2.1 Rappel ultra-court des principes UX mobile
Vous avez déjà étudié l'ergonomie et l'UX dans un précédent module.
Voici donc uniquement les points essentiels à garder à l'esprit lors du développement d'une interface mobile :

- **Lisibilité** :
  - Texte suffisamment grand, contrastes adaptés.
  - Un écran = une idée principale.
- **Zones tactiles adaptées** :
  - au moins 44x44px (Apple) ou 48x48dp (Android).
  - Espacer les éléments cliquables pour éviter les erreurs.
- **Navigation simple et prévisible** :
  - Un parcours utilisateur clair, sans profondeur excessive.
- **Feedback immédiat** :
  - État pressé, messages d'erreur, loaders.

Ces principes expliquent pourquoi les composants Ionic sont stylisés selon les standards **Material Design** (Android) et **Cupertino - Human Interface Guidelines** (iOS).

> 🎯 Objectif : vous concentrer sur la logique et l'UI sans réinventer les composants natifs.

## 🎨 3.2.2 La philosophie d'Ionic : des composants adaptatifs selon la plateforme
Ionic fournit des composants UI (`ion-...`) qui :
- adoptent automatiquement le **look Android** sur un appareil Android.
- adoptent automatiquement le **look iOS** sur un appareil Apple,
- s'affichent de façon homogène dans un navigateur.

Exemples :
- `ion-button` : arrondi plus léger sur iOS, rectangulaire sur Android.
- `ion-tab-bar` : placé en bas sur iOS, parfois en haut sur Android
- `ion-toolbar` : ombres et hauteurs différentes selon la plateforme.

::: danger
ajouter les images comparatives
:::

Grâce à cette approche :
- vous écrivez **un seul code**,
- Ionic se charge d'appliquer les **bonnes conventions natives**.

👉 Il n'est pas nécessaire de refaire tout le design : Ionic s'en occupe.

::: danger
ajouter le bout de code pour montrer la différence avec un gif par exemple entre Android et iOS ou prendre celle de la doc officielle
:::

## 🧱 3.2.3 Les composants UI fondamentaux d'Ionic
Ionic propose une large palette de composants prêts à l'emploi.
Voici les plus importants pour débuter :

### 🏠 Structure & layout
- `ion-app` : conteneur racine de l'app, gère les styles globaux.
- `ion-page` : structure une page de l'app.
- `ion-header` : zone supérieure (titre, actions).
- `ion-toolbar` : barre d'outils (boutons, titre).
- `ion-content` : zone scrollable principale.

### 📦 Contenu & affichage
- `ion-card`, `ion-card-header`, `ion-card-title`, `ion-card-content`
- `ion-list` et `ion-item`
- `ion-label`
- `ion-text`

### 📝 Formulaires & interactions
- `ion-input`
- `ion-textarea`
- `ion-toggle`
- `ion-checkbox`
- `ion-button`
- `ion-radio`
- `ion-icon`

### ⚠️ Feedback utilisateur
- `ion-alert`
- `ion-toast`
- `ion-loading`

### 🗺️ Navigation (introduction)
- `ion-tabs`, `ion-tab-bar`, `ion-tab-button`

> _la navigation complète sera approfondie ultérieurement dans le chapitre 3.5_
