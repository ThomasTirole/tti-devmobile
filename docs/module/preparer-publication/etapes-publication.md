# 🧾 4.2 Étapes nécessaires à la publication d'une application mobile
Une fois les conditions de publication connues (plateforme, type de diffusion, contraintes légales), il est nécessaire de comprendre **comment se déroule concrètement la publication** d'une application mobile.

Contrairement à une idée répandue, publier une application ne consiste pas simplement à "envoyer un fichier sur un store".
Il s'agit d'un **processus structurée**, impliquant des étapes techniques, administratives et organisationnelles, communes à la plupart des projets mobiles modernes.

Ce chapitre présente donc le **workflow réel de publication**, tel qu'il set pratiqué aujourd'hui sur **Android et iOS**, notamment dans le cadre d'applications développées avec **Ionic et Capacitor**.

## 🎯 Objectifs d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- décrire les **étapes complètes** nécessaires à la publication d'une application mobile.
- comprendre les **préparatifs techniques** requis avant une soumission ;
- identifier les **éléments obligatoires** demandés par les stores ;
- expliquer le **processus de validation** d'une application ;
- comprendre le rôle des **mises à jour** après publication.

## 👁️ 4.2.1 Vue d'ensemble du processus de publication

Le processus de publication d'une application mobile peut être résumé par les étapes suivantes :

