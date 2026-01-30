# Chapitre 2 — Installation des dépendances

## 2.1 Le plugin Capacitor Motion

Pour acceder au gyroscope du telephone, vous allez utiliser le plugin officiel **`@capacitor/motion`**. Installez-le dans votre projet :

```bash
npm install @capacitor/motion
```

Ce plugin expose l'objet `Motion` qui vous permet d'écouter les événements du capteur de mouvement. Sous le capot, il wrappe l'API Web standard `DeviceMotionEvent` en suivant le pattern Capacitor (listener avec handle).

## 2.2 La plateforme Android

Pour pouvoir compiler l'app en APK Android, vous avez besoin du package Capacitor Android :

```bash
npm install @capacitor/android
```

Puis ajoutez la plateforme native au projet :

```bash
npx cap add android
```

Cette commande cree un dossier `android/` contenant un projet Android Studio complet. Ce dossier contient le code natif Java/Kotlin, les ressources Android (icônes, themes, splash screen) et la WebView qui exécute votre code Vue.

## 2.3 état du package.json

Apres ces installations, vos dépendances principales sont :

```json
{
  "dependencies": {
    "@capacitor/android": "^8.0.2",
    "@capacitor/core": "8.0.2",
    "@capacitor/motion": "^8.0.0",
    "@capacitor/status-bar": "8.0.0",
    "@ionic/vue": "^8.0.0",
    "@ionic/vue-router": "^8.0.0",
    "vue": "^3.3.0",
    "vue-router": "^4.2.0"
  }
}
```

> **Note pédagogique** : `@capacitor/core` est le coeur de Capacitor (toujours present). Chaque fonctionnalité native est un plugin séparé (`motion`, `status-bar`, `camera`, etc.). Vous installez uniquement ce dont vous avez besoin.
