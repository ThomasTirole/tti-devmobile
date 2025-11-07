# Introduction à Ionic (Vue)

**Ionic** est un framework UI mobile cross-platform.  
Couplé à **Vue**, il permet de créer des apps iOS/Android/PWA avec une base web moderne.  
L’accès natif passe par **Capacitor**.

## Architecture

- Vue + Ionic UI : composants prêts à l’emploi (boutons, listes, onglets).
- Capacitor : pont vers les fonctionnalités natives (caméra, GPS, fichiers).
- Build : Web/PWA, puis Android/iOS via Android Studio/Xcode.

## Pourquoi Ionic + Vue ?

- Réutilise vos compétences HTML/CSS/JS/TS.
- Un seul code cible plusieurs plateformes.
- Écosystème riche : plugins Capacitor, composants, thèmes.

## Exemple minimal (Vue + Ionic)

``` vue
<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonHeader, IonTitle, IonContent, IonButton } from '@ionic/vue'

const count = ref(0)
const inc = () => count.value++
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonTitle>Bonjour Ionic</IonTitle>
    </IonHeader>
    <IonContent class="ion-padding">
      <p>Compteur : {{ count }}</p>
      <IonButton @click="inc">+1</IonButton>
    </IonContent>
  </IonPage>
</template>
```

::: tip À retenir
Ionic fournit l’UI et la navigation. Capacitor fournit l’accès natif. Vue structure l’application.
:::