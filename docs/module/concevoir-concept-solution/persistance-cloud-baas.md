# ☁️ 2.6 Persistance cloud et Backend-as-a-Service (BaaS)

<iframe src="https://slides.com/tirtho/2-6-persistance-cloud-et-backend-as-a-service-baas/embed" width="576" height="420" title="☁️ 2.6 Persistance cloud et Backend-as-a-Service (BaaS)" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## 🎯 Objectif d'apprentissage
À la fin de ce chapitre, vous serez capable de :
- Expliquer ce qu'est un **Backend-as-a-Service (BaaS)** et pourquoi il facilite le développement mobile.
- Comprendre l'intérêt du **cloud** dans une application moderne.
- Faire la différence entre **Supabase**, **Firebase**, **Appwrite**, **AWS Amplify**, etc.
- Gérer des données distances (CRUD), la synchro cloud &harr; local, et la gestion des permissions.
- Intégrer dans une app mobile :
  - une **base de données distante**,
  - du **stockage de fichiers**,
  - des **fonctions serverless**,
  - des **notifications push**,
  - une **authentification utilisateur**.

## 🤔 2.6.1 Introduction : pourquoi un backend cloud ?
Les applications mobiles modernes ne se contentent plus de fonctionner localement : elles doivent **synchroniser les données**, **gérer des profils utilisateurs**, et permettre un usage fluide **sur plusieurs appareils**.

Cela implique généralement :
- une **base de données distante**,
- une **API** pour gérer les lectures/écritures,
- une **authentification**,
- un **stockage de fichiers** (images, PDF, etc.),
- des **fonctions serveur**,
- une **gestion des permissions**.

Créer tout cela manuellement est long, coûteux, et nécessite de gérer un serveur, sa sécurité, sa scalabilité et sa maintenance.

C'est là que les **Backend-as-a-Service (BaaS)** deviennent extrêmement attractifs.

### 🤷 Qu'est-ce qu'un backend cloud apporte réellement ?
- Vos données sont **stockées et sauvegardées** automatiquement.
- Les utilisateurs peuvent retrouver leurs informations depuis **n'importe quel appareil**.
- Les mises à jour sont instantanées grâce aux APIs.
- La majorité du "travail serveur" est automatisée : authentification, règles de sécurité, fichiers, etc.
- Vous ne gérez **ni serveurs**, **ni maintenance**, **ni mise à l'échelle**.

::: details **💡 Exemple concret :** {open}
Une app mobile où les élèves stockent leurs notes et photos de projet :
&rarr; en changeant de téléphone, tout est déjà en ligne : rien ne se perd !
:::

## 🏭 2.6.2 Qu'est-ce qu'un Backend-as-a-Service (BaaS) ?
Un **BaaS** est un service cloud prêt à l'emploi, qui fournit toutes les briques indispensables d'un backend moderne, sans devoir coder une API ou installer un serveur.

### Un BaaS fournit généralement :
- **🔏 Authentification** (email, OAuth, etc.)
- **🗄️ Base de données distante** (SQL ou NoSQL)
- **🖼️ Stockage de fichiers** (images, vidéos, etc.)
- **🌐 API automatiquement générée**
- **⚙️ Fonctions serverless** (exécuter du code côté serveur)
- **🔔 Notifications push**
- **🛡️ Gestion des rôles et permissions**
- **📊 Logs & Analytics**

### ➕️ Avantages principaux
- **Aucune infrastructure à gére** (backup, sécurité, mises à jour).
- **Développement rapide** grâce à des API prêtes à l'emploi.
- **Sécurité intégrée** (permission, règles d'accès, tokens JWT).
- **Scalabilité automatique** : le service s'adapte à la charge.
- **Parfait pour les projets mobiles**, qui ont besoins de synchro et d'auth.
- **Coût maîtrisé** : payez selon l'usage (nombre d'utilisateurs, stockage, etc.).

### ⚠️ Limites
- Dépendance au fournisseur.
- Des coûts qui augmentent si l'app grandit fortement.
- Moins flexible qu'un backend développé entièrement sur mesure.
> 💬 Pour un module pédagogique ou une application interne, un BaaS est souvent le meilleur choix.

## 🧱 2.6.3 Comment fonctionne une base cloud ?
Voici le cycle classique d'un échange entre une app mobile et un backend cloud :

