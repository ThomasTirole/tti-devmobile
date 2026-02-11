# 🧑‍🏫 3.2 Rappel UX mobile & introduction aux composants Ionic

<iframe src="https://slides.com/tirtho/3-2-rappel-ux-mobile-composants-ionic/embed" width="576" height="420" title="🧑‍🏫 3.2 Rappel UX mobile & composants Ionic" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

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

Grâce à cette approche :
- vous écrivez **un seul code**,
- Ionic se charge d'appliquer les **bonnes conventions natives**.

👉 Il n'est pas nécessaire de refaire tout le design : Ionic s'en occupe.

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

## 📋 3.2.4 Structure type d'une page Ionic-Vue
Voici la structure minimale recommandée pour chaque page :

``` vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ma Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Contenu principal ici -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// Importer les composants Ionic nécessaires
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
</script>
```
::: details 💡 Explication rapide : {open}
- `ion-page` : structure une page complète. Permet les animations et transitions natives.
- `ion-header` / `ion-toolbar` : zone supérieure : titre, actions, menus.
- `ion-content` : zone scrollable, coeur de l'écran.

> 💭 Ionic a besoin de cette structure pour gérer correctement l'affichage et les interactions.
:::

## 🧩 3.2.5 Activité : créer une première page structurée
**🎯 Objectif :** Modifier une page existante pour utiliser les composants vus ci-dessus.

### Instructions
1. Utilisez le projet Ionic-Vue de test créé précédemment à l'étape 3.1.4. Votre travail sera de modifier la page `Tab1Page.vue` pour tester les différents composants.
2. Remplacez et ajouter du contenu à l'intérieur de `ion-content` pour inclure :
   - Une `carte` avec un titre et du texte.
   - Une `liste` avec plusieurs `items`.
   - Un `bouton` qui affiche du texte dans la console lorsqu'il est cliqué.
     - 🏆 Bonus : un `toast` qui s'affiche lorsque le bouton est cliqué.
::: tip 💭 Rappel
On lance un projet avec la commande `ionic serve`
:::
![demo-3.2.5.gif](/3.2/demo-3.2.5.gif)

::: details ✅ Solution possible
::: code-group
```vue [Tab1Page.vue]
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Bienvenue dans l'app !</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Ceci est votre première interface construite avec Ionic-Vue.
        </ion-card-content>
      </ion-card>

      <ion-button expand="block" @click="handleClick">
        Cliquez-moi
      </ion-button>

      <ion-list>
        <ion-item>
          <ion-label>Élément 1</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Élément 2</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Élément 3</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

    
<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';

function handleClick() {
  console.log('Bouton cliqué !')
}

</script>
```

```vue [🏆 Bonus - Tab1Page.vue]
<ion-button expand="block" @click="showToast">
  Cliquez-moi
</ion-button>
<ion-toast
    :is-open="toastOpen"
    message="Bouton cliqué !"
    duration="2000"
    @did-dismiss="toastOpen = false"
></ion-toast>

<script setup lang="ts">
  import {ref} from 'vue';
  import {IonToast} from '@ionic/vue';
  
  const toastOpen = ref(false);
  function showToast() {
    toastOpen.value = true;
  }
</script>
```
:::

## 📔 TL;DR
::: details Récapitulatif du chapitre
Ce chapitre rappelle les principes UX mobile essentiels et explique la philosophie adaptative d’Ionic. Il liste les composants fondamentaux et la structure type d’une page. Une activité pratique met en œuvre ces composants.
:::

