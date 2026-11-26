# 🌳 1.1 Comprendre l'écosystème mobile

<iframe src="/slides/1-1-ecosysteme-mobile/" title="1.1 Comprendre l'écosystème mobile" style="width:100%;aspect-ratio:16/9;border:0" allowfullscreen></iframe>

<a href="/slides/1-1-ecosysteme-mobile/" target="_blank">Ouvrir les slides en plein écran</a>

## 🎯 Objectifs d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- Décrire les grandes évolutions du développement mobile.
- Identifier les principaux acteurs et plateformes actuels du marché mobile.
- Comprendre les spécificités du marché et les implications pour les développeurs.

## ❓ 1.1.1 Qu'est-ce qu'une application mobile ?
Une **application mobile** est un programme conçu pour être exécuté sur un **appareil mobile** : smartphone, tablette ou montre connectée.

Elle se distingue d'un **site web mobile**, qui s'exécute dans un navigateur, par le fait qu'elle peut être **installée localement**, **utiliser des capteurs** de l'appareil (GPS, caméra, micro, etc.) et **fonctionner hors-ligne**.

::: details **💡 Exemples concrets :** {open}
- **Application native :** WhatsApp, développée pour Android et iOS séparément.
- **Application web (PWA) :** Starbucks, qui a des apps natives mais aussi une version web qu'on peut installer sur le téléphone depuis le navigateur.
- **Application cross-platform :** Discord, dont l'app mobile est développée en React Native, avec une seule base de code pour Android et iOS.
:::
## 🔍 1.1.2 Pourquoi développer pour mobile ?
Aujourd'hui, le mobile est **le principal moyen d'accès à Internet**. Selon StatCounter, environ **60% du trafic web mondial** provient d'appareils mobiles (59,9% en octobre 2026).
Les utilisateurs passent en moyenne **4 à 5 heures par jour** sur leur téléphone.

Les entreprises privilégient donc les applications mobiles pour :

- **Améliorer l'expérience utilisateur** grâce à une interface fluide et personnalisée
- **Créer de la proximité via les notifications et la géolocalisation**.
- **Offrir des fonctionnalités inédites**, comme la réalité augmentée, les paiements sans contact ou la reconnaissance faciale.

::: tip
*🎯 Pour vous, futurs développeurs, comprendre cet écosystème est essentiel pour choisir les bons outils et anticiper les contraintes techniques.*
:::

## 🕰️ 1.1.3 Brève histoire du développement mobile
Le développement mobile n'a pas toujours ressemblé à ce qu'il est aujourd'hui.

| Période       | Événement clé                                        | Impact                                          |
| ------------- |------------------------------------------------------| ----------------------------------------------- |
| **2000–2006** | Applications Java ME et Symbian                      | Premiers jeux et outils mobiles                 |
| **2007**      | Lancement de l’iPhone                                | Naissance du smartphone moderne                 |
| **2008**      | App Store et Android Market                          | Émergence des écosystèmes d’applications        |
| **2010–2015** | Explosion des frameworks hybrides (PhoneGap, Ionic)  | Développement multi-plateformes facilité        |
| **2015–2018** | Apparition de React Native, Flutter, Kotlin | Multiplateforme plus performant, langages modernes |
| **2019–2026** | SwiftUI, Jetpack Compose, IA embarquée sur l'appareil | UI déclarative, fonctions d'IA directement dans les apps |

::: warning 💡 À retenir :
Les outils ont évolué pour **simplifier le travail des développeurs** et **unifier les plateformes**, mais chaque système garde ses particularités.
:::

## 📱 1.1.4 Les plateformes dominantes
Le marché mobile mondial est dominé par **deux systèmes d'exploitation** :
- **Android (Google)** : environ 68% de part de marché mondiale.
- **iOS (Apple)** : environ 32% de part de marché mondiale.

*Source : StatCounter, août 2026. Attention, ces chiffres changent beaucoup selon les pays : en Suisse, iOS est en tête (environ 56% en octobre 2026).*
Les autres systèmes (HarmonyOS, KaiOS, etc.) ne représentent qu'une minorité.

![statcounter-os-mobile.png](/1.1/statcounter-os-mobile.png)

### 🤖 Android
- Système **open source** (AOSP) développé par Google.
- **Utilisé** par de **nombreux fabricants** (Samsung, Xiaomi, etc.).
- Utilise principalement les langages **Kotlin** et **Java**.
- L’environnement de développement recommandé est **Android Studio**.
- Publication via le **Google Play Store**.
- **Avantages** : flexibilité, compatibilité large, liberté de distribution.
- **Inconvénients** : forte fragmentation (versions d’OS et tailles d’écran).