![Cloud-Flowchart](/diagrams/2.6/cloud-flow.svg)

::: details 1️⃣ L’utilisateur se connecte (authentification)

L’utilisateur saisit son email / mot de passe (ou utilise Google, Apple, etc.).

L’app envoie ces infos au backend :

```http
POST /auth/v1/token HTTP/1.1
Host: api.mon-backend.com
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "super-secret"
}
````

Le backend :

- vérifie les identifiants,
- génère un **JWT** (JSON Web Token) qui contient :
  - l’`id` utilisateur, 
  - ses rôles / permissions, 
  - une date d’expiration.

L’app stocke ensuite ce token dans un stockage sécurisé :

```ts
// Exemple pseudo-code avec SecureStorage
await SecureStorage.set({
  key: 'access_token',
  value: jwtToken
})
```

:::

::: details 2️⃣ L’app envoie une requête au backend

À chaque appel au backend, l’app ajoute le token dans le header `Authorization` :

```http
GET /rest/v1/notes HTTP/1.1
Host: api.mon-backend.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

En TypeScript (Ionic + fetch par ex.) :

```ts
const token = await SecureStorage.get({ key: 'access_token' })

const res = await fetch('https://api.mon-backend.com/rest/v1/notes', {
  headers: {
    Authorization: `Bearer ${token.value}`,
    'Content-Type': 'application/json'
  }
})

const data = await res.json()
```

L’app **n’envoie jamais** le mot de passe après la connexion initiale, uniquement le token.

:::



::: details 3️⃣ Le backend applique les permissions

Côté backend, chaque requête passe par :

1. **Vérification du token** (signature, expiration).
2. Lecture des claims (ex : `user_id`, `role`).
3. Application des règles de sécurité :

* cet utilisateur a-t-il le droit de lire ces données ?
* a-t-il le droit de modifier cette ressource ?
* est-il propriétaire de l’élément demandé ?

Exemple de règle (pseudo-SQL) :

```sql
-- Un utilisateur ne peut lire que ses propres notes
SELECT * FROM notes
WHERE user_id = auth.uid();
```

Si la permission est refusée → le backend renvoie une erreur `401` ou `403`.

:::



::: details 4️⃣ Le backend renvoie les données (JSON)

Si tout est OK, le backend renvoie une réponse JSON adaptée au profil de l’utilisateur.

Exemple avec Supabase :

```http
GET /rest/v1/notes?user_id=eq.214 HTTP/1.1
Host: xyz.supabase.co
Authorization: Bearer <token>
apikey: <public-anon-key>
```

Réponse possible :

```json
[
  {
    "id": 42,
    "user_id": 214,
    "title": "Note de cours",
    "content": "Backend as a Service",
    "created_at": "2025-11-19T10:15:00Z"
  }
]
```

L’app reçoit ce JSON et met à jour son état (store, composants, etc.).

:::



::: details 5️⃣ L’app met à jour la base locale

Pour un usage fluide et **offline-first**, l’app garde une copie locale des données :

* base locale (SQLite, IndexedDB, storage clé/valeur),
* ou store (Pinia, Redux) + persistance.

Exemple très simplifié avec un store :

```ts
// pseudo-code Pinia
const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[]
  }),
  actions: {
    async fetchNotes() {
      const token = await SecureStorage.get({ key: 'access_token' })
      const res = await fetch('https://api.mon-backend.com/rest/v1/notes', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      this.notes = await res.json()
      // TODO: sauvegarder aussi en local (SQLite / Capacitor Storage)
    }
  }
})
```

Ainsi :

* l’interface est réactive,
* on évite de recharger tout depuis le réseau à chaque fois.

:::



::: details 6️⃣ Gestion du mode hors ligne et synchronisation

Quand l’app est **hors ligne** :

* les actions de l’utilisateur sont stockées dans une **queue locale** (par ex. “à synchroniser plus tard”),
* on peut les garder dans :

    * une table locale (SQLite),
    * un fichier,
    * ou un simple tableau persisté.

Exemple de queue (pseudo-code) :

```ts
type PendingAction = {
  type: 'CREATE_NOTE' | 'UPDATE_NOTE' | 'DELETE_NOTE'
  payload: any
  createdAt: string
}

const pending: PendingAction[] = []

function queueAction(action: PendingAction) {
  pending.push(action)
  // TODO: sauvegarder en local
}
```

