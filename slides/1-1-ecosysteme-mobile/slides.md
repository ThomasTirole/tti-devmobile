---
title: 1.1 Comprendre l'écosystème mobile
info: M335 - DEV <MOBILE/> - devmobile.ch
transition: fade
routerMode: hash
fonts:
  provider: none
drawings:
  persist: false
layout: default
---

<div class="cover-wrap">
<div>
<div class="chap">M335 · Chapitre 1 · Analyser la donnée et le scénario</div>

# 1.1 Comprendre l'écosystème mobile<span class="blink">_</span>

<p style="font-size:1.2rem;max-width:30rem">D'où vient le mobile, qui domine le marché, et ce que ça change pour vous en tant que développeurs.</p>
</div>
<img src="/logo.png" alt="DEV MOBILE" />
</div>

---

<div class="chap">1.1 · Objectifs</div>

# À la fin de ce chapitre, vous savez...

<div class="grid grid-cols-3 gap-6 mt-8">
<div class="px-card blue" v-click>
<div class="big-num" >01</div>
<p>Décrire les grandes évolutions du développement mobile.</p>
</div>
<div class="px-card" v-click>
<div class="big-num" >02</div>
<p>Identifier les acteurs et plateformes actuels du marché.</p>
</div>
<div class="px-card yellow" v-click>
<div class="big-num" >03</div>
<p>Comprendre les spécificités du marché et leurs conséquences pour un développeur.</p>
</div>
</div>

---

<div class="chap">1.1.1 · Définition</div>

# App mobile ou site web mobile ?

Une **application mobile** est un programme conçu pour tourner sur un smartphone, une tablette ou une montre.

<div class="grid grid-cols-2 gap-8 mt-6">
<div class="px-card blue">

### Application mobile
- Installée localement
- Accès aux **capteurs** : GPS, caméra, micro...
- Peut fonctionner **hors ligne**
- Distribuée via un store

</div>
<div class="px-card">

### Site web mobile
- S'ouvre dans le **navigateur**
- Accès limité au matériel
- Besoin du réseau (sauf PWA)
- Accessible par une simple URL

</div>
</div>

---

<div class="chap">1.1.1 · Exemples concrets</div>

# Trois façons de faire une app

<div class="grid grid-cols-3 gap-6 mt-8">
<div class="px-card blue">

### Native : WhatsApp
Deux codes sources séparés, un pour Android, un pour iOS. Accès complet aux capteurs : caméra, micro, localisation.

</div>
<div class="px-card">

### Multiplateforme : Discord
L'app mobile est développée en **React Native** : une seule base de code pour Android et iOS.

</div>
<div class="px-card yellow">

### PWA : Starbucks
En plus des apps natives, une version web qu'on **installe depuis le navigateur**, sans passer par un store.

</div>
</div>

---

<div class="chap">1.1.2 · Pourquoi le mobile ?</div>

# Le mobile, premier accès à Internet

<div class="grid grid-cols-2 gap-10 mt-10 items-center">
<div class="px-card blue" style="text-align:center">
<div class="big-num">~60%</div>
<p>du trafic web mondial vient d'un téléphone</p>
</div>
<div>

Les entreprises misent sur les apps pour :

- une **expérience fluide** et personnalisée
- créer de la **proximité** : notifications, géolocalisation
- proposer des **fonctions inédites** : réalité augmentée, paiement sans contact, biométrie

</div>
</div>

<div class="src">Source : StatCounter, desktop vs mobile vs tablette, monde, octobre 2026</div>

---

<div class="chap">1.1.3 · Histoire</div>

# 25 ans de mobile en 5 étapes

