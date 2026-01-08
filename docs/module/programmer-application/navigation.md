# 🧭 3.5 Navigation dans une application Ionic-Vue

La navigation est un pilier fondamental dans une application mobile.
Contrairement à une application web classique, une application mobile repose sur une **logique d'écrans**, de **piles de navigation** et de **transitions animées**, fortement liées aux conventions du système d'exploitation.

Dans Ionic-Vue, la navigation s'appuie sur `Vue Router`, mais avec une couche supplémentaire fournie par Ionic afin de garantir une **expérience mobile native cohérente** sur Android et iOS.

## 🎯 Objectifs d'apprentissage
À la fin de ce chapitre, vous serez capable de :
- comprendre la différence entre **navigation-linéaire** et **non-linéaire** ;
- expliquer le rôle de **Vue Router** dans Ionic-Vue ;
- structurer un router adapté au mobile ;
- implémenter les patterns de navigation courants (Stack, Tabs, Menu) ;
- naviguer avec ou sans paramètres ;
- contrôler les transitions et le comportement du bouton retour ;
- éviter les erreurs classiques de navigation hybride.

## 🧠 3.5.1 Principe général de la navigation dans Ionic-Vue
Ionic-Vue utilise `Vue Router` comme moteur de navigation, mais des une différence essentielle :
> 👉 la navigation ne consiste pas seulement à changer d'URL,
> 
> 👉 mais à **empiler et désempiler des écrans** dans une pile de navigation (navigation stack).

Ionic prend en charge :
- les **animations de transition** entre écrans ;
- le bouton **retour Android** ;
- le **swipe back iOS** ;
- la gestion de plusieurs piles de navigation simultanées (Tabs).

L'élément central de ce mécanisme est : 
```html
<ion-router-outlet />
```
Ce composant remplace le `<router-view />` classique et permet à Ionic de contrôler le cycle de vie des pages mobiles.

## 🗺️ 3.5.2 Navigation linéaire et non-linéaire (concept clé)

La documentation officielle Ionic distingue deux grands types de navigation mobile.

Comprendre cette distinction est **fondamental**.

### ➡️ Navigation linéaire (Linear navigation)

La navigation linéaire correspond à un **parcours séquentiel**, écran après écran.

Caractéristiques :
- les écrans sont empilés dans une **stack** ;
- l'utilisateur avance étape par étape ;
- le bouton retour revient à l'écran précédent ;
- le chemin est généralement unique ;

