# 📡 2.2 Fonctions et capteurs

## 🎯 Objectif d'apprentissage
À la fin de ce chapitre, vous serez capable de :
- Identifier les **principaux capteurs matériels** d'un appareil mobile.
- Expliquer comment ces capteurs sont utilisés dans les applications mobiles.
- Comprendre la **géolocalisation**, la **détection de mouvemment** et l'**accès audio/vidéo**.
- Connaître les bonnes pratiques pour gérer la **sécurité et la consommation d'énergie** liées aux capteurs.

## 🧭 2.2.1 Introduction : les sens du smarpthone
Les smartphones modernes sont de véritables **concentrés de capteurs**.
À l'image des sens humains, ils peuvent **voir**, **entendre**, **ressentir**, **se situer** et **interagir** avec leur environnement.
Ces capteurs permettent à l'appareil de **percevoir le monde réell* et d'enrichir les fonctionnalités des applications : navigation, sport, santé, jeux, photographie, domotique, etc.

::: details **💡Exemple concret :** {open}
Une application de course à pied combine plusieurs capteurs :
- le **GPS** pour mesurer la distance parcourue,
- l'**accéléromètre** pour détecter les mouvements,
- et le **gyroscope** pour connaître l'orientation du téléphone.
Grâce à  eux, l'app peut calculer la vitesse, afficher le parcours et suivre la performance du coureur.
:::

Les capteurs sont accessibles via les **API natives** (Android ou iOS), ou par des **frameworks** comme **Capacitor** ou **Flutter**, qui offrent des ponts entre le code et le matériel.

> **🎯 Objectif de ce chapitre :**
> 
> comprendre comment ces capteurs fonctionnent, dans quels contextes ils sont utilisés, et quelles précautions il faut prendre pour garantir la sécurité et la confidentialité des données.

## 📍 2.2.2 Géolocalisation
La **géolocalisation** est l'une des fonctionnalités les plus utilisées sur mobile.
Elle permet à l'appareil de **déterminer sa position** géographique en temps réel.

### 🔧 Comment ça marche ?
La localisation repose sur plusieurs sources :
- **GPS (Global Positioning System)** : satellites pour une précision de quelques mètres.
- **Triangulation réseau** : repérage via les antennes cellulaires.
- **Wi-Fi** et **Bluetooth** : localisation approximative en intérieur.
- **Capteurs de mouvement** : pour améliorer la précision du suivi.

La combinaison de ces technologies permet d'obtenir une position précise tout en économisant la batterie.

### 🙋‍♂️ Utilisations courantes
- Application de **navigation** : Google Maps, Waze.
- **Livraison** et **transport** : Uber, Deliveroo.
- **Sport** et **santé** : Strava, Nike Run Club.
- **Réseaux sociaux** : géolocalisation des publications/stories.
- **Météo** : affichage automatique des conditions locales.
::: danger
- AJOUTER UNE IMAGE POUR LA GEOLOCALISATION INSTAGRAM
:::

### 🧰 APIs et frameworks utilisés
| Plateforme            | API principale                | Exemple d’utilisation                                    |
| --------------------- | ----------------------------- | -------------------------------------------------------- |
| **Android**           | `FusedLocationProviderClient` | Fournit la position précise avec gestion de la batterie. |
| **iOS**               | `CoreLocation`                | Accès à la localisation et au suivi des déplacements.    |
| **Capacitor / Ionic** | `Geolocation`                 | Récupère la position GPS via un pont natif.              |
| **Flutter**           | `geolocator`                  | Plugin permettant d’obtenir la position actuelle.        |

### 👍 Bonnes pratiques
- Demander l'autorisation uniquement **au moment de l'usage**.
- Informer clairement l'utilisateur de la **finalité de la collecte**.
- Adapter la **précision GPS** au besoin réel pour réduire la consommation d'énergie.
- Désactiver la géolocalisation en arrière-plan quand elle n'est pas nécessaire.

> **💬 Exemple**
> 
> Une application de météo a besoin de la position une seule fois au lancement, tandis qu'une application de livraison doit la suivre en continu.

## 🔃 2.2.3 Capteurs de mouvement et orientation
Les capteurs de mouvement permettent au smartphone de **détecter son orientation et ses déplacements dans l'espace.**
Ils sont essentiels pour de nombreuses applications interactives et immersives.

### 📡 Les principaux capteurs
| Capteur           | Fonction                                                 | Exemple d’utilisation                        |
| ----------------- | -------------------------------------------------------- | -------------------------------------------- |
| **Accéléromètre** | Mesure les accélérations linéaires (chocs, inclinaisons) | Comptage de pas, rotation d’écran            |
| **Gyroscope**     | Mesure la rotation autour des axes X, Y, Z               | Jeux, réalité virtuelle, stabilisation photo |
| **Magnétomètre**  | Détecte le champ magnétique terrestre                    | Boussole, orientation géographique           |

Ces capteurs fonctionnent souvent **ensemble**, afin d'offrir une mesure complète du mouvement.