<div class="timeline">
<div v-click>
<div class="year">2000</div>
<p><b>Java ME, Symbian</b><br>Premiers jeux et outils mobiles</p>
</div>
<div v-click>
<div class="year">2007</div>
<p><b>iPhone</b><br>Naissance du smartphone moderne</p>
</div>
<div v-click>
<div class="year">2008</div>
<p><b>App Store, Android Market</b><br>Les écosystèmes d'apps apparaissent</p>
</div>
<div v-click>
<div class="year">2010+</div>
<p><b>PhoneGap, Ionic, React Native, Flutter</b><br>Une base de code, plusieurs plateformes</p>
</div>
<div v-click>
<div class="year">2020+</div>
<p><b>SwiftUI, Jetpack Compose, IA embarquée</b><br>UI déclarative, modèles d'IA sur l'appareil</p>
</div>
</div>

<div class="px-card yellow mt-10" v-click>
Les outils simplifient le travail et unifient les plateformes, mais <b>chaque système garde ses particularités</b>.
</div>

---

<div class="chap">1.1.4 · Plateformes</div>

# Deux systèmes se partagent le marché

<div class="mt-10">
<div class="bar">
<div style="width:68%;background:var(--screen)">Android · 68%</div>
<div style="width:32%;background:#dcdcdc;border-left:4px solid var(--ink)">iOS · 32%</div>
</div>
<p style="margin-top:.8rem">Le reste (HarmonyOS, KaiOS...) pèse moins de 1% au niveau mondial.</p>
</div>

<div class="px-card mt-8" v-click>
<b>Attention :</b> ces chiffres varient énormément selon la région. En Suisse, iOS est beaucoup plus présent qu'au niveau mondial. C'est l'objet de l'exercice à la fin du chapitre.
</div>

<div class="src">Source : StatCounter, systèmes d'exploitation mobiles, monde, août 2026</div>

---

<div class="chap">1.1.4 · Plateformes · Android</div>

# Android

<div class="grid grid-cols-2 gap-8 mt-6">
<div class="px-card blue">

### Fiche
- Système **open source** (AOSP) développé par Google
- Utilisé par de **nombreux fabricants** : Samsung, Xiaomi, Google...
- Langages : **Kotlin**, Java
- IDE : **Android Studio**
- Publication : **Google Play**

</div>
<div>
<div class="px-card" style="margin-bottom:1.2rem">

### Avantages
Flexibilité, très large audience, liberté de distribution (APK, stores alternatifs).

</div>
<div class="px-card grey">

### Inconvénients
Forte **fragmentation** : beaucoup de versions d'Android et de tailles d'écran à tester.

</div>
</div>
</div>

---

<div class="chap">1.1.4 · Plateformes · iOS</div>

# iOS

<div class="grid grid-cols-2 gap-8 mt-6">
<div class="px-card blue">

### Fiche
- Système **propriétaire** d'Apple, limité à ses appareils
- Langages : **Swift** (moderne), Objective-C (historique)
- IDE : **Xcode**, uniquement sur **macOS**
- Publication : **App Store**, avec une validation stricte

</div>
<div>
<div class="px-card" style="margin-bottom:1.2rem">

### Avantages
Stabilité, performances, cohérence visuelle, parc d'appareils homogène.

</div>
<div class="px-card grey">

### Inconvénients
Écosystème fermé, Mac obligatoire pour compiler, compte développeur payant.

</div>
</div>
</div>

---

<div class="chap">1.1.4 · Plateformes · Comparatif</div>

# Comparatif rapide

| Critère | Android | iOS |
|---|---|---|
| Éditeur | Google, open source (AOSP) | Apple, propriétaire |
| Appareils | Nombreux fabricants | Appareils Apple uniquement |
| Langages | Kotlin, Java | Swift, Objective-C |
| IDE | Android Studio | Xcode, sur macOS |
| Publication | Google Play | App Store, validation stricte |
| Point fort | Flexibilité, grande audience | Cohérence, stabilité |
| Point faible | Fragmentation (versions, écrans) | Écosystème fermé, Mac obligatoire |

<p class="mt-6" style="font-family:'Jersey 10';font-size:1.6rem">Android : flexibilité et audience. iOS : uniformité et expérience contrôlée.</p>

