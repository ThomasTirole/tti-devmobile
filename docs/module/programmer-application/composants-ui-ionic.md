# 🖼️ 3.3 Les composants UI d'Ionic

<iframe src="https://slides.com/tirtho/3-3-les-composants-ui-d-ionic/embed" width="576" height="420" title="🖼️ 3.3 Les composants UI d'Ionic" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

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

<figure style="display:flex;justify-content:center;">
  <img src="/3.3/demo-ionic-ios-android.gif" alt="demo android ios" width="400" />
</figure>

::: warning **🚨 IMPORTANT 🚨**
Cette liste n'est pas exhaustive et ne couvre pas tous les composants Ionic disponibles. Il est aussi de votre responsabilité de consulter la [documentation officielle d'Ionic](https://ionicframework.com/docs/components) pour découvrir d'autres composants et leurs fonctionnalités avancées, afin d'enrichir vos applications.
:::

## 📐 3.3.2 Les composants de structure (Layout)
Ces composants constituent la "colonne vertébrale" d'une page Ionic

::: details 🔳 `ion-app`
Conteneur racine obligatoire pour toute application Ionic.
Vous n'aurez généralement pas à l'éditer ; il est créé automatiquement dans `main.ts`.
:::

::: details 📄 `ion-page`
Conteneur d'une page individuelle, gère l'animation et la transition.
```html
<ion-page>
  <ion-header>...</ion-header>
  <ion-content>...</ion-content>
</ion-page>
```
:::

::: details 🔼 `ion-header` / `ion-toolbar` / `ion-title`
Barre d'en-tête de la page, contenant le titre et les actions.
```html
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
```html
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
```html
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
```html
<ion-card>
  <ion-card-header>
    <ion-card-title>Note importante</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    Voici un texte à l’intérieur d'une carte.
  </ion-card-content>
</ion-card>
```
![ion-card.png](/3.3/ion-card.png)
:::

::: details 📋 `ion-list` et `ion-item`
Élément classique pour afficher une liste d'éléments.
```html
<ion-list>
  <ion-item v-for="task in tasks" :key="task.id">
    <ion-label>{{ task.title }}</ion-label>
  </ion-item>
</ion-list>
```
**Propriétés utiles :**
- `button` : rend un item cliquable
- `detail` : ajoute une flèche de navigation

![ion-list.png](/3.3/ion-list.png)
:::

::: details 🏷️ `ion-label`
Affichage de texte, s'adapte automatiquement dans les listes.
```html
<ion-item>
  <ion-label>Paramètres</ion-label>
</ion-item>
```
:::

::: details 👤 `ion-avatar`
Pour afficher des photos de profil.
```html
<ion-item>
  <ion-avatar slot="start">
    <img src="/assets/avatar.png" />
  </ion-avatar>
  <ion-label>Jean Dupont</ion-label>
</ion-item>
```
![ion-avatar.png](/3.3/ion-avatar.png)
:::

::: details 💬 `ion-chip`
Petit badge pour taguer du contenu.
```html
<ion-chip color="success">Terminé</ion-chip>
```
![ion-chip.png](/3.3/ion-chip.png)
:::

::: details 🔣 `ion-icon`
Utilise l'iconographie Ionicons intégrée.
```html
<ion-icon :icon="checkmarkCircle" />
```
![ion-icon.png](/3.3/ion-icon.png)
:::

## 🎛️ 3.3.4 Les composants de formulaires et interactions
Ces composants permettent de créer des formulaires interactifs et de recueillir des données utilisateur.

::: details ⌨️ `ion-input`
Champ de texte simple.
```html
<ion-item>
  <ion-input label="Prénom" placeholder="Entrez votre prénom"></ion-input>
</ion-item>
```
![ion-input.png](/3.3/ion-input.png)
:::

::: details 📝 `ion-textarea`
Pour les contenus longs (multiligne).
```html
<ion-textarea v-model="content" auto-grow />
```
![ion-textarea.png](/3.3/ion-textarea.png)
:::

::: details 🔘 `ion-toggle`
Interrupteur binaire (on/off).
```html
<ion-toggle v-model="isEnabled">Activer</ion-toggle>
```
![ion-toggle.png](/3.3/ion-toggle.png)
:::

::: details ☑️ `ion-checkbox`
Case à cocher.
```html
<ion-checkbox v-model="checked">Accepter</ion-checkbox>
```
![ion-checkbox.png](/3.3/ion-checkbox.png)
:::

::: details 🔘 `ion-radio` et `ion-radio-group`
Boutons radio pour choix exclusif.
```html
  <ion-radio-group value="strawberries">
    <ion-radio value="grapes">Grapes</ion-radio><br />
    <ion-radio value="strawberries">Strawberries</ion-radio><br />
    <ion-radio value="pineapple">Pineapple</ion-radio><br />
    <ion-radio value="cherries">Cherries</ion-radio>
  </ion-radio-group>
> La valeur par défaut est "strawberries" &rarr; définie via `value` sur le groupe parent.
```
![ion-radio.png](/3.3/ion-radio.png)
:::
::: details 🔽 `ion-select`
Menu déroulant mobile.
```html
<ion-select v-model="category" placeholder="Choisir une catégorie">
  <ion-select-option value="work">Travail</ion-select-option>
  <ion-select-option value="home">Maison</ion-select-option>
</ion-select>
```

![ion-select.png](/3.3/ion-select.png)
:::

::: details 🟢 `ion-button`
Bouton polyvalent.
```html
<ion-button expand="block" @click="saveNote">
  Sauvegarder
</ion-button>
```
**Propriétés utiles :**
- `expand="block"` : bouton pleine largeur
- `color="primary"` : thème de couleur
- `fill="outline"` : bouton contour

![ion-button.png](/3.3/ion-button.png)
:::

## 🔔 3.3.5 Feedback utilisateur
Ces composants permettent de fournir des retours visuels à l'utilisateur, essentiels pour une bonne expérience utilisateur.

::: details 🍞 `ion-toast`
Composant pour afficher des notifications temporaires.
::: code-group
```html [Template.vue]
<ion-button id="open-toast">Open Toast</ion-button>
<ion-toast 
        trigger="open-toast" 
        message="Hello World!" 
        :duration="3000"
></ion-toast>
```
```ts [script.ts]
import { IonButton, IonToast } from '@ionic/vue';
```
<figure style="display:flex;justify-content:center;">
  <img src="/3.3/ion-toast.gif" alt="ion-toast" width="200" />
</figure>
:::

::: details ⚠️ `ion-alert`
Boîte de dialogue modale pour alertes et confirmations.
::: code-group
```html [Template.vue]
<ion-button id="present-alert">Click Me</ion-button>
  <ion-alert
    trigger="present-alert"
    header="A Short Title Is Best"
    sub-header="A Sub Header Is Optional"
    message="A message should be a short, complete sentence."
    :buttons="alertButtons"
  ></ion-alert>
```
```ts [script.ts]
import { IonAlert, IonButton } from '@ionic/vue';

const alertButtons = ['Action'];
```
<figure style="display:flex;justify-content:center;">
  <img src="/3.3/ion-alert.gif" alt="ion-toast" width="200" />
</figure>
:::

::: details ⏳ `ion-loading`
Indicateur de chargement modale.
::: code-group
```html [Template.vue]
<ion-button id="open-loading">Show Loading</ion-button>
<ion-loading trigger="open-loading" :duration="3000" message="Dismissing after 3 seconds..."> </ion-loading>
```
```ts [script.ts]
import { IonButton, IonLoading } from '@ionic/vue';
```
<figure style="display:flex;justify-content:center;">
  <img src="/3.3/ion-loading.gif" alt="ion-toast" width="200" />
</figure>
:::

## 🧭 3.3.6 Composants de navigation visuelle (UI Navigation)
Ces composants facilitent la navigation entre les différentes sections de l'application.

::: details 🗂️ `ion-tabs` / `ion-tab-bar` / `ion-tab-button`
Navigation par onglets en bas de l'écran. Très courante dans les applications mobiles.
```html
<ion-tabs>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="home">Accueil</ion-tab-button>
    <ion-tab-button tab="settings">Paramètres</ion-tab-button>
  </ion-tab-bar>
</ion-tabs>
```
:::

::: details 📜 `ion-menu`
Menu latéral coulissant. Idéal pour les applications avec beaucoup de sections.
```html
<ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the menu content.</ion-content>
</ion-menu>
```
:::

## 🧪 3.3.7 Activité : construire un écran complet
**🎯 Objectif : créer un écran Ionic complet composé de plusieurs types de composants.**
Dans `Tab2Page.vue`, vous devez :
1. Ajouter un header avec un titre et un bouton d'action
2. Afficher une liste dynamique avec `v-for`.
3. Ajouter un bouton pour ouvrir une modale.
4. Afficher un toast lorsqu'une action de votre choix est effectuée.
5. (Optionnel) Ajouter une searchbar pour filtrer la liste.
6. (Optionnel) Ajouter un refresher pour **simuler** un refresh.

::: details ✅ Solution possible
```html [Tab2Page.vue]
<template>
  <ion-page>
    <!-- ✅ HEADER : titre + bouton d'action -->
    <ion-header>
      <ion-toolbar>
        <ion-title>Mes tâches</ion-title>
        <ion-buttons slot="end">
          <!-- Ajout "rapide" (sans passer par la modal) -->
          <ion-button @click="addQuickTask">
            <ion-icon :icon="addOutline" slot="start" />
            Rapide
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- ✅ (Optionnel) PULL TO REFRESH : geste mobile classique -->
      <ion-refresher slot="fixed" @ionRefresh="onRefresh">
        <ion-refresher-content />
      </ion-refresher>

      <!-- ✅ (Optionnel) SEARCHBAR : filtrer la liste -->
      <ion-item>
        <ion-searchbar
          v-model="query"
          placeholder="Rechercher…"
          inputmode="search"
        />
      </ion-item>

      <!-- ✅ Affichage dans une carte -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>À faire</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- ✅ Liste dynamique v-for -->
          <ion-list v-if="filteredTasks.length">
            <ion-item v-for="task in filteredTasks" :key="task.id">
              <ion-label>{{ task.title }}</ion-label>
              <!-- Bouton "done" -->
              <ion-button
                slot="end"
                fill="clear"
                @click="completeTask(task.id)"
                aria-label="Terminer"
              >
                <ion-icon :icon="checkmarkCircleOutline" />
              </ion-button>
            </ion-item>
          </ion-list>

          <!-- ✅ Message si aucune tâche (ou aucun résultat de recherche) -->
          <ion-text v-else color="medium">
            Aucune tâche (ou aucun résultat).
          </ion-text>
        </ion-card-content>
      </ion-card>

      <!-- ✅ Bouton : ouvre la modal -->
      <ion-button expand="block" @click="isModalOpen = true">
        <ion-icon :icon="addOutline" slot="start" />
        Ajouter une tâche
      </ion-button>

      <!-- ✅ MODAL : formulaire d'ajout -->
      <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Nouvelle tâche</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal">Fermer</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
              v-model="newTitle"
              label="Titre"
              label-placement="stacked"
              placeholder="Ex: Réviser les IonCard"
            />
          </ion-item>

          <ion-button expand="block" class="ion-margin-top" @click="saveTask">
            Enregistrer
          </ion-button>
        </ion-content>
      </ion-modal>

      <!-- ✅ TOAST : feedback utilisateur -->
      <ion-toast
        :is-open="toastOpen"
        :message="toastMessage"
        :duration="2000"
        @didDismiss="toastOpen = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
/**
 * ✅ Objectif pédagogique :
 * - montrer un écran complet Ionic : Header, Content, List, Modal, Toast
 * - + optionnel : Searchbar + Refresher
 *
 * ⚠️ Important :
 * Chaque tâche doit avoir un ID UNIQUE.
 * Sinon, quand on supprime une tâche par id, on risque de supprimer plusieurs tâches à la fois.
 */

import { computed, ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonModal,
  IonInput,
  IonToast,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue'

import { addOutline, checkmarkCircleOutline } from 'ionicons/icons'

/** Type TypeScript simple : une tâche a un id + un titre */
type Task = { id: number; title: string }

/** Liste de base */
const tasks = ref<Task[]>([
  { id: 1, title: 'Découvrir IonCard' },
  { id: 2, title: 'Ajouter une modal' },
  { id: 3, title: 'Afficher un toast' },
])

/**
 * ✅ Solution la plus simple contre les doublons d'ID :
 * on utilise un compteur qui s'incrémente à chaque ajout.
 * Comme ça, on ne génère JAMAIS deux fois le même id.
 */

const nextId = ref(4)

/** Search */
const query = ref('')

/** Liste filtrée selon le texte de recherche */
const filteredTasks = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return tasks.value
  return tasks.value.filter(t => t.title.toLowerCase().includes(q))
})

