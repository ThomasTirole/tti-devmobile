# Chapitre 7 : API Capacitor Motion - Detection de mouvement

Le plugin `@capacitor/motion` donne accès aux capteurs de mouvement (accéléromètre, gyroscope). Nous l'utilisons pour détecter quand l'utilisateur "swingue" le telephone comme un sabre.

Créez le fichier `src/composables/useMotionDetector.ts` :

```ts
import { ref } from 'vue';
import { Motion } from '@capacitor/motion';

// Seuil de detection : delta de magnitude en m/s² entre deux lectures
// Une valeur plus basse = plus sensible, plus haute = moins sensible
const SWING_THRESHOLD = 8;

// Cooldown entre deux detections pour eviter les rafales
const COOLDOWN_MS = 300;

/**
 * Composable de detection de swing.
 * @param onSwing - Callback appele quand un swing est detecte.
 *                  Recoit l'intensite du mouvement (delta normalise entre 0 et 1).
 */
export function useMotionDetector(onSwing: (intensity: number) => void) {
  // Etat reactif : est-ce qu'on ecoute l'accelerometre ?
  const listening = ref(false);

  // Variables internes pour l'algorithme de detection
  let lastMag = 0;        // Derniere magnitude mesuree
  let lastSwingTime = 0;  // Timestamp du dernier swing detecte
  let listenerHandle: Awaited<ReturnType<typeof Motion.addListener>> | null = null;

  /**
   * Demande la permission d'acces au capteur de mouvement.
   * Sur iOS 13+, le navigateur exige une demande explicite via
   * DeviceMotionEvent.requestPermission(). Sur Android et desktop,
   * la permission est accordee automatiquement.
   */
  async function requestPermission(): Promise<boolean> {
    if (
      typeof (DeviceMotionEvent as any).requestPermission === 'function'
    ) {
      try {
        const result = await (DeviceMotionEvent as any).requestPermission();
        return result === 'granted';
      } catch {
        return false;
      }
    }
    // Android et desktop : permission implicite
    return true;
  }

  /**
   * Demarre l'ecoute de l'accelerometre.
   *
   * Algorithme de detection :
   * 1. A chaque lecture, on calcule la magnitude du vecteur acceleration
   *    (norme euclidienne de x, y, z)
   * 2. On calcule le delta (difference) avec la magnitude precedente
   * 3. Si le delta depasse le seuil ET que le cooldown est ecoule,
   *    on considere que c'est un swing
   *
   * On utilise accelerationIncludingGravity car c'est la valeur la plus
   * universellement disponible sur tous les appareils.
   */
  async function start() {
    if (listening.value) return;

    const granted = await requestPermission();
    if (!granted) return;

    // Reset des variables
    lastMag = 0;
    lastSwingTime = 0;

    // Ecoute de l'evenement 'accel' du plugin Motion
    listenerHandle = await Motion.addListener('accel', (event) => {
      const a = event.accelerationIncludingGravity;
      if (!a) return;

      // Magnitude = racine carree de (x² + y² + z²)
      const mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

      // Delta entre la magnitude actuelle et la precedente
      const delta = Math.abs(mag - lastMag);
      lastMag = mag;

      const now = Date.now();
      // Detection : delta > seuil ET cooldown respecte
      if (delta > SWING_THRESHOLD && now - lastSwingTime > COOLDOWN_MS) {
        lastSwingTime = now;
        // Intensite normalisee entre 0 et 1 (8 = leger, 30+ = tres fort)
        const intensity = Math.min((delta - SWING_THRESHOLD) / 22, 1);
        onSwing(intensity); // Appel du callback avec l'intensite
      }
    });

    listening.value = true;
  }

  /**
   * Arrete l'ecoute de l'accelerometre et libere le listener.
   */
  async function stop() {
    if (listenerHandle) {
      await listenerHandle.remove();
      listenerHandle = null;
    }
    listening.value = false;
  }

  return { listening, start, stop };
}
```

**Points importants :**

- **Le pattern Capacitor Listener** : `Motion.addListener()` retourne un handle qu'il faut conserver pour pouvoir appeler `.remove()` plus tard. C'est un pattern commun a tous les plugins Capacitor bases sur des événements.
- **La permission iOS** : depuis iOS 13, Apple exige que l'accès aux capteurs de mouvement soit demande explicitement. C'est pourquoi on appelle `DeviceMotionEvent.requestPermission()` si cette methode existe.
- **L'algorithme de detection** est volontairement simple (delta de magnitude). Un algorithme plus avance pourrait analyser les axes individuellement ou utiliser le gyroscope.
- **Le cooldown** empêche de détecter plusieurs swings en rafale quand l'utilisateur secoue le telephone.
