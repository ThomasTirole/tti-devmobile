# 💾 Persistance et scénarios offline

## 🎯 Objectif d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- Comprendre les différentes formes de **persistance locale** sur mobile
- Distinguer **bases de données locales**, **stockage clé-valeur**, et **stockage de fichiers**.
- Expliquer le fonctionnement des **scénarios offline** et du **cache local**.
- Gérer les **erreurs réseau**, la **synchronisation**, et la **résilience** d'une application.

## 🤔 2.4.1 Introduction : pourquoi la persistance ?
Une application mobile n'est pas toujours connectée à Internet : tunnels, bâtiments, zones rurales, métro, mode avion...
Pourtant, les utilisateurs s'attendent à ce qu'elle **continue de fonctionner normalement**, même hors ligne.

C'est là qu'intervient la **persistance** : la capacité d'une application à **stocker des données localement** sur l'appareil, afin qu'elles restent accessibles même sans connexion réseau.

La persistance permet par exemple de :
- conserver des **préférences utilisateur** (langue, thème sombre),
- mémoriser une **session de connexion**,
- stocker des **notes**, **listes**, **messages** ou **documents**,
- mettre en cache des données venant d'une API (ex. dernier rapport météo).

La gestion du mode offline repose sur trois briques complémentaires :
1. **le stockage léger** (clé-valeur),
2. **la base de données locale** (SQLite, Realm, etc.),
3. **la synchronisation** entre le local et le serveur, lorsque la connexion revient.

::: details **💡 Exemple concret :**  {open}
Une application de notes doit permettre d'ajouter, modifier ou supprimer des notes **même hors ligne**, puis synchroniser toutes les modifications avec le cloud dès que la connexion revient.
:::

> **🎯 Objectif de cette section** : comprendre les différentes solutions de stockage et comment assurer une expérience fiable en offline.

## 🔐 2.4.2 Stockage clé-valeur (préférences locales)
Le stockage clé-valeur est la forme de persistance la plus simple.
Il permet d'enregistrer de petites informations sous forme de paires **clé &rarr; valeur**, un peu comme un dictionnaire.

### 🔧 À quoi ça sert ?
Ce type de stockage est parfait pour :
- les **préférences utilisateurs** (thème sombre, langue, notifications),
- les **petits états internes** de l'application (dernière page visitée, état d'un tutoriel),
- les **tokens d'authentification** (JWT, OAuth).
- les paramètres de configuration.

::: warning **⚠️ Attention**
Il ne convient **PAS** pour stocker des données volumineuses ou complexes (ex. liste de produits, historique complet, messages...)
:::

### 🧑‍💻 Technologies selon plateforme
| Plateforme            | Outil                | Particularités                      |
|-----------------------|----------------------|-------------------------------------|
| **Android**           | `SharedPreferences`  | Simple, rapide, non chiffré         |
| **iOS**               | `UserDefaults`       | Pour les paramètres internes        |
| **Ionic / Capacitor** | `Preferences`        | API JS → natif, unifiée iOS/Android |
| **Flutter**           | `shared_preferences` | Stockage léger persistant           |

Exemple avec **Capacitor Preferences** :
```typescript
import { Preferences } from '@capacitor/preferences';

await Preferences.set({ 
  key: 'theme', // [!code focus]
  value: 'dark' // [!code focus]
});
```
::: tip **_👍 Bonnes pratiques :_** 
- Ne jamais stocker des informations sensibles en clair.
- Ne pas dépasser quelques kilo-octets.
:::

## 📂 2.4.3 Bases de données locales (SQLite, Room, CoreData)
Pour stocker des données plus volumineuses ou organisées, on utilise une **base de données locale**.
Contrairement au stockage clé-valeur, elle permet d'effectuer :
- des recherches (requêtes),
- des tris,
- des relations entre données,
- des mises à jour complexes.

### 🤔 Pourquoi utiliser une base locale ?
- Pour conserver une **liste de données** : notes, produits, messages, utilisateurs.
- Pour permettre à l'app de fonctionner **100% offline**.
- Pour créer un **cache local** d'API (ex. charger les données une fois, puis les relire hors ligne).