/** Modal */
const isModalOpen = ref(false)
const newTitle = ref('')

/** Toast */
const toastOpen = ref(false)
const toastMessage = ref('')

function showToast(message: string) {
  toastMessage.value = message
  toastOpen.value = true
}

/** Fermer la modal + reset du champ */
function closeModal() {
  isModalOpen.value = false
  newTitle.value = ''
}

/** Ajouter une tâche depuis la modal */
function saveTask() {
  const title = newTitle.value.trim()

  // Validation : si vide -> toast
  if (!title) {
    showToast('⚠️ Merci de saisir un titre')
    return
  }

  // ✅ ID unique grâce au compteur
  tasks.value.unshift({ id: nextId.value++, title })

  closeModal()
  showToast('✅ Tâche ajoutée')
}

/** Ajout rapide depuis le header */
function addQuickTask() {
  tasks.value.unshift({ id: nextId.value++, title: 'Nouvelle tâche (rapide)' })
  showToast('➕ Ajout rapide effectué')
}


/** "Terminer" une tâche : on la retire de la liste */
function completeTask(id: number) {
  // ⚠️ Si plusieurs tâches avaient le même id, elles seraient toutes supprimées
  // D'où l'intérêt d'un id unique !
  tasks.value = tasks.value.filter(t => t.id !== id)
  showToast('🎉 Tâche terminée')
}

/** Pull-to-refresh : simulation d'un refresh */
function onRefresh(ev: CustomEvent) {
  setTimeout(() => {
    showToast('🔄 Liste rafraîchie')
    ;(ev.target as HTMLIonRefresherElement).complete()
  }, 600)
}
</script>
```
:::

## 📔 TL;DR
::: details Récapitulatif du chapitre
Ce chapitre présente les composants Ionic de structure, contenu, formulaires, feedback et navigation. Il explique pourquoi Ionic accélère le développement mobile tout en respectant les conventions iOS/Android. Il se termine par une activité de création d’écran complet.
:::

