
# Chapitre 4 : La logique de base (script)

Ajoutez le bloc `<script setup>` entre le `</template>` et le `<style scoped>`. Pour l'instant, nous allons mettre uniquement la logique d'etat et le toggle visuel, **sans les composables** :

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';

// Les 5 couleurs de cristal kyber disponibles
const colors = [
  { name: 'blue', value: '#4488ff' },
  { name: 'green', value: '#44ff44' },
  { name: 'red', value: '#ff2222' },
  { name: 'purple', value: '#bb44ff' },
  { name: 'yellow', value: '#ffdd00' },
];

// Etat reactif : le sabre est-il allume ?
const isOn = ref(false);

// Couleur selectionnee (par defaut : bleu)
const selectedColor = ref(colors[0].value);

// Couleur active (computed pour la reactivite dans le template)
const activeColor = computed(() => selectedColor.value);

// Toggle ON/OFF basique (pour l'instant, juste l'animation visuelle)
function toggle() {
  isOn.value = !isOn.value;
}
</script>
```

**Testez maintenant** avec `npm run dev`. Vous devriez voir :

- Un fond noir avec la poignée du sabre et le bouton power.
- En cliquant sur le bouton, la lame s'étend/se rétracte avec une animation fluide.
- Les pastilles de couleur permettent de changer la couleur (visible au prochain allumage).
- Le bouton s'illumine quand le sabre est allumé.

L'interface est complete. Passons maintenant à la partie intéressante : **les sons et les APIs natives**.
