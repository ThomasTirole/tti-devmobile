# Chapitre 6 — La page principale HomePage.vue

C'est le composant qui assemble tout : il consomme le composable, gere l'audio, et affiche l'interface.

## 6.1 Le template (HTML)

```vue
<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="false" class="oiia-content">
      <!-- iOS 13+ : permission capteurs requise via geste utilisateur -->
      <div v-if="needsPermission" class="prompt" @click="grantAndStart">
        <p>Appuie pour activer les capteurs de mouvement</p>
      </div>

      <!-- Chat principal -->
      <div class="center">
        <img
          v-if="CONFIG.USE_GIF && isSpinning"
          :src="CONFIG.SPIN_IMAGE"
          class="cat"
          alt="oiia cat"
        />
        <img
          v-else
          :src="CONFIG.STATIC_IMAGE"
          :class="['cat', { 'cat--spin': isSpinning && !CONFIG.USE_GIF }]"
          alt="oiia cat"
        />
      </div>

      <!-- Debug overlay (activer via CONFIG.DEBUG) -->
      <div v-if="CONFIG.DEBUG" class="debug">
        {{ rotationRate.toFixed(1) }}&deg;/s &middot;
        {{ isSpinning ? 'SPIN' : 'idle' }}
      </div>
    </ion-content>
  </ion-page>
</template>
```

Quelques points a noter :

- **`<ion-page>`** et **`<ion-content>`** — composants Ionic qui structurent une page mobile. `:fullscreen="true"` permet au contenu de
- derriere la barre de statut. `:scroll-y="false"` désactive le scroll.
- **`v-if="needsPermission"`** — sur iOS 13+, il faut un tap utilisateur pour activer les capteurs. Ce bloc s'affiche uniquement dans ce cas.
- **`v-if` / `v-else`** sur les images — si `USE_GIF` est actif et qu'on tourne, affiche le GIF. Sinon, affiche l'image statique avec une classe CSS conditionnelle pour la rotation.
- **`:class="['cat', { 'cat--spin': ... }]"`** — syntaxe Vue pour appliquer des classes dynamiquement. La classe `cat--spin` n'est ajoutée que quand la condition est vraie.

## 6.2 Le script (logique)

```vue
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import { useSpinDetector } from '@/composables/useSpinDetector';

/* ── Configuration ───────────────────────────────────────
   Modifier ces valeurs pour ajuster le comportement.
   ──────────────────────────────────────────────────────── */
const CONFIG = {
  ROTATION_THRESHOLD: 50,          // deg/s – augmenter si trop sensible
  START_DELAY:        150,         // ms avant activation du spin
  STOP_DELAY:         250,         // ms avant désactivation du spin
  USE_GIF:            true,        // true → GIF anime / false → rotation CSS
  DEBUG:              false,       // true → overlay avec données gyroscope
  STATIC_IMAGE:       '/cat_static.png',
  SPIN_IMAGE:         '/cat_spin.gif',
  AUDIO_FILE:         '/oiia.mp3',
};

// ── Capteur via composable Capacitor ──────────────────
const { isSpinning, rotationRate, start, stop } = useSpinDetector({
  threshold:  CONFIG.ROTATION_THRESHOLD,
  startDelay: CONFIG.START_DELAY,
  stopDelay:  CONFIG.STOP_DELAY,
});

// ── Audio ─────────────────────────────────────────────
let audio: HTMLAudioElement | null = null;

function initAudio() {
  audio = new Audio(CONFIG.AUDIO_FILE);  // charge le fichier audio
  audio.loop = true;                      // lecture en boucle
  audio.preload = 'auto';                 // pre-charge pour éviter le délai
}

// Quand isSpinning change → play / stop audio
watch(isSpinning, (spinning) => {
  if (!audio) return;
  if (spinning) {
    audio.play().catch(() => {});   // .catch pour gérer le cas ou l'autoplay
  } else {                          //   est bloqué par le navigateur
    audio.pause();
    audio.currentTime = 0;          // remet au debut pour le prochain play
  }
});

// ── Permission iOS 13+ ───────────────────────────────
const needsPermission = ref(false);

async function grantAndStart() {
  try {
    const DME = DeviceMotionEvent as any;
    if (typeof DME.requestPermission === 'function') {
      // iOS exige que cette ligne soit déclenchée par un geste utilisateur (tap)
      const res = await DME.requestPermission();
      if (res !== 'granted') return;
    }
    needsPermission.value = false;
    await start();
  } catch {
    /* refuse ou non supporte */
  }
}

// ── Lifecycle ─────────────────────────────────────────
onMounted(async () => {
  initAudio();

  const DME = DeviceMotionEvent as any;
  if (typeof DME.requestPermission === 'function') {
    // iOS 13+ → geste utilisateur obligatoire avant d'activer le capteur
    needsPermission.value = true;
  } else {
    // Android / web → démarrer directement le capteur Capacitor
    await start();
  }
});

onUnmounted(async () => {
  await stop();              // arrête le capteur proprement
  if (audio) {
    audio.pause();           // arrête le son
    audio = null;            // libère la reference
  }
});
</script>
```