::: details **💡 Exemple concret :** {open}
- Un jeu mobile où l'on dirige une bille en inclinant le téléphone.
- Un casque de réalité augmentée qui suit les mouvements de la tête.
- L'auto-rotation d'un écran entre les modes portait et paysage.
:::

### 🔧 APIs associées
| Plateforme  | API / Service       | Description                                                      |
| ----------- | ------------------- | ---------------------------------------------------------------- |
| **Android** | `SensorManager`     | Interface centrale pour accéder à tous les capteurs matériels.   |
| **iOS**     | `CoreMotion`        | Fournit des données sur les mouvements et l’orientation.         |
| **Web**     | `DeviceMotionEvent` | Permet de lire l’accélération et la rotation dans le navigateur. |

::: warning **⚠️ À noter**
Ces capteurs peuvent être très sensibles : un rafraîchissement trop fréquent consomme de l'énergie et peut réduire l'autonomie du téléphone.
Il est recommandé de **limiter la fréquence de capture** (ex. 30 à 60 Hz selon le besoin).
:::
> **👨‍💻 Conseil développeur**
> 
> Utilisez la moyenne des mesures plutôt qu'une lecture brute pour éviter les oscillations parasites.

## 🔊 2.2.4 Capteurs audio, photo et vidéo
Les smartphones disposent également de capteurs multimédias puissants : **caméras**, **microphones** et **haut-parleurs**, voire plusieurs capteurs photo selon les modèles.
Ces éléments permettent une interaction directe entr el'utilisateur et le monde physique.

### 📸 Caméra
- Capture photo et vidéo haute définition.
- Détection de visage, codes-barres, objets.
- Utilisation en **réalité augmentée** (AR).

#### 🔧 APIs correspondantes
| Plateforme            | API principale | Exemple d’utilisation                    |
|-----------------------|----------------|------------------------------------------|
| **Android**           | `CameraX`      | Accès simplifié à la caméra              |
| **iOS**               | `AVFoundation` | Gestion avancée de la capture multimédia |
| **Capacitor / Ionic** | `Camera`       | Prise de photo/vidéo via un pont natif.  |
| **Flutter**           | `camera`       | Plugin pour accéder à la caméra.         |

> **💬 Exemples :** Google Lens, Snapchat, ou les applications de scan de documents (Microsoft Lens, Genius Scan).

### 🎤 Microphone
- Enregistrement vocal, appels, visioconférence.
- Reconnaissance vocale (Google Voice, Siri).
- Analyse de bruit ambiant, détection de mots-clés.

#### 🔧 APIs correspondantes
| Plateforme            | API principale    | Exemple d’utilisation                  |
|-----------------------|-------------------|----------------------------------------|
| **Android**           | `MediaRecorder`   | Enregistrement audio de haute qualité. |
| **iOS**               | `AVAudioRecorder` | Capture audio avec options avancées.   |
| **Capacitor / Ionic** | `VoiceRecorder`   |                                        | Enregistrement vocal via un pont natif.          |
| **Flutter**           | `audio_recorder`  | Plugin pour enregistrer de l’audio.    |

> **💬 Exemples :** une application de dictée vocale qui convertie la parole en texte, ou une app de reconnaissance musicale comme Shazam.

### 👍 Bonnes pratiques et accessibilités
- Toujours demander la *3permission explicite** avant d'activer la caméra ou le micro.
- Fournir un **signal visuel** (icône, vocant, vibration) indiquant que le capteure est en cours d'utilisation.
- Prévoir des **alternatives accessibles** : sous-titres, commandes vocales, transcriptions automatiques.
> 🎯 Une app respectueuse de la vie privée est une app à laquelle les utilisateurs font confiance !

::: danger
AJOUTER UNE IMGAE DE LA PASTILLE NE HAUT A GAUCHE SUR IPHONE QUAND LE MICRO OU LA CAMERA TOURNE
:::

## 🌡️ 2.2.5 Autres capteurs et contexte d'usage
En plus de la géolocalisation, du mouvement ou du multimédia, les smartphones intègrent de nombreus **capteurs complémentaireS** qui enrichissent les interactions et améliorent l'expérience utilisateur.

### 📱 Exemples de capteurs supplémentaires
| Capteur                    | Fonction                                          | Exemple d’utilisation                          |
|----------------------------|---------------------------------------------------|------------------------------------------------|
| **Proximité**              | Détecte un objet proche de l’écran                | Éteindre l’écran pendant un appel téléphonique |
| **Lumière ambiante**       | Mesure la luminosité environnante                 | Ajustement automatique de la luminosité        |
| **Biométrique**            | Reconnaissance d’empreinte ou faciale             | Sécurité et déverrouillage                     |
| **Baromètre / Pression**   | Mesure la pression atmosphérique                  | Calcul d’altitude, météo locale                |
| **Température / Humidité** | Capteurs intégrés sur certains modèles ou montres | Météo, confort, santé                          |
| **Capteurs de santé**      | Rythme cardiaque, SpO₂, nombre de pas             | Suivi sportif, bien-être, alertes santé        |

