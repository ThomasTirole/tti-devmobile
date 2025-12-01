# 🖼️ 3.3 Les composants UI d'Ionic
Ionic fournit une bibliothèque complète de composants conçus pour créer des interfaces mobiles modernes, cohérentes et adaptatives. Tous les composants `ion-*` respectent automatiquement les conventions visuelles d'iOS et d'Android, vous évitant de réécrire vos propres styles.

Dans ce chapitre, vous découvrirez les composants les plus importants d'Ionic, que vous utiliserez pour structurer vos pages, afficher du contenu, créer des formulaires et fournir du feedback utilisateur.
::: tip Ça vous rappelle quelque chose... ? 😉
Si vous avez bien suivi au module 294 (ce que je ne doute pas !), ceci vous rappellera fortement Vuetify !
Et oui ! Nous utilisons simplement Ionic pour bénéficier d'un rendu natif mobile et donc adapté aux smartphones et tablettes. Les avantages restent les mêmes dans l'utilisation d'une librairie UI : moderne, cohérence, gain de temps, adaptative, responsive, etc.
:::

## 🤔 3.3.1 Pourquoi utiliser les composants Ionic ?
Les composants Ionic ne sont aps de simples éléments HTML stylisés. Ils offrent plusieurs avantages majeurs :
- **Adaptation automatique selon la plateforme**
  - Style Cupoertino (iOS) ou Material Design (Android).
  - Comportements natifs (animations, transitions, réactions tactiles).
- **Composants pensés pourle mobile**
  - zone tactile suffisantes,
  - structure optimisée pour le scroll,
  - respect des patterns UI standards.
- **Intégration parfaite avec Vue 3** via des composants vue déclaratifs, faciles à manipuler.

> **💬 En résumé**
> 
> Vous vous concentrez sur la logique et l'expérience, Ionic se charge du rendu natif.

![demo-ionic-ios-android.gif](/3.3/demo-ionic-ios-android.gif)

## 📐 3.3.2 Les composants de structure (Layout)
Ces composants constituent la "colonne vertébrale" d'une page Ionic

::: details 🔳 `ion-app`
Conteneur racine obligatoire pour toute application Ionic.
Vous n'aurez généralement pas à l'éditer ; il est créé automatiquement dans `main.ts`.
:::

::: details 📄 `ion-page`
Conteneur d'une page individuelle, gère l'animation et la transition.
```vue
<ion-page>
  <ion-header>...</ion-header>
  <ion-content>...</ion-content>
</ion-page>
```
:::

::: details 🔼 `ion-header` / `ion-toolbar` / `ion-title`
Barre d'en-tête de la page, contenant le titre et les actions.
```vue
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Mes notes</ion-title>
  </ion-toolbar>
</ion-header>
```
**Usage :**
- ajouter un titre
- insérer un obuton dans la barre outil (ex. bouton retour, menu)
- changer le thème ou la couleur
:::

::: details 📜 `ion-content`
C'est al zone centrale et scrollable d'une page.
```vue
<ion-content>
  <p>Bienvenue dans l’application.</p>
</ion-content>
```
**Prorpiétés utiles :**
- `fullscreen` : occupe toute la hauteur
- `scroll-events` : écoute les événements de scroll
:::

::: details 🔽 `ion-footer`
Barre de pied de page, pour des actions ou informations persistantes.
```vue
<ion-footer>
  <ion-toolbar>
    <ion-button expand="block">Valider</ion-button>
  </ion-toolbar>
</ion-footer>
```
:::

## 🧱 3.3.3 Les composants d'affichage (Display & Content)
Ces composants permettent de présenter du contenu de manière claire et structurée.

::: details 🪪 `ion-card`
Composant polyvalent pour afficher un bloc d'information.
```vue
<ion-card>
  <ion-card-header>
    <ion-card-title>Note importante</ion-card-title>
  </ion-card-header>

  <ion-card-content>
    Voici un texte à l’intérieur d'une carte.
  </ion-card-content>
</ion-card>
```
:::

::: details 📋 `ion-list` et `ion-item`
Élément classique pour afficher une liste d'éléments.
```vue
<ion-list>
  <ion-item v-for="task in tasks" :key="task.id">
    <ion-label>{{ task.title }}</ion-label>
  </ion-item>
</ion-list>
```
**Propriétés utiles :**
- `button` : rend un item cliquable
- `detail` : ajoute une flèche de navigation
:::

::: details 🏷️ `ion-label`
Affichage de texte, s'adapte automatiquement dans les listes.
```vue
<ion-item>
  <ion-label>Paramètres</ion-label>
</ion-item>
```
:::

::: danger
RAJOUTER LES IMAGES POUR CHACUN POUR VOIR LE RESULTAT SUR UNE APP
:::





