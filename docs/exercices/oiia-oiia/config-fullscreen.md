# Chapitre 3 — Configuration fullscreen et dark mode

L'app doit être fullscreen avec un fond noir. Cela se configure a **plusieurs niveaux** : HTML, CSS, Capacitor, et Android natif. Chaque couche a son role.

## 3.1 index.html — les meta tags

Ouvrez `index.html` et modifiez le titre et le color-scheme :

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>oiia oiia</title>

    <base href="/" />

    <!-- Indiquer au navigateur que l'app est en dark mode -->
    <meta name="color-scheme" content="dark" />

    <!-- Viewport mobile : plein écran, pas de zoom utilisateur -->
    <meta
      name="viewport"
      content="viewport-fit=cover, width=device-width, initial-scale=1.0,
               minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />

    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />

    <!-- Configuration iOS home screen -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="oiia oiia" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Points importants :

- **`color-scheme: dark`** — dit au navigateur d'utiliser le theme sombre pour les elements natifs (scrollbars, inputs, etc.).
- **`viewport-fit=cover`** — l'app couvre tout l'écran, y compris les zones de "safe area" (encoches, barres système).
- **`user-scalable=no`** — empêche le zoom au pinch (comportement app, pas site web).

## 3.2 main.ts — forcer le dark mode Ionic

Dans `main.ts`, le template génère importe par défaut `dark.system.css` qui suit la preference système de l'utilisateur. Vous voulez forcer le dark mode en permanence :

```ts
// AVANT (générée par défaut) :
// import '@ionic/vue/css/palettes/dark.system.css';

// APRES (dark mode force) :
import '@ionic/vue/css/palettes/dark.always.css';
```

Le fichier `main.ts` complet :

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';

/* CSS de base Ionic */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* CSS utilitaires optionnels */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Dark mode — toujours actif (fond noir) */
import '@ionic/vue/css/palettes/dark.always.css';

/* Variables du theme */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
```

## 3.3 App.vue — masquer la barre de statut

Pour un vrai fullscreen sur mobile, vous devez masquer la barre de statut (celle qui affiche l'heure, la batterie, etc.). Vous utilisez le plugin `@capacitor/status-bar` deja present dans le projet :

```vue
<!-- src/App.vue -->
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
// Plugins Capacitor pour le controle de la barre de statut
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

// Uniquement sur plateforme native (pas dans le navigateur desktop)
if (Capacitor.isNativePlatform()) {
  StatusBar.hide().catch(() => {});
  // Si jamais la barre réapparaît, elle sera sombre sur fond noir
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  StatusBar.setBackgroundColor({ color: '#000000' }).catch(() => {});
}
</script>
```

Points importants :

- **`Capacitor.isNativePlatform()`** — renvoie `true` seulement quand l'app tourne dans une WebView native (Android/iOS), pas dans un navigateur desktop. Cela évite des erreurs en développement.
- **`.catch(() => {})`** — les appels Capacitor sont asynchrones. On ignore silencieusement les erreurs (ex: la StatusBar n'existe pas en mode web).

## 3.4 capacitor.config.ts — couleur de fond Android

Ce fichier configure le comportement de Capacitor. Vous ajoutez la couleur de fond de la WebView Android pour éviter un flash blanc au démarrage :

```ts
// capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'oiia-oiia',
  webDir: 'dist',          // dossier contenant le build web (génère par Vite)
  android: {
    backgroundColor: '#000000',  // fond noir natif avant le chargement de la WebView
  },
};

export default config;
```

## 3.5 Android styles.xml — barres système noires

Le fichier `android/app/src/main/res/values/styles.xml` controle le theme natif Android. Vous ajoutez des couleurs noires pour la barre de navigation et la barre de statut :

```xml
<style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
    <item name="windowActionBar">false</item>
    <item name="windowNoTitle">true</item>
    <item name="android:background">@null</item>
    <!-- Barres système noires pour correspondre au fond de l'app -->
    <item name="android:navigationBarColor">@android:color/black</item>
    <item name="android:statusBarColor">@android:color/black</item>
</style>
```

> **Pourquoi autant de couches ?** Une app Capacitor est une app web dans une coquille native. Le HTML controle le web, Capacitor configure le bridge, et les fichiers Android configurent la coquille native. Chaque couche a sa responsabilité.
