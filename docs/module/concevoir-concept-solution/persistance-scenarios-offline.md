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

## 2.4.4 📇 Stockage de fichiers
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



