# 🧪 5.1 Vérifier les exigences fonctionnelle d'une application mobile

Une application mobile ne peut pas être considérée comme "terminée" uniquement parce qu'elle se lance ou qu'elle fonctionne sur le téléphone du développeur.

Avant toute publication (et même tout au long du développement), il est indispensable de **vérifier que les fonctionnalités répondent réellement aux besoin attendus**.


Ce chapitre se concentre sur la **vérification des exigences fonctionnelles**, c'est-à-dire sur la question essentielle :

> Est-ce que l'application fait correctement ce qu'elle est censée faire ?

## 🎯 Objectifs d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- expliquer pourquoi les **tests fonctionnels** sont indispensables dans un projet mobile ;
- définir ce qu'est une **exigence fonctionnelle* ;
- distinguer les principaux **types de tests fonctionnels** sur mobile ;
- rédiger un **cas de test fonctionnel clair et reproductible** ;
- exécuter un test et **analyser son résultat** ;
- identifier et **décrire un bug fonctionnel** de manière structurée ;
- comprendre le rôle des **tests de régression** dans la qualité d'une application mobile.

## 🤔 5.1.1 Pourquoi tester les exigences fonctionnelles ?
Dans un contexte de développement mobile, il est très courant d'entendre des phrases comme :
> "Bah moi ça marche sur mon téléphone ! ☝️🤓"

Or, ce constat est largement insuffisant. Une application mobile est utilisée :
- sur des appareils différents (tailles, performances, OS...),
- dans des conditions et contextes variés (déplacement, luminosité, réseau...),
- par des utilisateurs qui n'ont pas participé à son développement (attentes et expertises diverses).

Un bug fonctionnel peut avoir des conséquences immédiates :
- frustration de l'utilisateur ;
- abandon de l'application ;
- avis négatif sur le store ,
- perte de crédibilité ;
- et comme on l'a vu au niveau de la publication, un potentiel rejet par les stores.

Sur mobile, ces effets sont amplifiés : les utilisateurs désinstallent rapidement une application qui ne fonctionne pas comme prévu. Tester les exigences fonctionnelles permet donc de **détecter les erreurs avant qu'elles n'atteignent les utilisateurs finaux**, et de réduire fortement les risques après publication.

## 🧾 5.1.2 Qu'est-ce qu'une exigence fonctionnelle ?
Une exigence fonctionnelle décrit **une action que l'utilisateur doit pouvoir réaliser** dans l'application.
Elle exprime un besoin concret, du point de vue de l'utilisateur, et non du développeur.

Exemples d'exigences fonctionnelles :
- l'utilisateur peut créer un compte ;
- l'utilisateur peut se connecter ;
- l'utilisateur peut ajouter un élément à une liste ;
- l'utilisateur peut supprimer une donnée ;
- l'utilisateur peut consulter une information ;

::: warning 🚨 Important !
Chaque exigence fonctionnelle doit pouvoir être **comprises clairement**, **testée**, et **validée ou refusée**.
:::

