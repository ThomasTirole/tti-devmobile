# 6️⃣ Activer l'authentification email/password dans Supabase
L'objectif de cette étape est d'activer l'authentification par email/mot de passe dans Supabase afin de permettre aux utilisateurs de se créer un compte et de se connecter à l'application. Vous verrez comme Supabase facilite la gestion de l'authentification.

## 6️⃣.1️⃣ Accéder aux paramètres d'authentification
1. Connectez-vous à votre tableau de bord Supabase.
2. Sélectionnez le projet que vous avez créé pour l'application Clash Cards.
3. Dans le menu de gauche, cliquez sur `Authentication` puis sur `Sign in / Providers`.
4. Vous verrez une liste de fournisseurs d'authentification disponibles.
   - Vérifiez que l'option `Email` est activée. Si ce n'est pas le cas, activez-la en cliquant sur le bouton correspondant.

## 6️⃣.2️⃣ Créer un store Pinia pour l'authentification
Nous allons créer un store Pinia pour gérer l'état de l'authentification dans l'application.
Dans le dossier `src/stores`, créez un fichier `authStore.ts`.
```ts [src/stores/authStore.ts]
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import type { Session, User } from '@supabase/supabase-js'

/**
 * Store Auth = centralise l’état de connexion :
 * - session (tokens)
 * - user (infos du user)
 * - loading / error pour l’UX
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Session Supabase (contient access_token, refresh_token, etc.)
    session: null as Session | null,

    // User Supabase (id, email, metadata, etc.)
    user: null as User | null,

    // Pour afficher un spinner / désactiver boutons
    loading: false,

    // Pour afficher une erreur dans l’UI
    error: null as string | null
  }),

  getters: {
    /**
     * Getter pratique pour l’UI :
     * - true si user != null
     */
    isLoggedIn: (state) => !!state.user
  },

  actions: {
    /**
     * init() doit être appelé AU DÉMARRAGE de l’app.
     *
     * Rôle :
     * 1) récupérer une session existante (si déjà connecté)
     * 2) écouter les changements (login/logout)
     *
     * Pourquoi ?
     * - Quand l’utilisateur refresh la page, Supabase peut restaurer la session.
     * - On garde l’UI synchronisée automatiquement.
     */
    async init() {
      // 1) Récupère la session actuelle (si elle existe)
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        this.error = error.message
        return
      }

      // data.session peut être null si pas connecté
      this.session = data.session
      this.user = data.session?.user ?? null

      // 2) Écoute les changements d’état auth (login/logout/token refresh)
      // On n’a pas besoin de savoir quel event exact ici.
      supabase.auth.onAuthStateChange((_event, session) => {
        // Met à jour store → l’UI réagit automatiquement
        this.session = session
        this.user = session?.user ?? null
      })
    },

    /**
     * register() : crée un compte email/password
     * - Peut être suivi d’un login automatique selon settings Supabase
     */
    async register(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      } catch (e: any) {
        this.error = e?.message ?? 'Erreur register'
      } finally {
        this.loading = false
      }
    },

    /**
     * login() : connexion email/password
     * - Met à jour la session user si ok (via listener onAuthStateChange)
     */
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } catch (e: any) {
        this.error = e?.message ?? 'Erreur login'
      } finally {
        this.loading = false
      }
    },

    /**
     * logout() : déconnexion
     * - Supabase supprime la session
     * - le listener onAuthStateChange met user = null
     */
    async logout() {
      this.loading = true
      this.error = null

      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (e: any) {
        this.error = e?.message ?? 'Erreur logout'
      } finally {
        this.loading = false
      }
    }
  }
})
```

## 6️⃣.3️⃣ Initialiser le store au démarrage de l'application
Pour que le store d'authentification fonctionne correctement, nous devons l'initialiser au démarrage de l'application.
> Pourquoi ici ? Parce qu'on veut que l'app sache immédiatement si un user est déjà connecté.

Ouvrez le fichier `src/main.ts` et modifiez-le comme suit :
```ts [src/main.ts]
import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue} from '@ionic/vue';
import {createPinia} from 'pinia';
import { useAuthStore } from '@/stores/authStore // [!code ++]'

// ...

// 🔹 Création de l’app // [!code warning]
const app = createApp(App) // [!code warning]
    .use(IonicVue) // [!code warning]
// [!code warning]
// 🔹 IMPORTANT : on garde une référence à Pinia // [!code warning]
const pinia = createPinia() // [!code warning]
app.use(pinia) // [!code warning]
// [!code warning]
// 🔹 Router inchangé // [!code warning]
app.use(router) // [!code warning]
// [!code warning]
// 🔹 INITIALISATION AUTH (1 seule fois) // [!code warning]
const authStore = useAuthStore(pinia) // [!code warning]
authStore.init() // [!code warning]

// 🔹 Mount final inchangé
router.isReady().then(() => {
    app.mount('#app')
})
```
::: warning **⚠️ IMPORTANT**
Il a été nécessaire de garder une référence à l'instance Pinia pour pouvoir utiliser le store d'authentification avant le montage de l'application. En effet, avant, le store était utilisé après le `app.use(pinia)`, mais avant le `app.mount('#app')`. Donc, pour pouvoir appeler pinia pour instancier le store d'authentification, il faut initialiser Pinia avant.
:::