### 🍎 iOS
- Système **propriétaire** d’Apple, limité aux appareils de la marque.
- Langages principaux : **Swift** (moderne) et **Objective-C** (legacy).
- Environnement de développement : **Xcode** sur **macOS**.
- Publication via l’**App Store**, soumise à **validation stricte**.
- **Avantages** : stabilité, performance, cohérence visuelle.
- **Inconvénients** : environnement fermé, coûts de publication plus élevés.

**🔍 Comparatif rapide**
| **Critère**                  | **Android**                   | **iOS**                |
| ------------------------ | ------------------------- | ------------------ |
| Liberté de développement | ✅ Grande                  | ⚠️ Restreinte      |
| Marché potentiel         | 🌍 Très large             | 💎 Premium         |
| Complexité de test       | ⚠️ Élevée (fragmentation) | ✅ Limitée          |
| Langages principaux      | Kotlin, Java              | Swift, Objective-C |
| IDE principal            | Android Studio            | Xcode              |

::: info 💬 *En résumé:*
*Android offre plus de flexibilité et d'audience, tandis qu'iOS garantit une meilleure uniformité et une expérience plus contrôlée.*
:::

## 🧬 1.1.5 Le cycle de vie d'une application mobile

Développer une application mobile ne se limite pas à l'écriture de code.
C'est un **processus complet**, du concept initial jusqu'à la maintenance après publication.

### 🔁 Les principales étapes
1. **Analyse et conception**
   - Identifier les besoins des utilisateurs. 
   - Définir les fonctionnalités et l'ergonomie.
   - Réaliser des maquettes (wireframes, prototypes).
2. **Développement**
   - Utiliser un environnement adapté (Android Studio, Xcode, ou framework cross-platform).
   - Implémenter les fonctionnalités et interfaces
   - Gérer les dépendances et les permissions
3. **Tests et validation**
   - Vérifier le fonctionnement sur différents appareils.
   - Tester les performances, la compatibilité et la sécurité.
4. **Publication**
   - Préparer la version finale (build de release). 
   - Soumettre l'application sur un store (Play Store, App Store)
5. **Maintenance et amélioration**
   - Corriger les bugs détectés après publication.
   - Ajouter de nouvelles fonctionnalités.
   - Analyser les retours des utilisateurs via des outils analytiques. (ex: Firebase Analytics)
   - Ajouter de nouvelles fonctionnalités selon les besoins.

::: warning 💡 À retenir :
Le développement mobile est un **cycle itératif**, où chaque version améliore la précédente.
:::

## 📦 1.1.6 Distribution et mise à jour
Les applications peuvent être distribuées de plusieurs manières :
- **Via un store officiel** (Play Store, App Store)
  - ➡️ C'est le mode le plus courant pour le grand public.
- **Via une distribution interne** (entreprise, test)
  - ➡️ Utilisée pour les applications métiers ou les tests bêta.
- **Via une Web App ou PWA**
  - ➡️ Accessible sans installation, directement dans le navigateur.

Les mises à jour sont essentielles pour :
- Corriger les problèmes techniques.
- S'adapter aux nouvelles versions des systèmes d'exploitation.
- Introduire des nouveautés et fidéliser les utilisateurs.

::: info 
*📈 En moyenne, une application populaire reçoit entre 4 et 12 mises à jour par an.*
:::

## ⚙️ 1.1.7 Les contraintes du développement mobile
Développer pour mobile implique de composer avec un ensemble de **contraintes techniques et ergonomiques.**

### 💾 Techniques
- **Mémoire et batterie limitées**
- **Performances variables** selon les appareils et modèles.
- **Taille et ratio d'écran différents**
- **Connexion au réseau instable ou absente**

### 🤓 Expérience utilisateur
- **Usage en mobilité :** l'utilisateur peut être interrompu à tout moment.
- **Saisie tactile :** nécessite des zones cliquables larges et des gestes intuitifs.
- **Lisibilité :** textes courts, contrastes élevés, polices adaptées.
- **Accessibilité :** support des lecteurs d'écran, sous-titres, contrastes suffisants

::: info
*🎯 L'objectif est d'offrir une expérience fluide et cohérente, malgré ces contraintes*.
:::

