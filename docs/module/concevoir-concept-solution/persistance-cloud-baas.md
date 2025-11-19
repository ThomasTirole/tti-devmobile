# ☁️ Persistance cloud et Backend-as-a-Service (BaaS)

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

::: danger
chapitre authentification utilisateur supabase auth rappel etc.
:::

## 🤔 2.6.1 Introduction : pourquoi un backend cloud ?
Les applications mobiles modernes ne se contentent plus de fonctionner localement : elles doivent **synchroniser les données**, **gérer des profils utilisateurs**, et permettre un usage fluide **sur plusieurs appareils**.

Cela implique généralement :
- une **base de données distante**,
- une **API** pour gérer les lectures/écritures,
- une **authentification**,
- un **stockage de fichiers** (images, PDF, etc.),
- des **fonctions serveur**,
- une **gestion des permissions**.

Créer tout cela manuellement est long, coûteux, et n écessite de gérer un serveur, sa sécurité, sa scalabilité et sa maintenance.

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

## ⚡ 2.6.4 Supabase - Base SQL + Auth + Stockage (Open Source)
Supabase est l'une des solutions BaaS les plus modernes, et un excellent choix pour l'enseignement comme pour les projets réels.

### 🤝 Présentation
Basé sur **PostgreSQL**, Supabase propose :
- une **base SQL complète**,
- des **API REST** et **GraphQL automatiques** (pas de backend à coder),
- un système d'**authentification sécurisé** (JWT),
- du **stockage de fichiers**,
- des **Edge Functions** pour du code serveur,
- du **realtime** basé sur PostgreSQL,
- un **dashboard complet** pour administrer les données.

Il fournit également des SK officiels pour :
- Ionic Capacitor
- Vue
- React Native
- Flutter
- Svelte / Web
- ...

::: danger
images de supabase ?
:::

### 🌟 Points forts de Supabase
#### 🔹 1. Une base SQL complète
Les vrais concepts de base de données relationnelles sont utilisés : tables, relations, contraintes, vues, index, fonctions stockées, etc.

#### 🔸 2. API automatiques (instant REST / GraphQL)
Dès qu'une table est créée &rarr; on a immédiatement une API REST et GraphQL sécurisée pour y accéder.
Aucune ligne de backend est à développer.

#### 🔹 3. Auth puissante
- Email + mot de passe
- Magic Links
- OAuth (Google, GitHub, Apple, etc.)
- Gestion des rôles
- Policies (RLS) très flexibles

#### 🔸 4. Usage pédagogique
- SQL
- REST
- JWT
- permissions
- synchro cloud
- stockage local

#### 🔹 5. Open-source
On peut héberger son propre Supabase si besoin.

### ⚠️ Limites / points d'attention
- L'approche SQL peut sembler plus technique au début.
- Pas aussi "plug & play" que Firebase pour tout ce qui est real-time très rapide.
- Les policies (RLS) demandent un peu de rigueur.

::: details **💡 Exemple concret : créer une note dans Supabase** {open}
```js
const { data, error } = await supabase
  .from('notes')
  .insert({ title: 'Chapitre 2.6', user_id: user.id });
```
:::

## 🔥 2.6.5 Firebase - Base NoSQL + Realtime + Auth Google
Firebase est l'un des services BaaS les plus utilisés au monde, développé par Google.
Il est particulièrement apprécié pour sa **simplicité** et sa **mise en route rapide**.

### 🤝 Présentation
Firebase propose plusieurs briques prêtes à l'emploi :
- 🔥 **Firestore** : base NoSQL (documents/collections)
- 🌳 **Realtime Database** : base arborescente synchronisée en temps réel
- 🔐 **Firebase Auth** (email, téléphone, Google…)
- 📁 **Cloud Storage** (pour images, vidéos, PDF)
- ⚙️ **Cloud Functions** (Node.js serverless)
- 📊 **Analytics & Crashlytics** (optionnel mais puissant)

C'est la solution la plus simple pour les débutants, et la plus rapide pour créer des prototypes ou des MVP.

### 🌟 Points forts
#### 💪 Très facile à prendre en main
L’intégration mobile (Android/iOS) est particulièrement bien documentée.
Idéal pour un premier projet de développement mobile.

#### 🔄 Realtime natif
Les données peuvent se synchroniser **instantanément** entre utilisateurs, de manière native.

#### 🧰 SDK très complet
Firebase fournit des SDK ultra-optimisés pour :
- Android (Java/Kotlin)
- iOS (Swift/ObjC)
- Flutter
- React Native

#### 🏢 4. Infrastructure Google
Haute disponibilité, performance, scalabilité automatique.

### ⚠️ Limites 
- La base NoSQL peut être complexe à structurer correctement.
- Une mauvaise conception peut entraîner des coûts importants.
- Pas de SQL : les élèves n'apprennent pas les jointures, relations, etc.
- Les règles de sécurité Firestore requièrent une certaine rigueur.

::: tip **💬 En résumé**
Firebase est idéal pour les projets rapides, les applications en temps réel et l'apprentissage initial.
Supabase est plus adapté si vous souhaitez apprendre du **SQL**, construire des **APIs REST** ou maîtriser la logique de permission.
:::

### ⚖️ 2.6.6 Supabase vs Firebase (comparaison synthétique)

| Critère               | **Supabase**                | **Firebase**                    |
|-----------------------|-----------------------------|---------------------------------|
| Type de base          | SQL (PostgreSQL)            | NoSQL (Firestore)               |
| API                   | REST + GraphQL natifs       | SDK Firebase uniquement         |
| Auth                  | JWT, très flexible          | Auth Google (simple et robuste) |
| Realtime              | Oui                         | Oui (encore plus rapide)        |
| Storage               | Buckets S3-like             | Cloud Storage                   |
| Open-source           | **Oui**                     | Non                             |
| Facile pour débutants | ⭐⭐⭐                         | ⭐⭐⭐⭐⭐                           |
| Pratique pédagogique  | ⭐⭐⭐⭐⭐ (concepts universels) | ⭐⭐ (NoSQL uniquement)           |
| Idéal pour…           | projets structurés, SQL     | prototypes, apps temps réel     |