Il existe un lien direct entre :
- une **exigences fonctionnelles** (ce que l'application doit faire) ;
- la **fonctionnalité correspondante** dans l'application (le code qui implémente cette exigence) ;
- un ou plusieurs **tests fonctionnels** (les vérifications qui confirment que l'exigence est bien satisfaite).
![triangle-fonctionnel.svg](/5.1/triangle-fonctionnel.svg)

Sans exigence clairement identifiée, il est impossible de tester correctement.

## 🧪 5.1.3 Types de tests fonctionnels sur mobile
Dans le cadre de ce module, les tests fonctionnels sont principalement **manuels**.
Ils consistent à utiliser l'application comme le ferait un utilisateur, en suivant des scénarios précis.

On distingue notamment : 
- les **tests manuels dirigés**, où l'on suit un cas de test précis ;
- les **tests exploratoires**, où l'on explore l'application de manière plus libre pour détecter des comportements inattendus ;
- les **tests de régression**, réalisés après une correction pour vérifier que les fonctionnalités existantes fonctionnent toujours et qu'on n'a pas dégradé davantage l'application.

Les tests peuvent être réalisés :
- sur un **émulateur** (rapide et pratique), mais avec des limitations ;
- sur un **appareil réel**, indispensable pour valider le comportement réel de l'application.

> 👉 Sur mobile, tester sur un appareil réel est toujours recommandé avant publication.

## 📝 5.1.4 Rédiger un cas de test fonctionnel
Un cas de test décrit précisément comment vérifier une exigence fonctionnelle.

Il doit être suffisamment clair pour que **n'importe quelle personne** puisse l'exécuter et obtenir le même résultat.

Un cas de test fonctionnel contient généralement :
- un **identifiant unique** ou un titre ;
- des préconditions (état initial de l'application) ;
- une suite d'étapes à effectuer ;
- un résultat attendu.

::: details 📝 Exemple simplifié - Test de connexion
- **Préconditions** : l'utilisateur possède un compte valide.
- **Étapes** :
  1. ouvrir l'application.
  2. saisir l'email et le mot de passe ;
  3. appuyer sur "Se connecter".
- **Résultat attendu** : l'utilisateur accède à l'écran principal.
:::

::: tip 💬 Un bon cas de test est :
- précis ;
- compréhensible ;
- reproductible.
:::

## ▶️ 5.1.5 Exécuter les tests et observer les résultats
Exécuter un test consiste à suivre exactement les étapes décrites dans le cas de test et à observer le comportement réel de l'application.

À l'issue de l'exécution, le résultat peut être :
- **conforme** : le résultat observé correspond au résultat attendu ;
- **non conforme** : le comportement diffère de ce uqi est attendu.

::: warning
Il est important de noter les observations, même si le test est réussi !
:::

En cas d'échec, des éléments concrets peuvent être collectés :
- description du problème ;
- capture d'écran ;
- contexte d'utilisation.

> 👉 Ces informations seront utiles pour la correction.

## 🐞 5.1.6 Identifier, décrire et corriger un bug fonctionnel
Un **bug fonctionnel** apparaît lorsqu'une exigence n'est pas respectée.
Pour qu'un bug puisse être corrigé efficacement, il doit être **décrit clairement**.

::: danger ⛔ Exemple d'un mauvais rapport de bug
**_"L'app ne marche pas quand je clique sur le bouton de connexion."_**
 - pas de contexte (appareil, version) ;
 - pas d'étapes précises &rarr; impossible de reproduire le problème.
 - pas de résultat attendu &rarr; donc pas de contexte sur ce qui était voulu.
 - description trop vague &rarr; "ne marche pas" peut signifier beaucoup de choses différentes. (en plus, elle n'a pas de jambes)
:::

Une description de bug fonctionnel comprend généralement :
- le contexte (appareil, version de l'app) ;
- les étapes pour reproduire le problème ;
- le résultat observé ;
- le résultat attendu.

::: tip ☝️🤓 Exemple d'un bon rapport de bug
**_"Sur un iPhone 12 avec la version 1.0.0 de l'application, lorsque je clique sur le bouton de connexion après avoir saisi mes identifiants, rien ne se passe : la page reste statique. J'attendais à être redirigé vers l'écran principal."_**
- contexte précis (iPhone 12, version 1.0.0) ;
- étapes claires (cliquer sur le bouton de connexion après avoir saisi les identifiants) ;
- résultat observé (rien ne se passe, écran statique) ;
- résultat attendu (redirection vers l'écran principal).
:::

Une fois le bug corrigé, le test correspondant doit être **rejoué** pour vérifier que la correction fonctionne et qu'aucune autre fonctionnalité n'a été impactée.

> 👉 Ce cycle est fondamental : test &rarr; bug &rarr; correction &rarr; re-test.

## 🔄 5.1.7 Tests de régression
Corriger un bug peut parfois en créer un autre.
Les **tests de régression** consistent à rejouer des tests existants après une modification du code.

Sur une application mobile, il est particulièrement important de retester :
- les fonctionnalités principales ;
- les parcours utilisateurs critiques (connexion, sauvegarde, navigation, ...).

Même une petite modification peut avoir un impact inattendu sur une autre partie de l'application.

::: details 💡 Petite anecdote...

Sur Twitter et Reddit, un utilisateur a décompilé les fichiers du jeu _Team Fortress 2_ pour y découvrir, dans les assets du jeu, une image de noix de coco.

En essayant de la supprimer, il a constaté que le jeu ne se lançait plus sans ce fichier. Easter egg, bug de régression, simple vérification des fichiers du jeu ? Personne n'en est 100% certains, mais cet exemple montre juste à comprendre qu'une petite modification peut avoir des conséquences inattendues ([c'eeeest l'effet papillon !](https://www.youtube.com/watch?v=pa3bylD7K0s))

Vous trouverez ci-dessous la noix de coco et le commentaire (confus) du développeur en question.
![tf2-coconut.webp](/5.1/tf2-coconut.webp)
> _"I have no f****** idea who put this here, but when I deleted it the game wouldn’t start. Words cannot describe my f***** confusion."_
:::

## 🧠 5.1.8 Bonnes pratiques de test fonctionnel
Pour conclure, voici quelques principes essentiels :
- tester dès que possible, pas uniquement à la fin ;
- tester les cas normaux **et** les cas limites ;
- documenter les tests, même lorsqu'ils réussissent ;
- tester sur appareil réel avant publication.

Les tests fonctionnels sont une **étape clé de la qualité logicielle**, et non une contrainte inutile.

## 🧪 5.1.9 Activité pratique – Tests fonctionnels

À partir d’une application mobile donnée (réelle ou fictive), vous devez :

* identifier **3 à 5 exigences fonctionnelles** ;
* rédiger les **cas de test correspondants** ;
* simuler l’exécution des tests ;
* identifier d’éventuels problèmes ;
* proposer des corrections.

Ce travail peut être réalisé :

* individuellement ;
* ou en binôme.

## 🔗 Sources et références

* [Android Developers – Testing apps](https://developer.android.com/training/testing)
* [Apple Developer – Testing your app](https://developer.apple.com/testflight/)
* [ISTQB – Glossaire des tests logiciels](https://glossary.istqb.org/)


## 📔 TL;DR
::: details Récapitulatif du chapitre {open}
Ce chapitre définit les exigences fonctionnelles et les types de tests associés. Il guide la rédaction de cas de test, l’exécution et le reporting de bugs. Il rappelle l’importance des tests de régression.
:::