::: details 💬 Exemples typiques {open}
- onboarding (écran d'accueil, présentation, inscription) ;
- formulaire multi-étapes (données personnelles, adresse, paiement) ;
- Liste &rarr; Détail &rarr; Édition.
:::

Dans Ionic, cette navigation repose sur : `ioni-router-outler` pour gérer la pile d'écrans. `router.push()` pour avancer et le bouton retour natif pour revenir en arrière.

> 👉 C'est la forme de navigation la plus proche du **comportement natif mobile**.

### 🔀 Navigation non-linéaire (Non-linear navigation)
La navigation non-linéaire permet à l'utilisateur de **changer librement de section**, sans suivre un chemin unique.

Caractéristiques :
- plusieurs sections accessibles à tout moment ;
- chaque section possède sa **propre pile de navigation** ;
- le bouton retour ne change pas de section.

::: details 💬 Exemples typiques : {open}
- navigation par onglets (Tabs) ;
- menu latéral (Side Menu / Drawer)
:::

Dans Ionic, cela correspond à l'utilisation de `ion-tabs`, `ion-tab-bar` et `ion-menu` pour structurer l'application.

> 👉 Chaque onglet conserve son propre historique, ce qui explique pourquoi Ionic mémorise l'état de chaque section.

::: warning **⚠️ Point clé à retenir**
> Une application Ionic peut combiner navigation linéaire et non-linéaire, mais chaque pattern doit être utilisé **pour le bon usage**.

| Pattern | Type         | Usage recommandé                      |
|---------|--------------|---------------------------------------|
| Stack   | Linéaire     | Détails, formulaires, parcours guidés |
| Tabs    | Non-linéaire | Sections principales                  |
| Menu    | Non-linéaire | Sections secondaires                  |
:::

## 📁 3.5.3 Structure du router Ionic-Vue
La configuration du router se trouve dans :
`src/router/index.ts`

::: details **💬 Exemple typique avec _Tabs_**
```ts [script.ts]
import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: () => import('@/views/TabsPage.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```
:::

::: tip 💭 **Bonnes pratiques**
- utiliser les **redirects** pour définir un point d'entrée clair ;
- privilégier le **lazy loading** (import dynamique, donc chargement à la demande) ;
- laisser Ionic gérer la pile (ne pas bricoler l'historique).
:::
## 📑 3.5.4 Navigation par onglets (Tabs)
La navigation par onglets est le pattern **non-linéaire** le plus courant.

### Composants utilisés 
- `ion-tabs` : conteneur principal des onglets ;
- `ion-tab-bar` : barre d'onglets (généralement en bas)
- `ion-tab-button` : bouton d'onglet individuel.
- `ion-router-outlet` : gère la pile de navigation pour chaque onglet.

```html [Template.vue]
<ion-tabs>
  <ion-router-outlet />

  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="home" href="/tabs/home">
      <ion-label>Accueil</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="settings" href="/tabs/settings">
      <ion-label>Paramètres</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>
```

::: tip 💭 **À retenir**
- chaque onglet possède **sa propre stack** (historique) ;
- changer d'onglet ne vide pas l'historique ;
- le bouton retour agit **dans l'onglet courant**.
:::

## 🔁 3.5.5 Navigation entre pages (Stack Navigation)
### Navigation programmée avec Vue Router
```ts [script.ts]
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/details')
```

### Navigation déclarative avec `router-link`
Ionic permet d'utiliser `router-link` directement sur ses composants :
```html [Template.vue]
<ion-button router-link="/details">
  Voir détails
</ion-button>
```
👉 Avantage : simple et lisible
👉 Limite : impossible d'exécuter du code **avant** la navigation

## 🧠 3.5.6 `useIonRouter` : navigation mobile avancée avec Ionic
Lorsque vous devez :
- valider un formulaire,
- sauvegarder des données,
- contrôler l'animation.

Ionic fournit `useIonRouter` pour une navigation plus fine.
```ts [script.ts]
import { useIonRouter } from '@ionic/vue'

const ionRouter = useIonRouter()
ionRouter.push('/details', 'forward')
```
Cela permet :
- de contrôler la **direction de transition** (`'forward'`, `'back'`, `'root'`) ;
- de rester cohérent avec les animations mobiles natives.

## 📜 3.5.7 Passage de paramètres entre routes
### Route paramétrée
```ts [script.ts]
{
  path: '/notes/:id',
  component: () => import('@/views/NoteDetailPage.vue')
}
```

### Navigation avec paramètre
```ts [script.ts]
router.push(`/notes/${note.id}`)
```

### Récupération du paramètre
```ts [script.ts]
import { useRoute } from 'vue-router'

const route = useRoute()
const noteId = route.params.id
```

## 🔙 3.5.8 Gestion du retour et transitions
Ionic gère automatiquement :
- le bouton retour Android ;
- le swipe back iOS ;

Bouton retour explicite
```html [Template.vue]
<ion-buttons slot="start">
  <ion-back-button default-href="/tabs/home" />
</ion-buttons>
```
::: warning **⚠️ Attention**
Ne pas utiliser `window.history.back()` ou `router.go(-1)` car cela contourne la pile de navigation Ionic et peut provoquer des comportements inattendus.
:::

## 📋 Navigation avec menu latéral (Side Menu)
Le menu latéral est utile pour les sections secondaires, mais peut tout à fait contenir une navigation principale.
```html [Template.vue]
<ion-menu content-id="main-content">
  <ion-content>
    <ion-list>
      <ion-item router-link="/tabs/home">Accueil</ion-item>
      <ion-item router-link="/tabs/settings">Paramètres</ion-item>
    </ion-list>
  </ion-content>
</ion-menu>

<ion-router-outlet id="main-content" />
```
::: info **ℹ️ À savoir**
👉 Éviter de multiplier Menu + Tabs sans raison claire.
:::

## 🛠️ 3.5.10 Bonnes pratiques et erreurs courantes
### Bonnes pratiques
- penser **mobile avant web** ;
- choisir un pattern principal (Tabs, Menu, Stack) ;
- laisser Ionic gérer la navigation ;

### Erreurs fréquentes
- mélanger plusieurs patterns sans logique ;
- gérer manuellement l'historique ;
- raisonner uniquement en URL.

## 🧪 3.5.11 Activité pratique - Mini flow de navigation
Objectif :
- Créer une page Liste ;
- une page Détail ;
- navigation avec paramètre ;
- bouton retour fonctionnel ;
- test navigateur + émulateur

::: danger
A VERIFIER ET TESTER
:::