### 🛠️ Solutions principales
| Plateforme            | Solution                      | Description                               |
|-----------------------|-------------------------------|-------------------------------------------|
| **Android**           | **Room** (sur SQLite)         | ORM moderne, facile à utiliser en Kotlin  |
| **iOS**               | **CoreData**                  | Base orientée objets, intégrée au système |
| **Flutter**           | `sqflite`, `hive`             | SQLite ou base rapide clé-valeur          |
| **Ionic / Capacitor** | `@capacitor-community/sqlite` | Plugin SQLite natif fiable                |

::: details **💡 Exemples concrets :**  {open}
- une app de recettes stocke les recettes consultées,
- une app de notes gère des centaines d'entrées locales,
- une app de films garde la liste des favoris hors ligne.
:::

### 📌 Exemple visuel simple (schéma logique)
```
[ UI ] ⇄ [ ViewModel / Service ] ⇄ [ SQLite / CoreData ]
```

> 🎯 Une base locale permet un stockage organisé, performant et persistant, même lorsqu'on ferme l'application.

## 📇 2.4.4 Stockage de fichiers
Certaines applications doivent stocker des **fichiers** plutôt que des données structurées : photos, PDF, documents, images, scans, enregistrements audio...

### 📃 Types de fichiers concernés
- Photos prises par l'utilisateur
- Documents scannés,
- Factures ou reçus PDF,
- Captures vocales,
- Fichiers téléchargés depuis Internet.

### 🧰 APIs selon la plateforme
| Plateforme            | API                            | Utilisation                           |
|-----------------------|--------------------------------|---------------------------------------|
| **Android**           | `File`, `MediaStore`           | Gestion des fichiers et médias        |
| **iOS**               | `FileManager`                  | Gestion de dossiers, lecture/écriture |
| **Ionic / Capacitor** | `Filesystem`                   | API JS → système de fichiers natif    |
| **Flutter**           | `file_picker`, `path_provider` | Choix de fichiers, stockage local     |

> **💬 Exemple :**
> 
> Une application de scan stocke les images des documents localement avant de les envoyer au cloud lorsque la connexion revient.

### ⚠️ Points d'attention
- Gérer les permissions d'accès aux fichiers.
- Contrôler la taille : photos en haute résolution = beaucoup d'espace.
- Nettoyer les fichiers inutilisés pour éviter le stockage "fantôme".

## 🔌 2.4.5 Cache local et usage offline
Le **cache local** permet à une application d'afficher du contenu même lorsque la connexion Internet est lente ou indisponible.
C'est un mécanisme clé pour offrir une expérience fluide et éviter les écrans "vides" lorsque l'app démarre sans réseau.

### 🤔 Pourquoi utiliser un cache ?
- Pour réduire les appels réseau.
- Pour accélérer l'affichage (les données sont déjà disponibles).
- Pour permettre un usage **offline** partiel ou total.
- Pour améliorer la perception de performance.

> **💬 Exemple :**
> 
> Twitter, Instagram ou YouTube affichent le **dernier contenu chargé**, même hors ligne.

::: danger
TROUVER UN SCREEN DU CACHE YOUTUBE EN HORS-LIGNE ? OU INSTAGRAM PAR EXEMPLE SUR LE FEED
:::

### 🧠 Types de cache
- **Cache mémoire (RAM)**
  - Très rapide
  - Disparaît quand l'app est fermée
- **Cache disque**
  - Plus lent, mais persiste entre les sessions
  - Parfait pour les données API ou images

### 📖 Stratégies de lectures des données
| Stratégie                  | Description                                      | Cas d’usage                  |
|----------------------------|--------------------------------------------------|------------------------------|
| **Cache-first**            | Lire dans le cache, puis mettre à jour en fond   | App météo, listes d’articles |
| **Network-first**          | Essayer le réseau d’abord, puis fallback cache   | Chat, données sensibles      |
| **Stale-while-revalidate** | Afficher le cache immédiatement, puis rafraîchir | Réseaux sociaux              |

