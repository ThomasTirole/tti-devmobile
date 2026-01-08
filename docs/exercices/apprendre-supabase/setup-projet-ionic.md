# 1️⃣ Création du projet Ionic-Vue

## 1️⃣.1️⃣ Créer le projet
```bash
ionic start clash-cards tabs --type=vue --capacitor
❔ Create free Ionic account (y/N)? ➡️ N
...
cd clash-cards
ionic serve
```
> ✅ Vérifiez que l'app s'ouvre dans le navigateur avec les 3 onglets en bas.

## 1️⃣.2️⃣ Installer les dépendances Supabase

### Installer Pinia et Supabase
```bash
npm install pinia @supabase/supabase-js
```

### Activer Pinia
Ouvrez `src/main.ts` et ajoutez Pinia :
```ts [src/main.ts]
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue'; 
import { createPinia } from 'pinia'; // [!code ++]

// ...

const app = createApp(App)
    .use(IonicVue)
    .use(createPinia()) // [!code ++]
    .use(router);

router.isReady().then(() => {
    app.mount('#app');
});
```




