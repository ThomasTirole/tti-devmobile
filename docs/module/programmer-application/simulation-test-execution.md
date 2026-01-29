# 🧪 3.6 Simulation, tests et exécution de l'application mobile

<iframe src="https://slides.com/tirtho/3-6-simulation-tests-et-execution-de-l-application-mobile/embed" width="576" height="420" title="🧪 3.6 Simulation, tests et exécution de l'application mobile" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

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

> Note : il existe beaucoup de plateformes d'émulation (Android, iOS, différents modèles de téléphones). Cependant, pour des raisons de coût et de complexité, nous nous concentrerons ici sur méthodes d'émulations "natives" aux plateformes Android et iOS.

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

### ⚒️ Fonctionnalités avancées du DevTools
Les DevTools du navigateur offrent des fonctionnalités avancées pour simuler un environnement mobile :
- **Mode appareil** : simule la taille d'écran et le comportement tactile ;
- **Simulation de la géolocalisation** : définir une position GPS fictive ;
- **Simulation du réseau** : tester différents types de connexion (4G, offline) ;
- **Console JavaScript** : inspecter les erreurs et logs.
- **Utilisation des capteurs** (accéléromètre, gyroscope) via des extensions.

> Pour ce faire, ouvrez les DevTools (F12 ou clic droit > Inspecter), puis dans les paramètres supplémentaires (trois points > More tools > Sensors ), vous trouverez des options pour simuler la géolocalisation, le réseau, l'orientation, la pression du toucher, etc.

## 🤖 3.6.3 Mise en place de l'émulation Android
Un **émulateur** est un téléphone virtuel exécuté sur votre ordinateur.

### Pré-requis
- Android Studio installé
- Android SDK configuré
- Création d'un **AVD** (Android Virtual Device).
- Package Android installé dans Capacitor :
```bash
npm install @capacitor/android
npx cap add android
```

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

::: tip **Pourquoi utiliser un émulateur ?**
- tester différents modèles de téléphones sans les posséder ;
- simuler des conditions réseau, localisation, capteurs ;
- déboguer avec les outils Android Studio.
:::

## 🍎 3.6.4 Mise en place de l'émulation iOS
> 💡 L'émulation iOS nécessite un Mac avec Xcode installé.

### Pré-requis
- Mac avec Xcode installé
- Package iOS installé dans Capacitor :
```bash
npm install @capacitor/ios
npx cap add ios
```

### Lien entre Ionic et iOS (Capacitor)
Avant de lancer l'app sur iOS, vous devez :
```bash
ionic build
ionic cap sync ios
ionic cap open ios
```
- `ionic build` : génère la version web de l'app dans `www/`
- `ionic cap sync ios` : copie le build dans le projet iOS
- `ionic cap open ios` : ouvre Xcode

Depuis Xcode, vous pouvez ensuite :
- sélectionner un simulateur iPhone,
- lancer l'application.

## 📱 3.6.5 Exécution sur un appareil réel
Tester sur un **vrai smartphone** est indispensable avant la publication. Ceci vous permet de vérifier les **performances réelles**, de tester les **vrais capteurs** (caméra, vibrations, GPS) et le **comportement réseau** (4G, Wi-Fi, coupures).

### Pré-requis Android
- activer les **options développeur** sur le téléphone
- activer le **débogage USB**
- connecter le téléphone via USB sur l'ordinateur

Une fois connecté, Android Studio détecte l'appareil et permet de lancer l'application directement dessus.

### Pré-requis iOS

- avoir un Mac avec Xcode installé
- avoir un compte développeur Apple
- activer les **options développeur** sur l'iPhone
- connecter l'iPhone via USB sur l'ordinateur
- ouvrir le projet dans Xcode
- sélectionner l'iPhone comme cible de build

Une fois connecté, Xcode détecte l'appareil et permet de lancer l'application directement dessus.

::: warning **💡 L'importance de tester sur des appareils réels**
Certaines erreurs n'apparaissent que sur un vrai appareil (performances, capteurs, UI).
:::

## 🐞 3.6.6 Debug et inspection de l'application
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

Pour utiliser Chrome Remote Debugging sur un appareil ou un émulateur actif Android:
1. Ouvrez Chrome et allez sur votre navigateur sur `chrome://inspect/#devices`
2. Vous devriez voir votre appareil ou émulateur listé.
3. Cliquez sur "Inspect" pour ouvrir les DevTools et déboguer l'application Ionic. Vous bénéficierez de la console, des outils de réseau, et plus encore.

## 🔍 3.6.7 Tester les APIs natives dans de vraies conditions
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

## ⚠️ 3.6.8 Erreurs courantes et pièges classiques
Voici quelques erreurs très fréquentes chez les débutants :
- oublier de lancer `ionic cap sync` après une modification ;
- tester une API native uniquement dans le navigateur ;
- oublier de déclarer une permission Android ;
- application fonctionnelle sur web mais pas sur mobile ;
- confondre problème Ionic et problème Capacitor.

::: tip **🤔 En cas de doute...**
...tester sur appareil réel !
:::

## 🏁 3.6.9 Bonnes pratique de test mobile
- tester sur mobile **le plus tôt possible** dans le cycle de développement ;
- ne pas attendre la fin du projet
- valider régulièrement les fonctionnalités critiques ;
- considérer le navigateur comme un **outil de développement**, pas comme un environnement de test final ;

## 🧪 3.6.10 Activité pratique - Comparer les environnements
**🎯 Objectif : observer les différences concrètes.**

À réaliser :
1. Lancer l'application dans le navigateur.
2. Lancer la même application dans un émulateur Android
3. Si possible, la lancer sur un appareil réel.
4. Tester :
   - navigation, 
   - performances, 
   - APIs natives.

> 💡 Notez les différences observées et les éventuels problèmes rencontrés dans chaque environnement.

## 🔗 3.6.10 Ressources et documentation

* [Ionic – Running Your App](https://ionicframework.com/docs/developing/running)
* [Capacitor – Android Guide](https://capacitorjs.com/docs/android)
* [Android Studio](https://developer.android.com/studio)
* [Chrome DevTools – Remote Debugging](https://developer.chrome.com/docs/devtools/remote-debugging)
