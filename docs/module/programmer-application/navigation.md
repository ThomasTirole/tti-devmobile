# 🧭 3.5 lNavigation dans une application Ionic-Vue

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