Dès que le réseau revient :

1. l’app envoie les actions en attente au backend,
2. supprime celles qui ont été confirmées,
3. récupère une version à jour des données depuis le backend.

💡 Ce modèle est le même pour **Supabase, Firebase, Appwrite** ou tout autre BaaS :
authentification → token → requêtes signées → règles de sécurité → JSON → cache local → sync offline.
:::

## ⚡ 2.6.4 Supabase - une plateforme SQL moderne et ouverte
Supabase est une solution BaaS construite autour de **PostgreSQL**, une base de données relationnelle reconnue pour sa robustesse. L'objectif de Supabase est de proposer une alternative moderne et open-source aux solutions propriétaires, tout en conservant un fonctionnement basé sur des standards : **SQL, RESTE, JWT, permissions explicites, etc**.

### 🏦 Une base de données SQL prête à l'emploi
Supabase repose sur PostgreSQL, ce qui signifie que les données sont structurées dans des tables avec des relations, contraintes et règles claires.
C'est une approche idéale pour les applicatios nécessitant une organisation cohérente ou des liens forts entre les données (profils, notes, projets, documents, etc.).

L'intérêt principal est que Supabase génère automatiquement :
- une **API REST** pour chaque table créée ; (donc pas besoin de coder une API soi-même)
- une **API GraphQL** (optionnelle) ;
- un panneau d'administration web complet pour gérer les données, les utilisateurs et les permissions.

Il devient aussi possible d'intéragir avec la base de données sans écrire une API personnalisée.

### 🔐 Authentification et permissions intégrées
Supabase propose un système d'authentification complet :
- Email/mot de passe
- OAuth (Google, GitHub, etc.)
- Magic links
- ...

Les règles de sécurités sont basées sur les **Row Level Security (RLS)** de PostgreSQL.
::: info 💬 Info
Les RLS permettent de définir précisément quels utilisateurs peuvent lire les données, quelles ressources sont accessibles et comment gérer les droits entre plusieurs rôles.
:::

### 🗃️ Stockage de fichiers
La plateforme inclut un service de **stockage d'images, PDF, et médias**, organisés en "buckets", comparable aux services S3 (Amazon).
L'accès aux fichiers suit les mêmes règles de persmissions que la base de données.

### 🛰️ Écoute en temps réel et fonctions serverless
Supabase intègre : 
- un système **realtime** basé sur PostgreSQL (écoute des insertions/modifications, suppressions) ;
- des **Edge Functions** permettant d'exécuter du code côté serveur, pour enrichir le backend si nécessaire. (par ex. envoi d'emails, traitement d'images, etc.)

Ces deux services permettent de créer des interactions plus dynamique dans l'application mobile.

### 🎓 Pourquoi Supabase est pertinent dans notre contexte éducatif
L'approche SQL aide à comprendre des concepts fondamentaux du développement backend, sans les contraintes d'un serveur à gérer.
Elle permet d'apprendre concrètement :
- SQL et les relations ;
- la logique API &rarr; base de données ;
- les systèmes d'authentification modernes ;
- les permissions et la sécurité des données ;
- la synchronisation cloud liée au mobile.

::: details **💡 Exemple concret : ajouter une entrée dans une table** {open}
```js
const { data, error } = await supabase
  .from('notes')
  .insert([
    { user_id: '214', title: 'Note de cours', content: 'Contenu de la note' }
  ])
```
:::

## 🔥 2.6.5 Firebase : une solution NoSQL simple et orientée temps réel

Firebase est une plateforme BaaS développée par Google. Elle se distingue par son intégration rapide, son fonctionnement intuitif et sa capacité à synchroniser les données instantanément entre plusieurs appareils.

### 🗄️ Stockage NoSQL

Firebase propose deux systèmes :

* **Firestore**, basé sur des documents et collections ;
* **Realtime Database**, conçu pour la synchronisation immédiate.

Ce modèle NoSQL permet de structurer les données de manière flexible, sans relations strictes comme dans SQL.

### 🔄 Synchronisation en temps réel

L’un des atouts majeurs de Firebase est sa mise à jour instantanée : lorsque des données changent, tous les utilisateurs voient l’évolution en direct.
C’est idéal pour les messageries, les outils collaboratifs ou les interfaces dynamiques.

