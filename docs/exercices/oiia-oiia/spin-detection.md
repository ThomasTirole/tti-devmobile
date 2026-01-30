# Chapitre 5 — Le composable useSpinDetector

C'est le coeur de l'application. Vous allez créer un **composable Vue** — une fonction réutilisable qui encapsule une logique reactive.

## 5.1 Qu'est-ce qu'un composable ?

En Vue 3, un composable est une fonction qui utilise la Composition API (`ref`, `computed`, `watch`, etc.) et retourne des données réactives. C'est le pattern recommande pour extraire et réutiliser de la logique entre composants.

```
src/composables/useSpinDetector.ts   ← votre composable
```

Créez le dossier `composables/` dans `src/`, puis le fichier.

## 5.2 Le code complet

```ts
// src/composables/useSpinDetector.ts

/**
 * useSpinDetector — composable Vue pour détecter la rotation de l'utilisateur.
 *
 * Utilise le plugin natif @capacitor/motion pour lire le gyroscope.
 * Expose un booleen reactif `isSpinning` avec hysteresis (debounce start/stop)
 * pour éviter le clignotement.
 */
import { ref, readonly } from 'vue';
import { Motion } from '@capacitor/motion';
import type { PluginListenerHandle } from '@capacitor/core';

// Interface TypeScript pour typer les options du composable
export interface SpinDetectorOptions {
  /** Seuil de rotation en deg/s (défaut : 50) */
  threshold?: number;
  /** délai avant activation du spin en ms (défaut : 150) */
  startDelay?: number;
  /** délai avant désactivation du spin en ms (défaut : 250) */
  stopDelay?: number;
}

export function useSpinDetector(options: SpinDetectorOptions = {}) {
  // Valeurs par défaut via l'operateur nullish coalescing (??)
  const threshold  = options.threshold  ?? 50;
  const startDelay = options.startDelay ?? 150;
  const stopDelay  = options.stopDelay  ?? 250;

  // ── état reactif (readonly pour le consommateur) ────
  const isSpinning   = ref(false);
  const rotationRate = ref(0);

  // ── Variables internes d'hysteresis ─────────────────
  let aboveSince: number | null = null;
  let belowSince: number | null = null;
  let handle: PluginListenerHandle | null = null;

  /**
   * démarre L'écoute du capteur de mouvement via Capacitor Motion.
   */
  async function start() {
    if (handle) return; // deja en ecoute

    handle = await Motion.addListener('accel', (event) => {
      const r = event.rotationRate;
      // Max absolu sur les 3 axes → robuste quelle que soit l'orientation
      const rate = Math.max(
        Math.abs(r.alpha),
        Math.abs(r.beta),
        Math.abs(r.gamma)
      );
      rotationRate.value = rate;

      const now = Date.now();

      if (rate > threshold) {
        // Au-dessus du seuil → reset le timer "below", armer le timer "above"
        belowSince = null;
        if (aboveSince === null) aboveSince = now;
        if (!isSpinning.value && now - aboveSince >= startDelay) {
          isSpinning.value = true;
        }
      } else {
        // En-dessous du seuil → reset le timer "above", armer le timer "below"
        aboveSince = null;
        if (belowSince === null) belowSince = now;
        if (isSpinning.value && now - belowSince >= stopDelay) {
          isSpinning.value = false;
        }
      }
    });
  }

  /** arrête L'écoute et remet tout a zero. */
  async function stop() {
    if (handle) {
      await handle.remove();
      handle = null;
    }
    aboveSince = null;
    belowSince = null;
    isSpinning.value = false;
    rotationRate.value = 0;
  }

  return {
    isSpinning:   readonly(isSpinning),
    rotationRate: readonly(rotationRate),
    start,
    stop,
  };
}
```

## 5.3 Explication détaillée de chaque partie

## Les imports

```ts
import { ref, readonly } from 'vue';
import { Motion } from '@capacitor/motion';
import type { PluginListenerHandle } from '@capacitor/core';
```

