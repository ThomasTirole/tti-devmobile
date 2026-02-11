# 🧭 3.5 Navigation dans une application Ionic-Vue

<iframe src="https://slides.com/tirtho/3-5-navigation-dans-une-application-ionic-vue/embed" width="576" height="420" title="🧭 3.5 Navigation dans une application Ionic-Vue" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

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

## 🌐 Web vs 📱 Mobile : pourquoi la navigation est différente

Dans une application web classique, la navigation repose principalement sur :
- des **URLs** ;
- un historique **linéaire** ;
- un bouton retour qui revient simplement à la page précédente.

Sur mobile, cette approche n’est pas suffisante.

Une application mobile repose sur une **logique d’écrans**, organisés dans des **piles de navigation**, avec :
- des transitions animées ;
- un bouton retour natif ;
- un comportement cohérent avec iOS et Android.

👉 Ionic adopte cette logique mobile-first, même s’il s’appuie sur Vue Router en interne.


## 🧠 3.5.1 Principe général de la navigation dans Ionic-Vue

Ionic-Vue s’appuie sur **Vue Router** pour définir la navigation, mais Ionic ajoute
une couche spécifique afin d’adapter cette navigation aux contraintes du mobile.

Vue Router (`router-link`, `router.push`, etc.) est responsable de :
- la **définition des routes** ;
- la gestion des **URLs** ;
- le passage de **paramètres** ;
- la navigation programmée (`router.push`, `router.replace`, etc.).

> Vue Router décide **où l’application doit naviguer**.

Ionic (notamment via `IonRouterOutlet`) intervient pour :
- gérer la **pile de navigation mobile** ;
- appliquer les **transitions animées natives** ;
- gérer le **bouton retour Android** ;
- gérer le **swipe back iOS** ;
- conserver l’**état des écrans**.

> Le composant `IonRouterOutlet` remplace le `<router-view />` classique et permet à Ionic
de contrôler le cycle de vie des pages mobiles.

Ionic décide **comment la navigation est vécue par l’utilisateur**.

::: tip 💭 À retenir
Vue Router décide *où* aller.  
Ionic décide *comment* on y va.
:::


## 🗺️ 3.5.2 Navigation linéaire et non-linéaire (concept clé)

La documentation officielle Ionic distingue deux grands types de navigation mobile.

Comprendre cette distinction est **fondamental**.

### ➡️ Navigation linéaire (Linear routing)

Si vous avez développé une application web qui utilise le routage, vous avez probablement déjà utilisé le routage linéaire. Cela signifie que vous pouvez avancer ou reculer dans l'historique de l'application en affichant et en masquant des pages.

<video controls width="50%">
  <source src="/3.5/linear-routing-demo.mp4" type="video/mp4">
</video>

::: details **🎞️ Explication de la vidéo**
L'historique de l'application dans cet exemple à ce chemin : `Accessibility` &rarr; `VoiceOver` &rarr; `Speech`

Quand on presse sur le bouton retour, on suit le même chemin de routage en sens inverse. Le routage linéaire est pratique lorsqu'il s'agit de suivre des chemins de routage simples et prédictibles. Cela signifie aussi que l'on peut utiliser des APIs de `Vue Router` comme `router.go()`.
:::

La navigation linéaire correspond à un **parcours séquentiel**, écran après écran.

- les écrans sont empilés dans une **stack** ;
- l'utilisateur avance étape par étape ;
- le bouton retour revient à l'écran précédent ;
- le chemin est généralement unique ;

::: tip 💬 Exemples typiques 
- onboarding (écran d'accueil, présentation, inscription) ;
- formulaire multi-étapes (données personnelles, adresse, paiement) ;
- Liste &rarr; Détail &rarr; Édition.
:::

Dans Ionic, cette navigation repose sur : `ion-router-outlet` pour gérer la pile d'écrans. `router.push()` pour avancer et le bouton retour natif pour revenir en arrière. C'est la forme de navigation la plus proche du **comportement natif mobile**.

> 👉 L'inconvénient du routage linéaire est qu'il ne permet pas d'expérience utilisateur complexes comme les vues en onglets (_Tabs_). C'est là ou le routage non-linéaire entre en jeu.
### 🔀 Navigation non-linéaire (Non-linear routing)
Le routage non-linéaire est un concept qui peut être nouveau pour beaucoup de développeurs web qui veulent développer des apps mobiles avec Ionic.

Le routage non-linéaire signifie que la vue à laquelle l'utilisateur devrait retourner n'est pas nécessairement la vue précédemment affichée à l'écran.

<video controls width="50%">
  <source src="/3.5/non-linear-routing-demo.mp4" type="video/mp4">
</video>

::: details **🎞️ Explication de la vidéo**
Dans cet exemple, on débute sur l'onglet `Originals`. Appuyer sur une carte nous amène sur la vue `Ted Lasso` qui est dans l'onglet `Originals`.

Depuis ici, on change d'onglet pour aller sur `Search`. Ensuite, on appuie à nouveau sur `Originals` et on est amené à nouveau sur la vue `Ted Lasso`. À partir de là, nous avons utilisé la navigation non-linéaire.

**_Pourquoi est-ce du routage non-linéaire ?_** Quand on a appuyé de nouveau sur Originals pour nous retrouver sur la vue `Ted Lasso`, la dernière vue visitée était `Search`. Cependant, en pressant le bouton retour depuis `Ted Lasso`, on revient à `Originals` et non à `Search`. Cela arrive parce que chaque onglet (_tab_), dans une application mobile est considéré comme une pile de navigation séparée !

Si appuyer sur le bouton avait fait appel à la fonction `router.go(-1)`, on serait revenu à `Search` au lieu de `Originals`, ce qui n'est pas correct dans le contexte du routage non-linéaire avec les onglets.

> Le routage non linéaire permet des flux utilisateur sophistiqués que le routage linéaire ne peut pas gérer. Cependant, certaines API de routage linéaire telles que router.go() ne peuvent pas être utilisées dans cet environnement non linéaire. Cela signifie que router.go() ne doit pas être utilisé dans ce genre de cas.
:::

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
```ts [src/router/index.ts]
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
L'un des inconvénients de l'utilisation de `router-link` est que vous ne pouvez pas exécuter de code personnalisé avant la navigation. Vous pouvez utiliser directement Vue Router, mais vous perdez alors la possibilité de contrôler la transition entre les pages. C'est là que `useIonRouter` s'avère utile.

`useIonRouter` est une fonction qui fournit des méthodes pour la navigation tout en permettant un contrôle total sur les transitions de page. Il est ainsi facile d'exécuter du code personnalisé avant la navigation.

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

## 📔 TL;DR
::: details Récapitulatif du chapitre {open}
Ce chapitre explique la navigation mobile dans Ionic‑Vue, et la différence entre routage linéaire et non‑linéaire. Il détaille la structure du router, les patterns Tabs/Menu/Stack, les paramètres et le bouton retour. Il donne des bonnes pratiques pour éviter les pièges.
:::