### 🔐 Authentification intégrée

Le service inclut un module d’authentification complet :

* email/mot de passe,
* téléphone,
* comptes Google, Apple, GitHub, etc.

La gestion des sessions est automatique et les SDK facilitent fortement son intégration.

### 📁 Stockage de fichiers

Firebase propose également un espace pour stocker et sécuriser des images, vidéos ou documents, avec un système de permissions relié au module Auth.

### 🎯 Pourquoi choisir Firebase ?

Firebase est particulièrement adapté :

* aux projets éducatifs,
* aux prototypes rapides,
* aux applications orientées collaboration ou temps réel,
* aux équipes recherchant une solution simple à intégrer.

### ⚠️ Points à surveiller

Le NoSQL demande une structuration soigneuse pour éviter :

* des coûts inutiles,
* des duplications de données,
* des requêtes complexes difficiles à maintenir.

> 💬 Firebase convient mieux aux données peu structurées ou très dynamiques.

## ⚖️ 2.6.6 Supabase vs Firebase
Supabase et Firebase proposent tous deux un backend complet et prêt à l'emploi, mais reposent sur des approches différentes.
Le premier s'appuie sur le **SQL** et les standards ouverts, tandis que le second met en avant la **simplicité** et la **synchronisation en temps réel** via une base NoSQL.

### 🫂 Deux philosophies distinctes
- **Supabase** privilégie une structure de données relationnelles, organisée et cohérente, idéale pour les applications nécessitant des relations entre les données.
- **Firebase** adopte une approche documentaire plus flexible, adaptée aux données dynamiques et aux interactions en temps réel.

Les deux solutions incluent une authentification intégrée, un stockage de fichiers et des fonctions serverless, mais offrent des expériencs différentes selon les besoisn du projet.

| Critère               | **Supabase**                                   | **Firebase**                                                      |
|-----------------------|------------------------------------------------|-------------------------------------------------------------------|
| Type de base          | Relationnelle (PostgreSQL)                     | NoSQL (Firestore) - Documents / Collections                       |
| API                   | REST + GraphQL natifs                          | SDK propriétaires uniquement                                      |
| Auth                  | JWT, très flexible (Email, OAuth, Magic Links) | Auth Google (simple et robuste) - Email, téléphone, identités sociales |
| Realtime              | Oui                                            | Oui (encore plus rapide)                                          |
| Storage               | Buckets S3-like                                | Cloud Storage                                                     |
| Open-source           | **Oui**                                        | Non                                                               |
| Facile pour débutants | ⭐⭐⭐                                            | ⭐⭐⭐⭐⭐                                                             |
| Pratique pédagogique  | ⭐⭐⭐⭐⭐ (concepts universels)                    | ⭐⭐ (NoSQL uniquement)                                             |
| Idéal pour…           | projets structurés, SQL                        | prototypes, apps temps réel                                       |

::: tip **💬 En résumé**
Firebase est idéal pour les projets rapides, les applications en temps réel et l'apprentissage initial.
Supabase est plus adapté si vous souhaitez apprendre du **SQL**, construire des **APIs REST** ou maîtriser la logique de permission.
:::

## 💭 2.6.7 Autres solutions BaaS populaires
### ☁️ Appwrite
Appwrite est une plateforme BaaS open-source qui offre des fonctionnalités similaires à Supabase et Firebase, avec un accent sur la **sécurité** et la **flexibilité**.
Elle propose :
- une base de données NoSQL,
- une authentification complète,
- du stockage de fichiers,
- des fonctions serverless,
- et une interface d'administration web. 

> Appwrite est particulièrement apprécié pour son modèle auto-hébergé, permettant un contrôle total sur les données.

### ☁️ AWS Amplify
AWS Amplify est une solution BaaS proposée par Amazon Web Services. Elle s'intègre parfaitement avec l'écosystème AWS, offrant :
- une base de données (DynamoDB),
- une authentification (Cognito),
- du stockage (S3),
- des fonctions serverless (Lambda),
- et des outils de déploiement.

Amplify est puissant mais peut être complexe à configurer, surtout pour les débutants.

> Il est idéal pour les projets nécessitant une scalabilité importante et une intégration avec d'autres services AWS.
### ☁️ Backendless
Backendless est une plateforme BaaS qui propose une large gamme de fonctionnalités, notamment :
- une base de données relationnelle,
- une authentification,
- du stockage de fichiers,
- des fonctions serverless,
- et des notifications push.