## 🔝 1.1.8 Tendances et évolutions du mobile
L'écosystème mobile évolue constamment. Voici quelques tendances majeures en 2026 :
### ⚡ 1. Applications multiplateformes 
Les frameworks comme **Flutter**, **Ionic** ou **React Native** permettent de développer **une seule base de code** pour Android et iOS.
> Avantage : gain de temps et de maintenance.
> Limite : parfois moins performant qu'une app native.

### 🧠 2. Intelligence artificielle et personnalisation 
De nombreuses applications intègrent des modèles d'IA pour :
- Personnaliser l'expérience utilisateur (recommandations, chatbots).
- Améliorer et automatiser les fonctionnalités (reconnaissance vocale, traitement d'images).
- Analyser les comportements d'usage pour optimiser l'interface.

### 📡 3. 5G et au-delà
Des connexions ultra-rapides ouvrent la voie à des applications plus riches
- en médias (streaming 4K, réalité augmentée).
- en collaboration en temps réel (jeux multijoueurs, outils de productivité).
> Limite : nécessite une couverture réseau adéquate. ➡️ ce qui est encore inégal selon les régions.

### 🌐 4. Progressive Web App (PWA)
Les PWA combinent les avantages du web et du mobile : 
- Installation depuis le navigateur.
- Fonctionnement hors-ligne
- Mises à jour automatiques
- Accessibilité multiplateformes

### 🕶️ 5. Réalité augmentée et connectivité
L'essor de l'AR (Réalité Augmentée) et des objets connectés (IoT, montres, capteurs), ouvre de nouvelles perspectives pour les applications mobiles.
> 💬 Exemples : IKEA Place (visualisation d'objets 3D), Strava (suivi d'activité en temps réel).

**💡 Tendances futures :**
- Apps **contextuelles** (qui s'adaptent à la localisation ou au moment de la journée)
- Meilleure **intégration entre mobile**, **montre**, et **web**.
- Sensibilité accrue aux **questions d'éthique et de sobriété numérique**.

## 🧩 1.1.9 Activités pédagogiques

### 🧠 Exercice 1 - Analyse du marché mobile
Recherchez la part de marché actuelle d'Android et d'iOS dans :
- Le monde
- L'Europe
- La Suisse
> ➡️ **Question :** Quelles implications cela a-t-il pour un développeur souhaitant publier une application dans ces régions ? 
> 
> ➡️ et pour le choix des technologies à utiliser ?
> 
> ➡️ et pour la stratégie de marketing ?

[//]: # ()
[//]: # (### 📈 Exercice 2 - Ligne du temps technologique)

[//]: # (En groupe, créez une **frise technologique** retraçant les grandes étapes du développement mobile entre 2000 et 2025.)

[//]: # (Incluez : les systèmes d'exploitation, les languages, et les frameworks majeurs.)

[//]: # (> ➡️ **Objectif :** comprendre comment les outils ont évolué pour simplifier la création d'applications.)

[//]: # ()
[//]: # (### 🔁 Exercice 3 - Cycle de vie d'une application)

[//]: # (Choisissez une application que vous utilisez souvent &#40;ex: Instagram, Spotify, Duolingo, etc.&#41;)

[//]: # (Reconstituez les **grandes étapes de son cycle de vie** :)

[//]: # (1. Idée / besoin initial)

[//]: # (2. Fonctionnalités principales)

[//]: # (3. Tests / publication)

[//]: # (4. Évolutions depuis sa sortie)

[//]: # (> ➡️ **Objectif :** relier la théorie du développement mobile à un cas concret)

## 🔗 1.1.10 Sources et références

* **StatCounter (2026)** – [https://gs.statcounter.com/](https://gs.statcounter.com/)
* **Google Developers** – [developer.android.com](https://developer.android.com)
* **Apple Developer** – [developer.apple.com](https://developer.apple.com)
* **Flutter Docs** – [https://docs.flutter.dev](https://docs.flutter.dev)
* **W3C – Mobile Web Best Practices** – [https://www.w3.org/TR/mobile-bp/](https://www.w3.org/TR/mobile-bp/)
* **DataReportal (2024)** – Global Digital Overview





## 📔 TL;DR
::: details Récapitulatif du chapitre {open}
Ce chapitre définit l’application mobile, ses différences avec le web, et pourquoi le mobile domine l’accès Internet. Il retrace l’évolution de l’écosystème, compare Android et iOS, et rappelle le cycle de vie d’une app. Il couvre aussi la distribution, les contraintes techniques/UX et les tendances actuelles (cross‑platform, IA, 5G, PWA, AR).
:::

