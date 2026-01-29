# ⚡ 3.4 Utiliser les API natives avec Capacitor

<iframe src="https://slides.com/tirtho/3-4-utiliser-les-api-natives-avec-capacitor/embed" width="576" height="420" title="⚡ 3.4 Utiliser les API natives avec Capacitor" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Ionic est un framework web. Mais grâce à **Capacitor**, vous pouvez accéder à des fonctionnalités **100% natives** : appareil photo, stockage, fichiers, réseau, partage, vibrations, etc.

Capacitor agit comme un **pont** entre votre code Javascript/Vue et les API d'Android / iOS.
Dans ce chapitre, vous apprendrez à utiliser les plugins natifs les plus utiles pour vos projets.

::: warning **🚨 Important 🚨**
Les plugins Capacitor que nous allons voir ici ne sont qu'une sélection parmi les nombreux disponibles. De plus, une sélection de plugins "Community", créés et maintenus par la communauté, est également disponible.

Il est important de noter que certains plugins natifs peuvent nécessiter des configurations supplémentaires dans les projets Android/iOS. Assurez-vous de consulter la documentation officielle de Capacitor pour chaque plugin que vous utilisez afin de garantir une intégration correcte.
Pour plus d'informations : [Documentation officielle des plugins Capacitor](https://capacitorjs.com/docs/plugins)
:::

## 📘 3.4.1 Qu'est-ce que Capacitor ?
Capacitor est la couche qui permet à une applicaiton Ionic :
- d'être affichée dans une WebView native (Android/iOS) ;
- mais aussi d'accéder aux fonctionnalités natives,
- de générer des projets Android/iOS automaiquement,
- d'utiliser des plugins écrits en Swift (iOS) et Kotlin/Java (Android).
- tout en restant 100% **en JavaScript/TypeScript** côté développeur.

_Son rôle est simple :_
![capacitor-ionic.png](/3.4/capacitor-ionic.png)

### Capacitor vs Cordova

Capacitor est le successeur moderne de Cordova :

| Feature         | Cordova                          | Capacitor                      |
|-----------------|----------------------------------|--------------------------------|
| Architecture    | Ancienne                         | Moderne                        |
| Plugins         | Très nombreux mais vieillissants | Plugins officiels + support TS |
| Intégration web | Moyenne                          | Excellente                     |
| Maintenance     | Faible                           | Très active                    |
| Web-first       | ❌                                | ✔️                             |

> **👉 Capacitor est l'outil recommandé aujourd'hui pour toutes les apps Ionic.**

Pour ajouter Capacitor à l'initialisation d'un projet Ionic :
```bash
ionic start my-app blank --type=vue --capacitor
```
> le --capacitor flag ajoute Capacitor dès le départ.

## 🗃️ 3.4.2 Structure d'un projet avec Capacitor
Une fois votre projet créé, vous retrouverez :
```
my-app/
├─ android/           # Projet Android natif (Kotlin/Java)
├─ ios/               # Projet iOS natif (Swift)
├─ src/               # Votre app Vue/Ionic
├─ capacitor.config.ts # Config Capacitor
└─ package.json
```

Les commandes importantes :
```
ionic cap sync
ionic cap open android
ionic cap open ios
ionic cap run android --livereload
```

Pour ajouter une API native, il faut souvent installer un plugin :
```bash
npm install @capacitor/nom-du-plugin
```
> Par exemple `npm install @capacitor/camera` pour la caméra. &rarr; vérifiez toujours la doc officielle.

### Cycle typique de développement mobile
1. Vous modifiez votre code Ionic-Vue
2. Vous faites :
```
ionic build
ionic cap sync
```
> `ionic build` génère les fichiers web dans `www/`  
> `ionic cap sync` copie ces fichiers dans les projets natifs Android/iOS
3. Vous ouvrez le projet natif :
```
ionic cap open android
```
> `ionic cap open android` : ouvre Android Studio  
> `ionic cap open ios` : ouvre Xcode
4. Vous lancez l'app sur un émulateur ou un téléphone réel.
> 📝 Vous pouvez très bien travailler 90% du temps avec `ionic serve`, puis passer au natif pour tester les APIs.

## 📷 3.4.3 API native : Camera
L'API Camera permet de :
- prendre une photo,
- choisir une photo dans la galerie,
- récupérer l'image en URI, base64 ou fichier temporaire.

::: details **📷 Exemple complet :**
```html [Template.vue]
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Caméra</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" @click="takePhoto">Prendre une photo</ion-button>

      <img v-if="photo" :src="photo" class="preview" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { ref } from 'vue'

const photo = ref<string | null>(null)

async function takePhoto() {
  const img = await Camera.getPhoto({
    quality: 70,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera
  })

  photo.value = img.webPath ?? null
}
</script>

<style>
.preview {
  width: 100%;
  margin-top: 16px;
  border-radius: 12px;
}
</style>
```