---

<div class="chap">1.1.5 · Cycle de vie</div>

# Une app ne s'arrête pas au code

<div class="steps">
<div class="px-card blue" v-click>
<div class="n">1</div>
<b>Analyse</b>
<p>Besoins, fonctionnalités, maquettes</p>
</div>
<div class="px-card" v-click>
<div class="n">2</div>
<b>Développement</b>
<p>Interfaces, fonctions, permissions</p>
</div>
<div class="px-card" v-click>
<div class="n">3</div>
<b>Tests</b>
<p>Plusieurs appareils, perf, sécurité</p>
</div>
<div class="px-card" v-click>
<div class="n">4</div>
<b>Publication</b>
<p>Build de release, soumission au store</p>
</div>
<div class="px-card yellow" v-click>
<div class="n">5</div>
<b>Maintenance</b>
<p>Bugs, nouvelles versions de l'OS, retours</p>
</div>
</div>

<p class="mt-10" v-click style="font-family:'Jersey 10';font-size:1.9rem">5 → 1 : c'est un cycle. Chaque version améliore la précédente.</p>

---

<div class="chap">1.1.6 · Distribution</div>

# Comment une app arrive sur un téléphone

<div class="grid grid-cols-3 gap-6 mt-8">
<div class="px-card blue">

### Store officiel
Google Play, App Store. Le cas le plus courant pour le grand public.

</div>
<div class="px-card">

### Distribution interne
Apps métier, tests bêta (TestFlight, tests fermés Google Play).

</div>
<div class="px-card grey">

### Web App / PWA
Sans store : s'installe depuis le navigateur, mise à jour automatique.

</div>
</div>

<div class="px-card yellow mt-8">
Les mises à jour servent à corriger, à suivre les nouvelles versions d'Android et d'iOS, et à garder les utilisateurs.
</div>

---

<div class="chap">1.1.7 · Contraintes · Techniques</div>

# Contraintes techniques

<div class="grid grid-cols-2 gap-6 mt-8">
<div class="px-card ">
<b>Mémoire et batterie limitées</b>
<p>Une app gourmande se fait fermer par le système, ou désinstaller par l'utilisateur.</p>
</div>
<div class="px-card blue">
<b>Performances variables</b>
<p>Un téléphone d'entrée de gamme n'a rien à voir avec le dernier iPhone.</p>
</div>
<div class="px-card blue">
<b>Écrans différents</b>
<p>Tailles et ratios variés, encoches, écrans pliables.</p>
</div>
<div class="px-card ">
<b>Réseau instable ou absent</b>
<p>Train, tunnel, montagne : l'app doit le gérer proprement.</p>
</div>
</div>

---

<div class="chap">1.1.7 · Contraintes · Expérience utilisateur</div>

# Contraintes d'expérience utilisateur

<div class="grid grid-cols-2 gap-5 mt-4">
<div class="px-card ">
<b>Usage en mobilité</b>
<p>L'utilisateur peut être interrompu à tout moment.</p>
</div>
<div class="px-card blue">
<b>Saisie tactile</b>
<p>Grandes zones cliquables, gestes intuitifs.</p>
</div>
<div class="px-card blue">
<b>Lisibilité</b>
<p>Textes courts, contrastes élevés, polices adaptées.</p>
</div>
<div class="px-card ">
<b>Accessibilité</b>
<p>Lecteurs d'écran, sous-titres, contrastes suffisants.</p>
</div>
</div>

<div class="px-card yellow mt-5">Objectif : une expérience fluide et cohérente, malgré ces contraintes.</div>

---

<div class="chap">1.1.8 · Tendances · 1/5</div>

# 1. Applications multiplateformes

<div class="px-card blue mt-6">

**Flutter**, **React Native** ou **Ionic + Capacitor** permettent de développer **une seule base de code** pour Android et iOS.

C'est l'approche qu'on utilise dans ce module.

</div>

