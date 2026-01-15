# 🧪 3.6 Simulation, tests et exécution de l'application mobile

::: danger
à essayer : https://ionicframework.com/docs/angular/your-first-app/distribute
:::

Jusqu'ici, vous avez principalement exécuté votre application Ionic dans un **navigateur web**.
C'est rapide et confortable, mais **ce n'est pas suffisant** pour une vraie application mobile.

Une application mobile doit être testée :
- dans différents environnements,
- avec de vraies contraintes matérielles,
- avec de vraies API natives.

Ce chapitre vous apprend **où**, **comment**, et **quand** exécuter votre application Ionic pour garantir un comportement fiable sur mobile.

## 🎯 Objectifs d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- distinguer les différents **modes d'exécution** dans une application Ionic ;
- exécuter une application sur un **navigateur**, **émulateur** et **appareil réel** ;
- comprendre les différences de comportement entre ces environnements ;
- utiliser les outils de **debug mobile** ;
- tester correctement les **APIs natives Capacitor** ;
- identifier et corriger les erreurs mobiles les plus courantes.

## ⚙️ 3.6.1 Les différents modes d'exécution d'une application Ionic
Une application Ionic peut être exécutée de plusieurs manières :
1. **Dans le navigateur** (mode web)
2. **Dans un émulateur** (mobile simulé)
3. **Sur un appareil réel** (smartphone)

Chaque mode a un **rôle précis** dans le cycle de développement et de test.
::: danger **💡 Attention !**
Une erreur fréquente est de croire qu'une app qui fonctionne dans le navigateur fonctionnera forcément sur mobile. Ce n'est pas le cas.
:::

## 🌐 3.6.2 Exécuter l'application dans le navigateur
La commande la plus utilisée au début du projet est :
```bash
ionic serve
```

Elle permet de lancer l'application dans le navgateur avec :
- rechargement automatique (_hot reload_) à chaque modification du code ;
- accès direct aux DevTools du navigateur ;
- cycle de développement très rapide.

### ✅ Avantages 
- idéal pour travailler l'interface utilisateur
- parfait pour tester la navigation et la logique métier
- très rapide à relancer

### ⚠️ Limites
- les APIs natives (caméra, fichiers, haptics...) ne sont **pas réelles** : elles sont simulées ou indisponibles.
- le comportement peut différer fortement d'un vrai téléphone ;
- certaines fonctionnalités Capacitor sont simulées ou absentes.

> 👉 À utiliser principalement pour l'UI, la navigation et la logique applicative.

## 🤖 3.6.3 Mise en place de l'émulation Android
Un **émulateur** est un téléphone virtuel exécuté sur votre ordinateur.

### Pré-requis
- Android Studio installé
- Android SDK configuré
- Création d'un **AVD** (Android Virtual Device).

### Lien entre Ionic et Android (Capacitor) 
Avant de lancer l'app sur Android, vous devez : 
```bash
ionic build
ionic cap sync android
ionic cap open android
```
- `ionic build` : génère la version web de l'app dans `www/`
- `ionic cap sync android` : copie le build dans le projet Android
- `ionic cap open android` : ouvre Android Studio

Depuis Android Studio, vous pouvez ensuite :
- sélectionner un émulateur,
- lancer l'application.

::: danger
ajouter les étapes, vidéos, gif ou screenshots
:::

::: tip **Pourquoi utiliser un émulateur ?**
- tester différents modèles de téléphones sans les posséder ;
- simuler des conditions réseau, localisation, capteurs ;
- déboguer avec les outils Android Studio.
:::

::: danger
todo : ajouter appflow
todo : ajouter émulateur iOS
todo: exercice à la fin pour chaque type d'appareils
:::

## 📱 3.6.4 Exécution sur un appareil réel
Tester sur un **vrai smartphone** est indispensable avant la publication. Ceci vous permets de vérifier les **performances réelles**, de tester les **vrais capteurs** (caméra, vibrations, GPS) et le **comportement réseau** (4G, Wi-Fi, coupures).

### Pré-requis Android
- activer les **options développeur** sur le téléphone
- activer le **débogage USB**
- connecter le téléphone via USB sur l'ordinateur

::: danger
ajout screenshot ou gif pour la marche à suivre
:::

