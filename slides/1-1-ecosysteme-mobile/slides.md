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

<div class="chap">1.1.4 · Plateformes</div>

# Android vs iOS

| Critère | Android | iOS |
|---|---|---|
| Éditeur | Google, open source (AOSP) | Apple, propriétaire |
| Appareils | Nombreux fabricants | Appareils Apple uniquement |
| Langages | Kotlin, Java | Swift, Objective-C |
| IDE | Android Studio | Xcode, sur macOS |
| Publication | Google Play | App Store, validation stricte |
| Point fort | Flexibilité, grande audience | Cohérence, stabilité |
| Point faible | Fragmentation (versions, écrans) | Écosystème fermé, Mac obligatoire |

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

<div class="chap">1.1.7 · Contraintes</div>

# Développer pour un appareil dans une poche

<div class="grid grid-cols-2 gap-8 mt-6">
<div class="px-card">

### Techniques
- Mémoire et batterie limitées
- Performances variables selon les modèles
- Tailles et ratios d'écran différents
- Réseau instable ou absent

</div>
<div class="px-card blue">

### Expérience utilisateur
- Usage en mobilité, souvent interrompu
- Saisie tactile : grandes zones cliquables
- Lisibilité : textes courts, bons contrastes
- Accessibilité : lecteurs d'écran, sous-titres

</div>
</div>

---

<div class="chap">1.1.8 · Tendances</div>

# Ce qui bouge en 2026

<div class="grid grid-cols-3 gap-5 mt-6">
<div class="px-card blue">
<b>Multiplateforme</b>
<p>Flutter, React Native, Ionic + Capacitor : une seule base de code.</p>
</div>
<div class="px-card">
<b>IA dans les apps</b>
<p>Recommandations, assistants, traitement d'image, de plus en plus sur l'appareil.</p>
</div>
<div class="px-card">
<b>PWA</b>
<p>Installables, hors ligne, mises à jour sans store.</p>
</div>
<div class="px-card">
<b>Réalité augmentée et objets connectés</b>
<p>Montres, capteurs, visualisation 3D.</p>
</div>
<div class="px-card">
<b>5G</b>
<p>Streaming, temps réel, multijoueur. Couverture encore inégale.</p>
</div>
<div class="px-card yellow">
<b>Sobriété et éthique</b>
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