## Explication de chaque bloc

**CONFIG** — toutes les valeurs ajustables de l'app sont regroupees ici. Si vous voulez changer le seuil de detection ou le chemin d'un asset, c'est l'unique endroit à modifier.

**`useSpinDetector`** — vous appelez votre composable en lui passant les options du CONFIG. En retour, vous obtenez les refs réactives et les fonctions de controle :

```ts
const { isSpinning, rotationRate, start, stop } = useSpinDetector({ ... });
```

**Audio avec `watch`** — au lieu de gérer l'audio dans le composable, vous utilisez un `watch` Vue sur `isSpinning`. Quand la valeur change :
- `true` → `audio.play()` (démarre le son en boucle)
- `false` → `audio.pause()` + `audio.currentTime = 0` (arrêt net et retour au debut)

Le `.catch(() => {})` sur `play()` est important : sur certains navigateurs, `play()` peut être rejeté si aucune interaction utilisateur n'a eu lieu. On ignore cette erreur silencieusement.

**Lifecycle** (`onMounted` / `onUnmounted`) — ce sont les hooks de cycle de vie Vue 3 :
- `onMounted` s'exécute quand le composant est affiché. Vous initialisez l'audio et démarrez le capteur.
- `onUnmounted` s'exécute quand le composant est détruit. Vous nettoyez tout (capteur + audio).

> **Bonne pratique** : toujours nettoyer vos listeners et ressources dans `onUnmounted`. Sinon, le capteur continue de tourner en arrière-plan et draine la batterie.

## 6.3 Le style (CSS)

```css
/* Fond noir sur tout l'écran */
.oiia-content {
  --background: #000;
}

/* Conteneur centre horizontalement et verticalement */
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Image du chat : taille responsive, jamais deformee */
.cat {
  max-width: 80vw;       /* max 80% de la largeur de l'écran */
  max-height: 80vh;      /* max 80% de la hauteur de l'écran */
  object-fit: contain;   /* garde les proportions de l'image */
  will-change: transform; /* optimisation GPU pour l'animation */
}

/* Animation de rotation CSS (mode non-GIF) */
.cat--spin {
  animation: spin 0.4s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

Points importants :

- **`--background: #000`** — c'est une variable CSS Ionic. Elle controle le fond du composant `<ion-content>`.
- **`will-change: transform`** — indique au navigateur que cet element va être animé. Le navigateur le place sur un layer GPU sépare, ce qui rend l'animation plus fluide.
- **`animation: spin 0.4s linear infinite`** — une rotation complete en 0.4 secondes, vitesse constante, en boucle infinie. Vous pouvez ajuster la durée (ex: `0.2s` pour plus rapide, `1s` pour plus lent).
