# Chapitre 8 : Integration finale dans HomePage

Maintenant que les trois composables sont crees, remplacez le bloc `<script setup>` de `HomePage.vue` par la version complete :

```vue
<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

// Import des trois composables
import { useLightsaberSound } from '@/composables/useLightsaberSound';
import { useMotionDetector } from '@/composables/useMotionDetector';
import { useHapticFeedback } from '@/composables/useHapticFeedback';

// ---- Etat reactif ----

const colors = [
  { name: 'blue', value: '#4488ff' },
  { name: 'green', value: '#44ff44' },
  { name: 'red', value: '#ff2222' },
  { name: 'purple', value: '#bb44ff' },
  { name: 'yellow', value: '#ffdd00' },
];

const isOn = ref(false);
const selectedColor = ref(colors[0].value);
const activeColor = computed(() => selectedColor.value);

// ---- Initialisation des composables ----

// Sons
const { startHum, stopHum, playIgnite, playRetract, playSwing } =
  useLightsaberSound();

// Vibrations
const { vibrateIgnite, vibrateSwing, vibrateRetract } =
  useHapticFeedback();

// Callback appele quand un swing est detecte par l'accelerometre
function onSwingDetected(intensity: number) {
  if (!isOn.value) return; // Securite : pas de swing si le sabre est eteint
  playSwing(intensity);
  vibrateSwing();
}

// Detection de mouvement (on lui passe le callback)
const { start: startMotion, stop: stopMotion } =
  useMotionDetector(onSwingDetected);

// ---- Toggle ON/OFF ----

async function toggle() {
  if (isOn.value) {
    // --- Extinction ---
    isOn.value = false;
    playRetract();       // Son d'extinction
    vibrateRetract();    // Vibration
    stopHum();           // Arret du bourdonnement
    await stopMotion();  // Arret de l'accelerometre
  } else {
    // --- Allumage ---
    isOn.value = true;
    playIgnite();        // Son d'allumage
    vibrateIgnite();     // Vibration
    // On demarre le hum apres 400ms (pour laisser le son d'allumage finir)
    setTimeout(() => {
      if (isOn.value) startHum();
    }, 400);
    await startMotion(); // Demarrage de l'accelerometre
  }
}

// ---- Configuration StatusBar (uniquement sur mobile natif) ----

if (Capacitor.isNativePlatform()) {
  import('@capacitor/status-bar').then(({ StatusBar, Style }) => {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: '#000000' });
  });
}

// ---- Nettoyage a la destruction du composant ----

onBeforeUnmount(async () => {
  stopHum();
  await stopMotion();
});
</script>
```

**Ce qui a change par rapport au Chapitre 4 :**

1. **Imports** : on importe les 3 composables + `Capacitor` + `onBeforeUnmount`.
2. **`toggle()`** : au lieu d'un simple `isOn.value = !isOn.value`, la fonction orchestre les sons, les vibrations et l'accéléromètre.
3. **`onSwingDetected()`** : callback branche sur le détecteur de mouvement, qui joue le son de swing et vibre.
4. **StatusBar** : on configure la barre de statut en mode sombre uniquement sur les plateformes natives (via `Capacitor.isNativePlatform()`). L'import dynamique évite de charger le module en web.
5. **`onBeforeUnmount()`** : nettoyage des ressources audio et accéléromètre quand le composant est détruit.