::: tip **🧑‍💻 Conseil développeur :**
Toujours enregistrer un **timestamp** pour savoir si les données du cache sont encore "fraîches". Comme en restauration : on labellise tous les aliments dans le frigo !
:::

::: danger
ajouter une image de frigo de restauration
:::

## 🔄️ 2.4.6 Synchronisation online/offline
La synchronisation consiste à **maintenir la cohérence** entre les données locales et les données du serveur, même lorsque l'utilisateur travaille sans réseau.

### 🏋️ Les défis
- Conflits entre données locales et distantes.
- Envoi d'actions accumulées offline.
- Fiabilité en cas d'arrêt brutal (batterie, crash, fermeture app).

### 📝 Stratégies de synchronisation

#### File d'attente locale (queue)
- Enregistrer chaque action utilisateur dans une `queue` persistante (ex. : "Ajouter une note", "Modifier le profil", "Supprimer un élément").
- À la reconnexion : rejouer la `queue` vers le serveur en respectant l'ordre.

#### Marqueurs de version (timestamps)
- Chaque enregistrement possède une version (par ex. `updatedAt`).
- En cas de modification simultanée, la plus récente (timestamp le plus récent) gagne.

#### Merge logique (résolution des conflits)
- Stratégies courantes :
  - Dernière modification prioritaire (Last-Writer-Wins).
  - Priorité au serveur (authoritatif).
  - Priorité au local (offline-first).

> **💬 Exemple :**
> Dans une app de notes, la version locale peut prévaloir si elle a été modifiée plus récemment.

## ❌ 2.4.7 Gestion des erreurs réseau
Le réseau mobile est **instable par nature**.
Une bonne application doit anticiper les coupures, lenteurs et erreurs HTTP.

### 🔍 Détection du statut réseau
- Android : `ConnectivityManager`
- iOS : `NNWPathMonitor`
- Ionic / Capacitor : `Network` plugin
- Flutter : `connectivity_plus` package

Cela permet d'afficher des messages comme :
- "Vous êtes hors ligne"
- "Connexion lente, veuillez patienter"
- "Connexion instable - affichage du cache"

### 🤕 Stratégie de résilience
- **Retry exponentiel** : réessayer au bout de 1s &rarr; 2s &rarr; 4s...
- **Fallback** vers le local (cache, BDD).
- **Désactivation automatique** de certaines actions hors ligne.
- Sauvegarde des actions dans une file locale (voir section précédente).

> 💬 **Exemple :**
> Une app de livraison peut empêcher l'envoi d'une commande hors ligne, mais continuer d'afficher les menus via le cache.

## 🧩 2.4.8 Activité pratique - Mini schéma de stockage
### 🎓 Objectif
Concevoir une architecture de stockage pour une **application de notes** fonctionnant en mode offline &rarr; online.

### 📌 Consignes
> ➜ Identifiez les données à stocker localement (titre, contenu, date, statut “à synchroniser”).
> 
> ➜ Décidez ce qui va dans :
>
> * **SQLite** (notes + version + statut)
> * **Clé-valeur** (préférences, thème, dernier utilisateur)
    >   ➜ Décrivez le comportement offline :
> **Ajouter une note hors ligne**
> * **Modifier une note hors ligne**
    >   ➜ Décrivez la synchronisation au retour du réseau.

### 🏆 Bonus
Comment gérer un conflit si la note a été modifiée sur le téléphone et sur un autre appareil pendant que l'utilisateur était hors ligne ?

> 💬 Cet exercice prépare directement la transition vers le chapitre 2.5 (Authentification) et 2.6 (Backend as a Service : Supabase / Firebase).

## 🔗 2.4.9 Références

- [Android Room](https://developer.android.com/training/data-storage/room)
- [iOS CoreData](https://developer.apple.com/documentation/coredata)
- [Capacitor Storage & SQLite](https://capacitorjs.com/docs)
- [Flutter sqflite](https://pub.dev/packages/sqflite)
- [W3C IndexedDB API](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)