Une fois connecté, Android Studio détecte l'appareil et permet de lancer l'application directement dessus.

### Pré-requis iOS
```markdown
- activer les **options développeur** sur l'iPhone
- connecter l'iPhone via USB sur l'ordinateur
- ouvrir le projet dans Xcode
- sélectionner l'iPhone comme cible de build
- lancer l'application
- autoriser l'application sur l'iPhone (paramètres > général > gestion des appareils)
- lancer à nouveau l'application depuis Xcode
```
::: danger 
A VERIFIER
:::

> 💡 Certaines erreurs n'apparaissent que sur un vrai appareil (performances, capteurs, UI).

::: danger
https://capacitorjs.com/docs/ios#adding-the-ios-platform
ajouter : npm install @capacitor/ios
:::

## 🐞 3.6.5 Debug et inspection de l'application
Chaque environnement d'exécution (navigateur, émulateur, appareil réel) possède ses propres outils de debug.

### Debug dans le navigateur
Utilisez les **DevTools** intégrés (F12 ou clic droit > Inspecter) pour :
- utiliser la console JavaScript ;
- vérifier les requêtes réseau (requêtes APIs) ;
- vérifier les logs d'errreurs ;

### Debug Android
Utilisez **Android Studio** pour :
- accéder aux logs via Logcat ;
- utiliser l'inspecteur de layout pour vérifier l'UI ;
- utiliser le profiler pour analyser les performances.
- utiliser Chrome Remote Debugging pour inspecter l'application Ionic dans l'émulateur ou sur un appareil réel.

### Erreurs Capacitor courantes
Les erreurs Capacitor sont souvent liées à des persmissions manquantes, une API appelée dans le mauvais environnement, ou des plugins non synchronisés.

::: danger
revoir ce chapitre
:::

## 🔍 3.6.6 Tester les APIs natives dans de vraies conditions
Toutes les APIs natives ne se testent pas de la même manière.

### 📸 Caméra
- navigateur : simulation ou indisponible ;
- émulateur : caméra virtuelle ;
- appareil réel : caméra physique.

### 🌐 Réseau
- tester le mode **offline / online** ;
- observer le comportement de l'app sans connexion.

### 📁 Filesystem
- navigateur : stockage limité ;
- mobile : sandbox réelle de l'application.

### 📳 Haptics
- navigateur : aucun effet ;
- émulateur : souvent absent ;
- appareil réel : retour haptique réel.

> **👉 Conclusion** : les APIs natives doivent toujours être validées **sur un vrai appareil**.

## ⚠️ 3.6.7 Erreurs courantes et pièges classiques
Voici quelques erreurs très fréquentes chez les débutants :
- oublier de lancer `ionic cap sync` après une modification ;
- tester une API native uniquement dans le navigateur ;
- oublier de déclarer une permission Android ;
- application fonctionnelle sur web mais pas sur mobile ;
- confondre problème Ionic et problème Capacitor.

::: tip **🤔 En cas de doute...**
...tester sur appareil réel !
:::

## 🏁 3.6.8 Bonnes pratique de test mobile
- tester sur mobile **le plus tôt possible** dans le cycle de développement ;
- ne pas atteindre la fin du projet
- valider régulièrement les fonctionnalités critiques ;
- considérer le navigateur comme un **outil de développement**, pas comme un environnement de test final ;

## 🧪 3.6.9 Activité pratique - Comparer les environnements
**🎯 Objectif : observer les différences concrètes.**

À réaliser :
1. Lancer l'application dans le navigateur.
2. Lancer la même application dans un émulateur Android
3. Si possible, la lancer sur un appareil réel.
4. Tester :
   5. navigation,
   6. performances,
   7. APIs natives.

> 💡 Notez les différences observées et les éventuels problèmes rencontrés dans chaque environnement.

## 🔗 3.6.10 Ressources et documentation

* [Ionic – Running Your App](https://ionicframework.com/docs/developing/running)
* [Capacitor – Android Guide](https://capacitorjs.com/docs/android)
* [Android Studio](https://developer.android.com/studio)
* [Chrome DevTools – Remote Debugging](https://developer.chrome.com/docs/devtools/remote-debugging)