Backendless se distingue par son interface utilisateur conviviale et ses options de personnalisation avancées.

> Il est adapté aux développeurs cherchant une solution complète avec une interface graphique intuitive.

### ☁️ Back4app
Back4app est une plateforme BaaS basée sur Parse Server, offrant des fonctionnalités telles que :
- une base de données NoSQL,
- une authentification,
- du stockage de fichiers,
- des fonctions serverless,
- et des notifications push.

Back4app est apprécié pour sa simplicité d'utilisation et son modèle de tarification flexible.
> Il convient aux développeurs recherchant une solution BaaS facile à utiliser avec une bonne documentation.

## 🔄️ 2.6.8 - Synchronisation cloud &harr; local
La synchronisation entre le **stockage local** (2.4) et le **backend cloud** (2.6) est l'un des aspects les plus importants d'une application mobile moderne.

> L'objectif est simple :
> 
> **🟦 offrir une expérience fluide, continue et fiable**, même en cas de perte de réseau.

Pour y parvenir, une application doit être capable de :
- fonctionner **offline-first**,
- enregistrer les données **localement**,
- détecter le retour du réseau,
- synchroniser les données avec le cloud **sans créer de conflits**.

### 🧠 Pourquoi synchroniser ?
Parce que les données d'une app mobile doivent être :
- **accessibles hors-ligne**,
- **sécurisées sur un serveur**,
- **partagées entre plusieurs appareils**,
- **toujours à jour.**

::: info 💬 Exemple :
Une app de notes utilise SQLite pour enregistrer une nouvelle note hors-ligne.
Lorsque la connexion internet revient, la note est envoyer vers Supabase ou Firebase.
:::

### 🔧 Le workflow standard de synchronisation

![workflow-sync.svg](/diagrams/2.6/workflow-sync.svg)

::: details 1️⃣ Lecture initiale depuis le stockage local

Au démarrage :

* l’app charge immédiatement les données locales (SQLite, Hive, Room, IndexedDB),
* l’interface devient utilisable **sans réseau**,
* aucun appel cloud n’est nécessaire pour afficher les données.

Exemple :

```ts
// Lecture depuis SQLite au démarrage
const notes = await db.selectFrom('notes').selectAll().execute()
store.notes = notes
```

> 💡 Cela rend l’ouverture **instantanée** et garantit un fonctionnement hors ligne.

:::

::: details 2️⃣ Mise à jour silencieuse depuis le cloud

Si le réseau est disponible au démarrage :

* l’app récupère les données distantes (Supabase, Firebase, Appwrite…),
* compare les versions locales / distantes,
* met à jour la base locale,
* le tout en **arrière-plan**, sans perturber l’utilisateur.

Exemple Supabase :

```ts
const { data } = await supabase
  .from('notes')
  .select('*')
  .eq('user_id', user.id)

await saveToLocalDB(data)
```

> 💡 L’interface reste fluide car les données locales sont toujours prioritaires.

:::

::: details 3️⃣ File d’attente des actions hors ligne (queue locale)

Lorsque l’utilisateur agit sans connexion :

* créer une note,
* modifier une tâche,
* supprimer un élément…

… alors l’app :

1. met d’abord à jour les données **en local**,
2. puis ajoute l’action dans une **queue locale**.

Exemple d’action stockée :

```ts
{
  id: uuid(),            // identifiant local
  type: 'UPDATE',
  entity: 'notes',
  payload: { id: 42, title: "New title" },
  timestamp: Date.now()
}
```

> 💡 Cette queue permet de rejouer les actions une fois le réseau rétabli.

:::

::: details 4️⃣ Synchronisation automatique au retour du réseau

Lorsque l’OS déclenche un événement réseau (`online / offline`):

* l’app lit la queue locale,
* envoie chaque action au backend,
* supprime les actions envoyées avec succès,
* met à jour la base locale si nécessaire.

Exemple Ionic (Capacitor Network) :

```ts
import { Network } from '@capacitor/network'

Network.addListener('networkStatusChange', status => {
  if (status.connected) {
    syncPendingActions()
  }
})
```

Synchronisation :

```ts
async function syncPendingActions() {
  for (const action of queue) {
    await sendToBackend(action)
    markActionSynced(action.id)
  }
}
```