<div class="grid grid-cols-2 gap-6 mt-6">
<div class="px-card"><b>Avantage</b><p>Gain de temps et de maintenance.</p></div>
<div class="px-card grey"><b>Limite</b><p>Parfois moins performant qu'une app native.</p></div>
</div>

---

<div class="chap">1.1.8 · Tendances · 2/5</div>

# 2. Intelligence artificielle et personnalisation

<div class="px-card blue mt-6">

- Personnaliser l'expérience : recommandations, assistants
- Automatiser des fonctions : reconnaissance vocale, traitement d'image
- Analyser les usages pour améliorer l'interface
- De plus en plus de modèles tournent **directement sur le téléphone**

</div>


---

<div class="chap">1.1.8 · Tendances · 3/5</div>

# 3. 5G et au-delà

<div class="px-card blue mt-6">

Des connexions ultra-rapides pour des apps plus riches : streaming 4K, réalité augmentée, jeux multijoueurs, outils collaboratifs en temps réel.

</div>

<div class="grid grid-cols-2 gap-6 mt-6">
<div class="px-card grey"><b>Limite</b><p>Il faut une bonne couverture réseau, encore inégale selon les régions.</p></div>
</div>

---

<div class="chap">1.1.8 · Tendances · 4/5</div>

# 4. Progressive Web App (PWA)

<div class="px-card blue mt-6">

Les PWA combinent web et mobile :

- installation depuis le navigateur
- fonctionnement hors ligne
- mises à jour automatiques, sans store
- une seule app pour toutes les plateformes

</div>


---

<div class="chap">1.1.8 · Tendances · 5/5</div>

# 5. Réalité augmentée et objets connectés

<div class="px-card blue mt-6">

L'essor de l'AR et des objets connectés (montres, capteurs, IoT) ouvre de nouvelles possibilités.

Exemples : **IKEA Place** pour visualiser un meuble en 3D chez soi, **Strava** pour suivre une activité en temps réel.

</div>


---

<div class="chap">1.1.8 · Tendances · Et ensuite ?</div>

# Tendances futures

<div class="grid grid-cols-3 gap-6 mt-8">
<div class="px-card blue">
<b>Apps contextuelles</b>
<p>Elles s'adaptent au lieu ou au moment de la journée.</p>
</div>
<div class="px-card">
<b>Mobile, montre, web</b>
<p>Une meilleure continuité entre les appareils.</p>
</div>
<div class="px-card yellow">
<b>Éthique et sobriété</b>
<p>Données personnelles, consommation, temps d'écran.</p>
</div>
</div>

---

<div class="chap">1.1.9 · Exercice</div>

# Exercice 1 · Analyse du marché mobile

<div class="grid grid-cols-2 gap-8 mt-6">
<div class="px-card blue">

### Recherchez
La part de marché actuelle d'**Android** et d'**iOS** :
- dans le monde
- en Europe
- en Suisse

<p style="font-size:.9rem">Source conseillée : gs.statcounter.com</p>
</div>
<div class="px-card">

### Puis répondez
Quelles conséquences pour un développeur qui veut publier dans ces régions ?
- sur le **choix des technologies**
- sur la **stratégie marketing**

</div>
</div>

<p class="mt-8" style="font-family:'Jersey 10';font-size:1.8rem">Par deux · 20 minutes · mise en commun ensuite</p>

---
layout: default
---

<div class="chap">1.1 · À retenir</div>

# En une slide

<div class="px-card mt-6" style="font-size:1.25rem;line-height:1.7">

- Une app mobile s'installe, utilise les **capteurs** et peut marcher **hors ligne**.
- Le mobile représente environ **60% du trafic web** mondial.
- **Android** domine le monde, **iOS** est fort en Suisse et dans les pays riches.
- Une app suit un **cycle** : analyse, dev, tests, publication, maintenance.
- On développe sous **contraintes** : batterie, écran, réseau, usage en mouvement.

</div>