- **`ref`** — cree une variable reactive Vue. Quand sa valeur change, tous les composants qui l'utilisent se mettent à jour automatiquement.
- **`readonly`** — cree une version en lecture seule d'une ref. Le composable peut modifier `isSpinning` en interne, mais le composant qui le consomme ne peut que le lire. C'est un bon pattern d'encapsulation.
- **`Motion`** — le plugin Capacitor qui donne accès aux capteurs de mouvement.
- **`PluginListenerHandle`** — le type TypeScript du "handle" retourne par `addListener`. Ce handle sert à retirer le listener plus tard avec `.remove()`.

## L'écoute du capteur

```ts
handle = await Motion.addListener('accel', (event) => {
  const r = event.rotationRate;
  // ...
});
```

`Motion.addListener('accel', callback)` est le point central. C'est l'API Capacitor pour écouter les événements du capteur de mouvement. L'événement `'accel'` fournit :

- `event.acceleration` — acceleration linéaire (sans gravite)
- `event.accelerationIncludingGravity` — acceleration avec gravite
- **`event.rotationRate`** — vitesse de rotation angulaire, ce qui nous intéresse

Le `rotationRate` contient trois valeurs en **degrés par seconde** :

- `alpha` — rotation autour de l'axe Z (perpendiculaire a l'écran)
- `beta` — rotation autour de l'axe X (horizontal)
- `gamma` — rotation autour de l'axe Y (vertical du telephone)

On prend le **maximum absolu des trois axes** pour que la detection fonctionne quelle que soit la manière dont vous tenez le telephone :

```ts
const rate = Math.max(Math.abs(r.alpha), Math.abs(r.beta), Math.abs(r.gamma));
```

## L'hysteresis (debounce)

C'est la partie la plus subtile. Sans hysteresis, l'animation clignoterait à chaque fois que la rotation passe brièvement au-dessus puis en-dessous du seuil.

Le principe :

```
                    seuil (50 deg/s)
                    ─────────────────────────────
Rotation rate :     ╱╲    ╱╲  ╱────────╲
                   ╱  ╲  ╱  ╲╱          ╲
                  ╱    ╲╱    ╲            ╲
                 ╱                         ╲

Sans hysteresis : ON OFF ON OFF ON──────OFF  (clignotement)
Avec hysteresis : ────────────── ON──────OFF (stable)
```

L'implementation utilise deux timestamps :

- **`aboveSince`** — "depuis quand est-on au-dessus du seuil ?". Le spin ne s'active que si on reste au-dessus pendant `startDelay` ms (150ms).
- **`belowSince`** — "depuis quand est-on en-dessous du seuil ?". Le spin ne se désactive que si on reste en-dessous pendant `stopDelay` ms (250ms).

```ts
if (rate > threshold) {
  belowSince = null;                          // on n'est plus en-dessous
  if (aboveSince === null) aboveSince = now;   // debut du chrono "au-dessus"
  if (!isSpinning.value && now - aboveSince >= startDelay) {
    isSpinning.value = true;                   // assez longtemps → activer
  }
} else {
  aboveSince = null;                           // on n'est plus au-dessus
  if (belowSince === null) belowSince = now;   // debut du chrono "en-dessous"
  if (isSpinning.value && now - belowSince >= stopDelay) {
    isSpinning.value = false;                  // assez longtemps → désactiver
  }
}
```

## Le nettoyage

```ts
async function stop() {
  if (handle) {
    await handle.remove();   // retire le listener du capteur
    handle = null;
  }
  // Reset de l'état interne
  aboveSince = null;
  belowSince = null;
  isSpinning.value = false;
  rotationRate.value = 0;
}
```

Le pattern `handle.remove()` est commun à tous les plugins Capacitor. Il est essentiel d'appeler cette methode quand vous n'avez plus besoin du listener, sinon le capteur reste actif et consomme de la batterie.

## Le retour

```ts
return {
  isSpinning:   readonly(isSpinning),
  rotationRate: readonly(rotationRate),
  start,
  stop,
};
```

Le composable retourne :
- Deux **refs en lecture seule** — le composant peut les afficher et les `watch`, mais ne peut pas les modifier directement.
- Deux **fonctions** — `start()` et `stop()` pour controler le cycle de vie du capteur.