> 💡 La synchronisation est automatique et transparente pour l’utilisateur.

:::

::: details 5️⃣ Gestion des conflits (offline vs. cloud)

Un conflit apparaît si une donnée a été modifiée :

* **en local hors-ligne**,
* **et sur le cloud**,
* **par un autre appareil ou utilisateur**.

L’app applique alors une règle métier, par exemple :

* **Last Write Wins** (le plus récent écrase l’ancien),
* **Serveur prioritaire** (le cloud fait foi),
* **Local prioritaire** (cas des brouillons),
* **Fusion logique** (notes, textes collaboratifs…).

Exemple simplifié :

```ts
if (local.updated_at > remote.updated_at) {
  // garder local
  upload(local)
} else {
  // garder cloud
  saveToLocalDB(remote)
}
```

> 💡 Le choix dépend du type d’application (notes, todo, documents, finances…).

:::

::: details 📡 Comment Ionic-Vue détecte la connectivité réseau (offline-first)

Une application mobile offline-first **ne vérifie jamais le réseau en boucle**.
Avec Ionic-Vue + Capacitor, la détection de la connectivité repose sur deux mécanismes :

1. **Un état initial** (au démarrage de l’app).
2. **Des événements automatiques envoyés par l’OS** (iOS / Android).

L’app réagit à ces informations :
→ si elle est offline → mode hors-ligne
→ si elle redevient online → synchronisation immédiate


#### 1️⃣ Déterminer l’état réseau au démarrage

Ionic utilise le plugin Capacitor **Network** pour obtenir l’état de la connexion **dès le lancement**.

```ts [startup.ts]
import { Network } from '@capacitor/network'

const status = await Network.getStatus()
console.log('Connected at startup:', status.connected)

if (!status.connected) {
  enterOfflineMode()
}
```
---

```json [Exemple de sortie]
{
  "connected": false,
  "connectionType": "none"
}
```

💡 *Pourquoi ?*
L’app doit savoir immédiatement si elle doit :

* charger uniquement les données locales → **offline-first**
* ou synchroniser les données depuis le cloud → **online**

#### 2️⃣ Événements réseau envoyés automatiquement par l’OS

iOS et Android envoient des événements dès que la connexion change :

* “l’appareil est offline”
* “connexion Wi-Fi disponible”
* “connexion 4G/5G active”
* “le réseau vient de revenir”

Capacitor expose ces signaux via :

```ts
import { Network } from '@capacitor/network'

Network.addListener('networkStatusChange', status => {
  console.log('Network changed:', status)

  if (status.connected) {
    syncPendingActions()   // 🟢 lancement automatique de la synchronisation
  } else {
    enterOfflineMode()     // 🔴 bascule en mode offline
  }
})
```

💡 *Ce n’est pas l’app qui surveille le réseau → c’est l’OS qui la prévient.*

Aucun polling.
Aucune boucle infinie.
Ultra efficace pour la batterie.


#### 3️⃣ Comment l’app garde les actions hors-ligne ?

Lorsqu’un utilisateur agit sans réseau :

* créer une note
* modifier une tâche
* supprimer un élément

→ L’action est stockée localement dans une **queue offline**.

```ts [queue.ts]
type PendingAction = {
  id: string
  type: 'CREATE' | 'UPDATE' | 'DELETE'
  payload: any
  timestamp: number
}

let queue: PendingAction[] = []

export function addOfflineAction(action: PendingAction) {
  queue.push(action)
  // TODO : sauvegarder en SQLite ou Capacitor Preferences
}
```
---
```ts [offline-usage.ts]
// Exemple lorsqu’une note est éditée hors-ligne
addOfflineAction({
  id: crypto.randomUUID(),
  type: 'UPDATE',
  payload: { id: 42, title: 'Nouvelle valeur' },
  timestamp: Date.now()
})
```

💡 En offline-first :
→ l’app affiche immédiatement la mise à jour
→ la synchronisation viendra plus tard automatiquement


#### 4️⃣ Synchronisation automatique quand le réseau revient

C’est la partie clé :
**quand l’OS informe Capacitor que le réseau est de retour → l’app synchronise toute seule.**

```ts
async function syncPendingActions() {
  for (const action of queue) {
    await sendToBackend(action) // requête API
    action.synced = true
  }

  // Nettoyage de la queue
  queue = queue.filter(a => !a.synced)
}
```

