# Chapitre 6 : API Capacitor Haptics - Retour haptique

Le plugin `@capacitor/haptics` permet de faire vibrer le telephone. C'est deja inclus dans le projet starter. Creez le fichier `src/composables/useHapticFeedback.ts` :

```ts
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export function useHapticFeedback() {
  /**
   * Vibration forte pour l'allumage du sabre.
   * ImpactStyle.Heavy = vibration courte et puissante.
   */
  async function vibrateIgnite() {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch {
      // Haptics n'est pas disponible dans le navigateur desktop
    }
  }

  /**
   * Vibration moyenne pour le swing.
   * ImpactStyle.Medium = vibration moderee.
   */
  async function vibrateSwing() {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch {
      // Pas disponible dans le navigateur
    }
  }

  /**
   * Vibration de type "notification warning" pour l'extinction.
   * Produit un pattern de vibration different (deux impulsions courtes).
   */
  async function vibrateRetract() {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch {
      // Pas disponible dans le navigateur
    }
  }

  return { vibrateIgnite, vibrateSwing, vibrateRetract };
}
```

**Points importants :**

- Les `try/catch` sont necessaires car Haptics lève une erreur quand il n'y a pas de moteur vibratoire (typiquement en développement dans le navigateur).
- Capacitor fournit trois styles d'impact (`Light`, `Medium`, `Heavy`) et trois types de notification (`Success`, `Warning`, `Error`). Chaque combinaison produit un pattern vibratoire different selon le système (iOS/Android).
- Ce composable ne fait rien de visible dans le navigateur. Vous verrez son effet uniquement sur un vrai téléphone.
