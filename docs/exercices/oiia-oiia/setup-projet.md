# Chapitre 1 — Creation du projet

## 1.1 Générer le projet avec Ionic CLI

Ouvrez un terminal et lancez la commande suivante :

```bash
ionic start oiia-oiia blank --type=vue --capacitor
```

Cette commande génère un projet avec :

- **Vue 3** comme framework front-end
- **Ionic** comme librairie de composants UI mobiles
- **Capacitor** comme bridge vers les APIs natives du telephone
- Le template **blank** (une seule page vide)

## 1.2 Structure générée

Apres creation, votre projet ressemble à ceci :

```
oiia-oiia/
├── src/
│   ├── App.vue              ← composant racine
│   ├── main.ts              ← point d'entree de l'app
│   ├── router/
│   │   └── index.ts         ← configuration des routes
│   ├── theme/
│   │   └── variables.css    ← variables CSS Ionic
│   └── views/
│       └── HomePage.vue     ← la page qu'on va modifier
├── public/                  ← fichiers statiques (images, sons)
├── index.html               ← page HTML racine
├── capacitor.config.ts      ← configuration Capacitor
├── package.json
├── tsconfig.json
└── vite.config.ts           ← configuration du bundler Vite
```

## 1.3 Comprendre le flux de démarrage

Pour comprendre comment l'app démarre, suivez cette chaine :

**`index.html`** charge **`main.ts`** qui cree l'app Vue, branche le router et monte le tout dans la `<div id="app">`.

```
index.html  →  main.ts  →  App.vue  →  router  →  HomePage.vue
```

Le fichier `index.html` est la page HTML qui contient le point de montage :

```html
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
```

Le fichier `main.ts` cree et configure l'application Vue :

```ts
// main.ts — point d'entree
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';

// Creation de l'app Vue avec les plugins Ionic et Router
const app = createApp(App)
  .use(IonicVue)    // integre les composants Ionic
  .use(router);     // active le système de navigation

// Monte l'app quand le router est pret
router.isReady().then(() => {
  app.mount('#app');
});
```

Le fichier `App.vue` est le composant racine — il contient le `<ion-router-outlet>` qui affiche la page active :

```vue
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
```

Le router (`src/router/index.ts`) définit une seule route qui pointe vers `HomePage.vue` :

```ts
// router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'        // la racine redirige vers /home
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage       // la seule page de l'app
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

> **À retenir** : dans cette app, vous ne travaillerez quasiment que dans `HomePage.vue` (la page) et dans un composable que vous allez créer. Le reste du projet est du "plumbing" qui ne change pas.