💡 L’utilisateur ne fait rien.
La synchronisation est **automatique** et **silencieuse**.

#### 5️⃣ En Résumé (Ionic-Vue + Capacitor Network)

- ✔ L’app récupère l’état initial du réseau via `Network.getStatus()`
- ✔ L’OS déclenche `networkStatusChange` quand la connectivité change
- ✔ L’app passe en mode offline si `connected = false`
- ✔ Les actions offline sont ajoutées à une queue locale
- ✔ Quand le réseau revient : → `syncPendingActions()` rejoue toutes les actions 
  - → la queue est nettoyée 
  - → l’app revient en mode online

> 🎯 *Modèle très utilisé* : WhatsApp, Notion, Google Drive, Figma Offline, etc.
:::

## 🧩 2.6.9 Activités pédagogiques

### 🧠 Exercice 1 — Comprendre un schéma BaaS

Un schéma représentant :
**App → Auth → API → Base cloud → Stockage fichiers**
vous est fourni.

> **Objectifs :**
> ➜ Compléter les étapes manquantes,
> ➜ Décrire les échanges (token, JSON, règles de permissions),
> ➜ Identifier les rôles : qui fait quoi ? (client, API, base, auth).

💬 *Idéal pour comprendre la vision “macro” d’un backend moderne.*

### 🛠️ Exercice 2 — Mini-CRUD cloud (Supabase ou Firebase)

Vous devez écrire, sous forme pseudo-code ou requêtes HTTP, les opérations CRUD suivantes :

1. **Créer une note**
2. **Modifier une note**
3. **Supprimer une note**
4. **Lister uniquement les notes de l’utilisateur connecté**

> **But pédagogique :** comprendre comment une base cloud réagit aux requêtes REST ou RPC, et comment les règles de sécurité filtrent les données.

💬 *En Supabase, cela permet aussi de découvrir les Policies (Row Level Security).*

### 🔄 Exercice C — Synchronisation offline → cloud

Scénario : l’utilisateur crée une note hors ligne.
Au retour du réseau :

> ➜ Où est stockée la note localement ?
> ➜ Comment la file d’attente (“queue”) mémorise l’intention ?
> ➜ Comment envoyer la requête lorsqu’Internet revient ?
> ➜ Comment résoudre un conflit (Local vs Cloud) ?

💬 *Cet exercice relie directement le chapitre 2.4 (persistance locale) et 2.6 (persistance cloud).*

### 💡 Exercice bonus — Comparatif BaaS

Par groupes, comparez **Supabase**, **Firebase** et **Appwrite** selon :

* Facilité d’apprentissage
* Fonctionnalités offertes
* Prix
* Mode offline
* Type de base (SQL vs NoSQL)
* Simplicité d’intégration mobile

> **Objectif :** être capable de justifier le choix d’un service cloud selon les besoins d’un projet mobile.

# 🔗 2.6.10 Références et ressources

* **[Documentation Supabase](https://supabase.com/docs)**

* **[Guides Supabase – Auth, Database, Storage](https://supabase.com/docs/guides)**

* **[API REST Supabase (PostgREST)](https://supabase.com/docs/guides/api/rest)**

* **[Documentation Firebase](https://firebase.google.com/docs)**

* **[Firestore – Data Modeling Guide](https://firebase.google.com/docs/firestore/data-model)**

* **[Firebase Authentication](https://firebase.google.com/docs/auth)**

* **[Appwrite Documentation](https://appwrite.io/docs)**

* **[AWS Amplify Documentation](https://docs.amplify.aws/)**

* **[PostgreSQL Documentation](https://www.postgresql.org/docs/)**

* **[Understanding JSON Web Tokens (JWT.io)](https://jwt.io)**

* **[Offline-first Architecture Principles](https://offlinefirst.org)**

* **[MDN – REST API Concepts](https://developer.mozilla.org/docs/Glossary/REST)**

## 📔 TL;DR
::: details Récapitulatif du chapitre
Ce chapitre présente le BaaS et le rôle du cloud dans une app mobile moderne. Il détaille le flux auth‑API‑données, compare Supabase et Firebase et cite d’autres services. Il couvre la synchro local‑cloud, la file d’attente offline et la résolution de conflits.
:::