### ⚠️ Permissions Android / iOS
Android ajoute automatiquement les permissions dans le manifest.
Sous iOS, il faut ajouter des descriptions dans `Info.plist` :
```objective-c
NSCameraUsageDescription     # Description pour l'accès à la caméra
NSPhotoLibraryUsageDescription # Description pour l'accès à la galerie
```

> Capacitor vous indiquera exactement ce qu'il faut ajouter.
:::

## 📂 3.4.4 API native : Filesystem
Cette API permet d'écrire et lire des fichiers localement.

::: details **📂 Exemple complet :**
### 📝 Écrire un fichier
```typescript [script.ts]
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

await Filesystem.writeFile({
  path: 'note.txt',
  data: 'Hello world!',
  directory: Directory.Documents,
  encoding: Encoding.UTF8
})
```

### 📖 Lire un fichier
```typescript [script.ts]
const result = await Filesystem.readFile({
  path: 'note.txt',
  directory: Directory.Documents
})

console.log(result.data)
```
:::

### 🌐 Différence navigateur / natif
Dans un navigateur :
- Filesystem fonctionne dans un espace sandboxé,
- pas d'accès réel au système de fichiers de l'OS.
Sur mobile :
- accès réel aux fichiers (Documents, Data, Cache, etc.),

## 🔑 3.4.5 API native : Preferences
Stockage simple clé &rarr; valeur, parfait pour :
- un thème utilisateur,
- des paramètres,
- un token
- un flag ("déjà vu le tutoriel").

::: details **🔑 Exemple complet :**
```typescript [script.ts]
import { Preferences } from '@capacitor/preferences'

// sauvegarde
await Preferences.set({
key: 'theme',
value: 'dark'
})

// lecture
const res = await Preferences.get({ key: 'theme' })

console.log(res.value)
```

> D'un point de vue fonctionnel, Preferences est similaire à `localStorage`, mais avec une API asynchrone et un stockage natif.
:::

## 🌐 3.4.6 API native : Network (important)
Permet de :
- vérifier si l'utilisateur est en ligne,
- recevoir des évènements quand la connexion change.

::: details **🌐 Exemple complet :**
### 📤 Récupérer l'état du réseau
```typescript [script.ts]
import { Network } from '@capacitor/network'

const status = await Network.getStatus()

console.log('Connected ?', status.connected)
```

### 👂 Écouter les changements
```typescript [script.ts]
Network.addListener('networkStatusChange', status => {
  console.log('Network status:', status.connected)
})
```