1. finalisation de l'application (code, design, tests) ;
2. préparation technique (configuration, versioning) ;
3. génération du build de production (APK, AAB, IPA) ;
4. préparation des éléments de publication (captures d'écran, description, icônes) ;
5. soumission aux stores (Google Play, App Store) ;
6. validation par la plateforme ;
7. mise en ligne ;
8. suivi et mises à jour.

::: tip 
Il est important de noter que la publication ne marque pas la fin du projet : elle ouvre au contraire une **nouvelle phase de maintenance et d'évolution**.
:::

::: details 🔄️ Processus de publication schématisé
![publish-app-schema.png](/4.2/publish-app-schema.png)

> **Lexique du schéma**
> - **dogfooding** : tester l'application en interne avant de la publier ;
> - **regression tests** : tests visant à vérifier que les fonctionnalités existantes ne sont pas cassées par les nouvelles modifications ;
> - **create release candidate (rc) build** : générer une version de l'application qui sera soumise à la validation, après avoir corrigé les bugs bloquants et finalisé les fonctionnalités principales ;
> - **ASO** : App Store Optimization, ensemble de techniques visant à améliorer la visibilité d'une application sur les stores (choix du nom, description, mots-clés, etc.) ;


:::

## 🛠️ 4.2.2 Préparer l'application techniquement
Avant toute soumission, l'application doit être considérée comme **stable** et **prête à être utilisée** par des **utilisateurs finaux**.

Cela implique que : 
- les fonctionnalités principales sont implémentées ;
- les bugs bloquants sont corrigés ;
- l'application a été testée sur un appareil réel ;
- le comportement correspond à ce qui sera annoncé sur le store.

### ⚙️ Configuration de production
Une application destinée à la publication utilise généralement une configuration différente de celle du développement :
- désactivation des outils de debug ;
- utilisations de clés API de production ;
- gestion plus stricte des erreurs.

### 🏷️ Versioning
Chaque publication repose sur un système de versions :
- une version visible par l'utilisateur (par exemple 1.0.0) ;
- une version interne utilisée par le store ;

::: tip
Ce mécanisme permet d'identifier précisément chaque version, de suivre et gérer les mises à jour et de revenir en arrière en cas de problème.
::: 

## 🔨 4.2.3 Génération du build de production
Une application mobile ne peut pas être publiée directement à partir du code source. Elle doit être transformée en un **build de production**, c'est-à-dire un paquet optimisé pour la distribution.

Dans un projet Ionic : 
- Ionic génère la version web de l'application ;
- Capacitor intègre cette version dans un projet mobile natif ;
- les outils natifs (Android Studio, Xcode) finalisent le paquet.

> 👉 Imaginez ceci comme si vous envoyiez une lettre : vous devez d'abord la rédiger (code), puis la mettre dans une enveloppe (build), avant de la poster (publication).

### 📦 Formats utilisés aujourd'hui
- **Android** : AAB (Android App Bundle), format recommandé par Google Play, remplace progressivement l'APK (Android Package).
- **iOS** : IPA (~~Indian Pale Ale~~ iOS App Archive), format standard pour les applications iOS.

Même si l'application est développée avec des technologies web, le store la traite **exactement comme une application native classique**.

## 🧱 4.2.4 Préparer les éléments de publication
La publication d'une application ne repose pas uniquement sur des éléments techniques.

Les stores exigent également un ensemble d'élément destinés à présenter l'application aux utilisateurs.

- nom de l'application ;
- description courte et détaillée ;
- icône officielle ;
- captures d'écran ;
- catégorie et mots-clés ;
- langues disponibles ;

> 👉 Ces éléments jouent un rôle important : ils permettent de comprendre l'utilité de l'application et influencent la visibilité et le taux de téléchargement.

La publication est donc aussi un **travail de communication et de clarté**.

## 🔐 4.2.5 Informations légales et conformité
Les plateformes de publication imposent une transparence totale concernant la gestion des données.

Une application doit clairement indiquer :
- si elle collecte des données personnelles ;
- quelles permissions sont utilisées ;
- dans quel but les données sont exploitées.

### 👤 Politique de confidentialité
Une politique de confidentialité est obligatoire dès lors que l'application :
- collecte des données utilisateurs ,
- utilise des services tiers (analytics, publicité) ;
- accède à des fonctionnalités sensibles (localisation, caméra, stockage).

Toute incohérence entre l'application et les déclarations fournies peut entraîner un **refus de publication**.

## 📬 4.2.6 Soumission de l'application sur le store
Une fois tous les éléments prêts, l'application peut être soumise à la plateforme choisie.

La soumission comprend :
- le téléversement du build de production ;
- le remplissage des informations demandées ;
- le choix du mode de diffusion (test ou public).

Avant validation finale, il est donc essentiel de :
- vérifier la cohérence entre l'application et sa description ;
- relire les permissions déclarées ;
- s'assurer que toutes les informations sont correctes.

## ⏳ 4.2.7 Processus de validation et revue
Après la soumission, l'application passe par une phase de validation.

Cette validation peut inclure : 
- des contrôles automatiques (sécurité, stabilité) ;
- une revue humaine, notamment pour iOS, où des testeurs vérifient le bon fonctionnement et la conformité aux règles.

Les délais varient selon la plateforme :
- Android : de quelques heures à quelques jours ;
- iOS : généralement plus long et strict (plusieurs jours).

### ⛔ Causes de refus
Les causes de refus les plus fréquentes incluent :
- les crashs de l'application ;
- les permissions injustifiées ;
- le non-respect des règles et guidelines de la plateforme ;
- les descriptions trompeuses ou incomplètes.

> 👉 Un refus est généralement accompagné d'explications permettant de corriger le problème.

![nuh-uh](https://media.tenor.com/c5a_h8U1MzkAAAAM/nuh-uh-beocord.gif)

## 🚀 4.2.8 Publication, suivi et mises à jour
Une fois validée, l'application devient disponible sur le store.

Cependant, la publication marque **le début d'un cycle de vie** :
- les utilisateurs la téléchargent et l'utilisent ;
- des retours apparaissent ;
- des bugs sont découverts.

Les mises à jours vont donc permettre de **corriger les erreurs**, d'**améliorer les performances** et d'ajouter de **nouvelles fonctionnalités** !

> 👉 Chaque mise à jour suit le même **processus de validation** que la version initiale.

## 🧠 4.2.9 Bonnes pratique avant une première publication
Avant une première mise en ligne, il est recommandé de :
- tester l'application sur plusieurs appareils ;
- commencer par une version de test ou beta ;
- vérifier soigneusement les permissions demandées ;
- relire les règles de la plateforme ciblée.

> 👉 Ces bonnes pratiques réduisent fortement les risques de refus et de retours négatifs.

## 🧪 4.2.10 Activité pratique – Simuler une publication

🎯 **Objectif : comprendre concrètement le processus de publication.**

À partir d’une application fictive, vous devez :

- identifier toutes les étapes nécessaires à sa publication ;
- lister les éléments à préparer ;
- anticiper les causes possibles de refus.

La restitution peut prendre la forme :

- d’une checklist ;
- d’un schéma de processus ;
- ou d’un tableau récapitulatif.

## 🔗 4.2.11 Sources et références

- [Ionic – Deploying to Google Play Store](https://ionicframework.com/docs/deployment/play-store)
- [Ionic – Deploying to Apple App Store](https://ionicframework.com/docs/deployment/app-store)
- [Google Play Console – Publish your app](https://support.google.com/googleplay/android-developer/answer/9859152)
- [Google Play – Android App Bundle](https://developer.android.com/guide/app-bundle)
- [Apple – App Store submission process](https://developer.apple.com/app-store/submissions/)
- [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)