## 6️⃣.4️⃣ Page de login/register
Nous allons maintenant créer une page simple pour permettre aux utilisateurs de se connecter ou de s'inscrire.
Remplacez le contenu de `src/views/Tab3Page.vue` par le code suivant :
```html [src/views/Tab3Page.vue]
<template>
  <ion-page>
    <!-- Header Ionic -->
    <ion-header>
      <ion-toolbar>
        <ion-title>Auth</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- ✅ Si connecté : afficher user + bouton logout -->
      <div v-if="auth.isLoggedIn">
        <ion-card>
          <ion-card-header>
            <ion-card-title>✅ Connected</ion-card-title>

            <!-- Email du user connecté -->
            <ion-card-subtitle>{{ auth.user?.email }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <!-- Logout : désactivé pendant loading -->
            <ion-button
                expand="block"
                color="danger"
                @click="auth.logout()"
                :disabled="auth.loading"
            >
              Logout
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- ❌ Sinon : formulaire login/register -->
      <div v-else>
        <!-- Segment = switch entre Login et Register -->
        <ion-segment v-model="mode" class="ion-margin-bottom">
          <ion-segment-button value="login">
            <ion-label>Login</ion-label>
          </ion-segment-button>
          <ion-segment-button value="register">
            <ion-label>Register</ion-label>
          </ion-segment-button>
        </ion-segment>

        <ion-card>
          <ion-card-header>
            <ion-card-title>
              {{ mode === 'login' ? 'Login' : 'Create an account' }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <!-- Email -->
            <ion-item>
              <ion-input
                  label="Email"
                  label-placement="stacked"
                  type="email"
                  v-model="email"
                  autocomplete="email"
              />
            </ion-item>

            <!-- Password -->
            <ion-item>
              <ion-input
                  label="Password"
                  label-placement="stacked"
                  type="password"
                  v-model="password"
                  autocomplete="current-password"
              />
            </ion-item>

            <!-- Afficher erreur si le store en a une -->
            <ion-text color="danger" v-if="auth.error">
              <p>{{ auth.error }}</p>
            </ion-text>

            <!-- Bouton submit :
                 - désactivé si loading ou champs vides -->
            <ion-button
                expand="block"
                class="ion-margin-top"
                @click="submit"
                :disabled="auth.loading || !email || !password"
            >
              {{ mode === 'login' ? 'Login' : 'Register' }}
            </ion-button>

            <!-- Spinner si loading -->
            <ion-spinner v-if="auth.loading" class="ion-margin-top" />
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
/**
 * Page Auth :
 * - utilise authStore (Pinia)
 * - gère un mini état local : email, password, mode
 */
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonInput, IonButton, IonText, IonSpinner,
  IonSegment, IonSegmentButton, IonLabel
} from '@ionic/vue'

// Store Auth (session/user)
const auth = useAuthStore()

// mode = login ou register
const mode = ref<'login' | 'register'>('login')

// Champs du formulaire
const email = ref('')
const password = ref('')

/**
 * submit :
 * - si mode = login => auth.login(...)
 * - si mode = register => auth.register(...)
 */
async function submit() {
  if (mode.value === 'login') {
    await auth.login(email.value, password.value)
  } else {
    await auth.register(email.value, password.value)
  }
}
</script>

```

## 6️⃣.5️⃣ Tester l'authentification
1. Lancez l'application avec `ionic serve`.
2. Créez un compte sous `Register` sur votre app, puis confirmez votre email si nécessaire (selon les settings de votre projet Supabase).
3. Une fois confirmé, vous serez automatiquement redirigé sur votre app, et vous verrez que la page d'authentification affiche désormais que vous êtes connecté.
4. Testez la déconnexion en cliquant sur le bouton `Logout`.
5. Essayez de vous reconnecter avec le compte que vous venez de créer.
6. Vérifiez dans le tableau de bord Supabase, sous `Authentication` > `Users` que votre utilisateur apparaît bien dans la liste.

Voilà ! Vous avez maintenant une authentification email/mot de passe fonctionnelle dans votre application Ionic-Vue avec Supabase. Vous pouvez étendre cette fonctionnalité en ajoutant des profils utilisateur, des permissions, etc. selon les besoins de votre application.

## 6️⃣.6️⃣ Bonus - afficher l'email connecté dans Tab1
```html [src/views/Tab1Page.vue]
<script setup lang="ts">
/**
 * Composition API
 * - ref : pour des valeurs primitives (modalOpen, editing)
 * - reactive : pour l’objet form (plus pratique qu’un ref d’objet ici)
 */
import { reactive, ref, onMounted } from 'vue'
import { useCardsStore } from '@/stores/cardsStore'
import type { Card, CardInsert, Rarity, Role } from '@/types/Card'
import { useAuthStore } from '@/stores/authStore' // [!code ++]

const auth = useAuthStore() // [!code ++]

// ...
```
Puis dans le header, ajoutez le code suivant pour afficher l'email de l'utilisateur connecté :
```html [src/views/Tab1Page.vue]
<ion-buttons slot="end">
  <ion-badge v-if="auth.isLoggedIn">{{ auth.user?.email }}</ion-badge> <!-- [!code ++] -->
  <ion-button @click="openCreate()">+ Add</ion-button>
</ion-buttons>
```