::: details **💡 Exemple concret :** {open}
Une montre connectée envoie les données de fréquence cardiaque au smartphone via Bluetooth. L'application peut ainsi afficher un graphique d'évolution ou envoyer une alerte si le rythme dépasse un seuil critique.
:::

### ⚙️ Contexte d'usage

Ces capteurs jouent un rôle important dans :
- Les **applications de santé connectée** (Apple Health, Samsung Health).
- Les **solutions domotiques** (capteurs de présence, température, humidité).
- Les **systèmes de sécurité** (empreintes, reconnaissance faciale).
- Les **appareisl portables (wearables)**, tels que montres ou bracelets connectés.
> 🎯 L'objectif de ces capteurs est de rendre l'expérience plus **personnalisée**, **intelligente** et **contextuelle**.

## 🔒 2.2.6 Sécurité, permissions et respect de la vie privée
L'accès aux capteurs d'un appareil implique souvent la manipulation de **données sensibles** : position, son, image, rythme cardiaque, etc.
Une mauvaise gestion des permissions peut compromettre la **confidentialité** ou la **sécurité** des utilisateurs.

### ⚠️ Permissions d'accès
Chaque système d'exploitation (Android, iOS) impose un **modèle d'autorisation** :
- Les permissions doivent être **déclarées** dans le code.
- L'utilisateur doit les **valider explicitement** à l'installation ou lors de l'utilisation.
- Il peut **les révoquer à tout moment** dans les paramètres.

::: details **💡 Exemples concrets :** {open}
> "Autoriser l'accès à la localisation pendant l'utilisation de l'application ?"
>
> "Autoriser l'accès à la caméra ?"
:::

### 👍 Bonnes pratiques
1. **Principe de minimisation** : ne demander qu'une personne quand elle est réellement nécessaire.
2. **Transparence** : expliquer pourquoi la donnée est utilisée ("Nous avons besoin de votre position pour afficher la météo locale").
3. **Sécurité des données** : chiffrer les informations sensibles (GPS, biométrie, audio).
4. **Révocation** : prévoir des comportements adaptés si l'utilisateur refuse une autorisation.
5. **Test utilisateur** : vérifier que l'application reste fonctionnelle avec des permissions limitées.

### 📘 Cadre légal et éthique
En Europe, le **RGPD (Règlement Général sur la Protection des Données)** encadre la collecte et l'utilisation des données personnelles.
Les développeurs doivent : 
- Obtenir le **consentement explicite** avant toute collecte.
- Garantir la **sécurité** et la **confidentialité** des données.
- Permettre à l'utilisateur de **supprimer ses données** sur demande.
::: details **💡 Exemple concret :** {open}
Une application de météo doit justifier son accès à la position GPS pour obtenir la météo locale, mais cesser de suivre l'utilisateur une fois fermée.
:::
> 🥇 **Règle d'or** : toujours traiter la donnée comme si c'était la vôtre.

::: danger 
EST-CE QUE JE PEUX TROUVER UN GIF QUI ILLUSTRE COMMENT SUPPRIMER LES DATA D'UNE APP DANS LES PARAMETRES D'UN IPHONE ? OU EN PLUS AJOUTER AUSSI UN MESSAGE DE CONSENTEMENT ?
:::

## 🧩 2.2.7 Activités pédagogiques
### 🧠 Exercice 1 - Identifier les capteurs
Utilisez les paramètres de votre smartphone ou une application comme _Sensor Box_ pour repérer les capteurs disponibles.
> ➡️ Quels types de données collectent-ils ?
> 
> ➡️ Quelles applications de votre téléphone les utilisent ?
> 
> ➡️ Quelles autorisations leurs sont demandées ?

### 🗺️ Exercice 2 - Étude de cas : géolocalisation et vie privée
Cas fictif : une application de sport collecte les déplacements de ses utilisateurs pour améliorer les recommandations d'itinéraires.
> ➡️ Quels capteurs sont sollicités ?
> 
> ➡️ Quels risques de confidentialité identifiez-vous ?
> 
> ➡️ Comment pourriez-vous limiter ces risques (anonymisation, consentement, mode hors-ligne) ?

### 🎮 Exercice 3 - Concevoir une app sensorielle
Imaginez une mini-application utilisant au moins **deux capteurs** (ex. caméra + accéléromètre).
> ➡️ Décrivez son fonctionnement et ses besoins en permissions.
> 
> ➡️ Proposez une idée de retour visuel ou sonor pour rendre l'expérience intuitive.

_💬 Exemple : une app qui fait "vibrer" le téléphone quand un objet est détecté trop proche de la caméra._

## 🔗 2.2.8 Références et ressources
- **[Android Developers - Sensors Overview](https://developer.android.com/guide/topics/sensors)**
- **[Apple Developer - Core Motion](https://developer-apple.com/documentation/coremotion)**
- **[Capacitor Documentation - Geolocation plugin](https://capacitorjs.com/docs/apis/geolocation)**
- **[Flutter - Sensors and Camera Packages](https://pub.dev/)**
- **[W3C - Device and Sensors APIs](https://www.w3.org/TR/)**