> 🔗 Très utile combiné avec la logique offline &harr; online des chapitre [2.4](../concevoir-concept-solution/persistance-scenarios-offline) et [2.6.8](../concevoir-concept-solution/persistance-cloud-baas.html#🔄%EF%B8%8F-2-6-8-synchronisation-cloud-harr-local)
:::

## 📳 3.4.7 API native : Haptics (vibrations)
Idéal pour un feedback tactile discret.
::: details **📳 Exemple complet :**
```typescript [script.ts]
import { Haptics, ImpactStyle } from '@capacitor/haptics'

await Haptics.impact({ style: ImpactStyle.Medium })
```

Autres actions disponibles :
- `Haptics.vibrate({ duration })` : vibre pendant une durée définie.
- `Haptics.selectionStart()` : démarre une vibration de sélection. C'est à dire une vibration courte qui indique le début d'une interaction (ex : début du glissement d'un slider).
- `Haptics.selectionChanged()` : indique un changement de sélection (ex : changement de valeur d'un slider).
:::

## 📨 3.4.8 API native : Share API (partage)
Permet de partager du contenu via les options natives Android/iOS.
::: details **📨 Exemple complet :**
```typescript [script.ts]
import { Share } from '@capacitor/share'

await Share.share({
  title: 'Ma note',
  text: 'Voici une note importante.',
  url: 'https://example.com'
})
```
:::

## 🆚 3.4.9 Différencier web vs mobile
Certaines API **ne fonctionnent pas dans le navigateur**.
Il faut donc parfois détecter la plateforme.

::: details **🆚 Exemple complet :**
### 🔍 Détection simple
```typescript [script.ts]
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

console.log(isNative) // true = Android/iOS, false = Web
```
> Pour plus de précision, vous pouvez aussi utiliser :
```typescript [script.ts]
const platform = Capacitor.getPlatform()
console.log(platform) // 'ios', 'android', 'web', 'electron'
```

### 🪂 Exemple fallback caméra
```typescript [script.ts]
if (!Capacitor.isNativePlatform()) {
  // fallback navigateur :
  document.querySelector('#fileInput')?.click()
  return
}

await Camera.getPhoto(...)
```

La fonction `isPluginAvailable` permet aussi de vérifier si un plugin est disponible sur la plateforme actuelle :
```typescript [script.ts]
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // Have the user upload a file instead
} else {
  // Otherwise, make the call:
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```
:::

## 🧪 3.4.10 Activité - "Mini Kit Natif"
**🎯 Objectif :** créer une page permettant de tester plusieurs APIs natives.

Dans une nouvelle page :

### Ajouter 4 boutons :
- **Prendre une photo** &rarr; afficher la photo
- **Vibrer (Haptics)**
- **Tester la connexion** &rarr; afficher un toast "En ligne" / "Hors ligne"
- **Sauvegarder un paramètre utilisateur** (Preferences)

### Exemple d'interface :
```html [Template.vue]
<ion-button expand="block" @click="takePhoto">Caméra</ion-button>
<ion-button expand="block" @click="vibrate">Haptique</ion-button>
<ion-button expand="block" @click="checkNetwork">Réseau</ion-button>
<ion-button expand="block" @click="savePref">Préférences</ion-button>
```
Vous devez :
- intégrer chaque API,
- afficher les résultats dans l'UI,
- tester dans un émulateur ou sur un appareil physique.
::: tip 😉
**Si vous voulez tester d'autres APIs natives ou en rajouter, n'hésitez pas, on est là pour tester.**
:::

::: details **Votre téléphone ne vous permet pas de faire l'exercice ?**
### 💻 Variante Web (si vous ne pouvez pas déployer sur téléphone)

Si vous ne pouvez **pas installer l’application sur un appareil physique** (par exemple iPhone sans Mac), vous devez adapter l’activité pour qu’elle fonctionne **entièrement dans le navigateur** avec `ionic serve`.

Adaptez alors les 4 actions comme suit :
- **Prendre une photo**
  - Si la plateforme **n’est pas native** (`Capacitor.isNativePlatform() === false`), au lieu d’appeler `Camera.getPhoto`, vous ouvrez un champ `<input type="file">` caché pour permettre à l’utilisateur de choisir une image depuis son ordinateur ou son téléphone.
- **Vibrer (Haptics)**
  - Si `Haptics` n’est pas disponible, affichez par exemple un **toast** ou un **message visuel** (“Vibration simulée”) à la place.
- **Tester la connexion (Network)**
  - Cette API fonctionne aussi en Web : testez `Network.getStatus()` puis coupez/rallumez le Wi-Fi pour observer le changement.
- **Sauvegarder un paramètre (Preferences)**
  - Cette API fonctionne également en Web : vérifiez que la valeur est bien lue même après un rafraîchissement de la page.
:::

> 👉 **Objectif supplémentaire :** votre page doit fonctionner **sans erreur** à la fois :
> - en mode **Web** (`ionic serve`),
> - et en mode **natif** (Android / iOS), en utilisant `Capacitor.isNativePlatform()` et/ou `Capacitor.isPluginAvailable()` pour gérer les cas où un plugin n’est pas disponible.

::: details **✅ Exemple de solution complète**
```html [src/views/NativeKitPage.vue]
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Mini Kit Natif</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <!-- Caméra / Import d'image -->
            <ion-list>
                <ion-item>
                    <ion-label>Caméra / Import d'image</ion-label>
                </ion-item>
            </ion-list>

            <ion-button expand="block" @click="takePhoto">
                Caméra / Import d'image
            </ion-button>

            <!-- Input fichier pour le fallback Web -->
            <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden-input"
                    @change="onFileChange"
            />

            <img v-if="photo" :src="photo" class="preview" />

            <!-- Haptique -->
            <ion-list>
                <ion-item>
                    <ion-label>Haptique (vibration)</ion-label>
                </ion-item>
            </ion-list>

            <ion-button expand="block" @click="vibrate">
                Vibrer (ou feedback visuel en Web)
            </ion-button>

            <!-- Réseau -->
            <ion-list>
                <ion-item>
                    <ion-label>Statut réseau</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p>En ligne : {{ isOnlineText }}</p>
                        <p>Dernier statut : {{ networkStatus }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-button expand="block" @click="checkNetwork">
                Tester la connexion
            </ion-button>

            <!-- Préférences -->
            <ion-list>
                <ion-item>
                    <ion-label>Préférences</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p>Valeur stockée : {{ prefValue ?? 'Aucune valeur' }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>

            <ion-button expand="block" @click="savePref">
                Sauvegarder et relire une préférence
            </ion-button>

            <!-- Dernière action -->
            <ion-list>
                <ion-item>
                    <ion-label>
                        <p>Dernière action : {{ lastAction }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>

            <!-- Toast pour le statut réseau -->
            <ion-toast
                    :is-open="showToast"
                    :message="toastMessage"
                    :duration="1500"
                    position="bottom"
                    @didDismiss="showToast = false"
            />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">

    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButton,
        IonItem,
        IonLabel,
        IonList,
        IonToast
    } from '@ionic/vue'

    import { Capacitor } from '@capacitor/core'
    import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
    import { Haptics, ImpactStyle } from '@capacitor/haptics'
    import { Network } from '@capacitor/network'
    import { Preferences } from '@capacitor/preferences'

    const photo = ref<string | null>(null)
    const fileInput = ref<HTMLInputElement | null>(null)
    const networkStatus = ref<string>('Inconnu')
    const isOnline = ref<boolean | null>(null)
    const prefValue = ref<string | null>(null)
    const lastAction = ref<string>('Aucune action pour le moment')

    // Toast
    const showToast = ref(false)
    const toastMessage = ref('')

    // Texte lisible pour l'état en ligne / hors ligne
    const isOnlineText = computed(() => {
        if (isOnline.value === null) return 'Inconnu'
        return isOnline.value ? 'Oui' : 'Non'
    })

    // 📷 Caméra : natif ➜ Camera, Web ➜ input file
    async function takePhoto() {
        const isNative = Capacitor.isNativePlatform()
        const hasCamera = Capacitor.isPluginAvailable('Camera')

        // 🌐 Fallback Web : input type="file"
        if (!isNative || !hasCamera) {
            fileInput.value?.click()
            return
        }

        try {
            const img = await Camera.getPhoto({
                quality: 70,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera
            })
            photo.value = img.webPath ?? null
            lastAction.value = 'Photo capturée depuis la caméra.'
        } catch (error) {
            console.error(error)
            lastAction.value = 'Erreur lors de la prise de photo.'
        }
    }

    // 🌐 Récupération du fichier choisi en Web
    function onFileChange(event: Event) {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]
        if (!file) return

        photo.value = URL.createObjectURL(file)
        lastAction.value = 'Photo chargée depuis un fichier (fallback Web).'
    }

    // 📳 Haptique : natif ➜ vibration, Web ➜ message
    async function vibrate() {
        const hasHaptics = Capacitor.isPluginAvailable('Haptics')

        if (!hasHaptics) {
            // Fallback simple pour le Web
            alert('Vibration simulée (Haptics non disponible sur cette plateforme).')
            lastAction.value = 'Vibration simulée (Web).'
            return
        }

        try {
            await Haptics.impact({ style: ImpactStyle.Medium })
            lastAction.value = 'Vibration effectuée.'
        } catch (error) {
            console.error(error)
            lastAction.value = 'Erreur lors de l’utilisation du Haptics.'
        }
    }


    // 🌐🔌 Network : fonctionne Web + natif
    async function checkNetwork() {
        try {
            const status = await Network.getStatus()
            isOnline.value = status.connected
            networkStatus.value = status.connected
                    ? 'En ligne (vérification manuelle)'
                    : 'Hors ligne (vérification manuelle)'
            toastMessage.value = status.connected
                    ? '✅ Vous êtes en ligne'
                    : '⚠️ Vous êtes hors ligne'
            showToast.value = true
            lastAction.value = 'Statut réseau mis à jour.'
        } catch (error) {
            console.error(error)
            lastAction.value = 'Erreur lors de la récupération du statut réseau.'
        }
    }

    // Écouter les changements réseau (toast automatique)
    let networkListener: { remove: () => Promise<void> } | null = null
    onMounted(async () => {
        try {
            networkListener = await Network.addListener('networkStatusChange', status => {
                isOnline.value = status.connected
                networkStatus.value = status.connected
                        ? 'En ligne (événement réseau)'
                        : 'Hors ligne (événement réseau)'
                toastMessage.value = status.connected
                        ? '✅ Connexion restaurée'
                        : '⚠️ Connexion perdue'
                showToast.value = true
            })
        } catch (error) {
            console.error('Erreur lors de l’enregistrement du listener réseau', error)
        }
    })

    onUnmounted(async () => {
        if (networkListener) {
            await networkListener.remove()
            networkListener = null
        }
    })

    // 🔑 Preferences : fonctionne Web + natif
    async function savePref() {
        try {
            await Preferences.set({
                key: 'demo-pref',
                value: 'hello-from-capacitor'
            })

            const res = await Preferences.get({ key: 'demo-pref' })
            prefValue.value = res.value ?? null
            lastAction.value = 'Préférence sauvegardée et relue.'
        } catch (error) {
            console.error(error)
            lastAction.value = 'Erreur lors de la sauvegarde/lecture des préférences.'
        }
    }
</script>

<style scoped>
    .preview {
        width: 100%;
        margin-top: 16px;
        border-radius: 12px;
        object-fit: cover;
    }

    .hidden-input {
        display: none;
    }
</style>
```
:::
