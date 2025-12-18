# 🔐 2.5 Authentification et gestion des utilisateurs

## 🎯 Objectif d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- Comprendre les principes de **base de l'authentification** (identité, session, tokens).
- Identifier les différences entre **authentification**, **autorisation** et **gestion des utilisateurs**.
- Expliquer le fonctionnement des **tokens JWT**, des *3sessions**, et du **stockage sécurisé**.
- Connaître les **solutions modernes** adaptées au mobile (Supabase Auth, Firebase Auth, Auth0, etc.).
- Gérer la persistance de connexion dans un contexte **mobile offline-first**.

## 🤔 2.5.1 Introduction : pourquoi identifier ? 
Dans une application mobile moderne, l'authentification permet de **reconnaître un utilisateur** et de lui offrir une expérience personnalisée.
Sans authentification, toutes les fonctionnalités doivent être accessibles à n'importe qui, sans distinction - ce qui est rarement souhaité.

### 🤷 Pourquoi identifier ?
- Afficher des **données personnelles** : messages, notes, favoris, historique.
- Protéger l'accès à certaines fonctionnalités : commandes, paiement, configuration.
- Synchroniser les données entre **plusieurs appareils** grâce au cloud.
- Améliorer l'expérience utilisateur : retrouver son profil, son thème, ses préférences.
> 👉 Dans le mobile, un fédi supplémentaire existe : l'utilisateur s'attend à **rester connecté**, même si l'app est fermée pendant plusieurs jours.

### Authentification vs Autorisation 
Ces deux notions sont souvents confondues :
- **Authentification** = vérifier l'identité de l'utilisateur
  > "Êtes-vous bien Thomas ?"
- **Autorisation** = vérifier si l'utilisateur a le droit d'accéder à une ressource
  > "Thomas peut-il modifier ce document ?"

Enfin, la **gestion des utilisateurs** englobe :
- création de compte,
- connexion,
- changement de mot de passe,
- email de vérification,
- gestion des rôles,
- suppression de comptes.

::: details **💡 Exemple concret :** {open}
Une application de notes affiche uniquement les notes du compte connecté - impossible d'accéder à celles d'un autre utilisateur.
:::

## 🔑 2.5.2 Les méthodes d'authentification modernes
Les applications mobiles supportent plusieurs méthodes d'authentification. Chaque méthode a ses usages, ses avantages et son niveau de sécurité.

### 🔹 1. Email + mot de passe
La méthode la plus courante

**Fonctionnement :**
1. L'utilisateur saisit email + mot de passe.
2. L'app envoie la requête de connexion au serveur.
3. Si les identifiants sont valides, le serveur renvoie un **token** de session.
4. L'app stock ce token en local (_Préférences_ ou _SecureStorage_).

>➕ **Avantages :** simple, répandu.
>
>➖ **Inconvénients :** nécessite une bonne gestion des mots de passe (hash côté serveur).

### 🔹 2. Magic Link
Méthode moderne utilisée par Slack, Notion...

**Fonctionnement :**
1. L'utilisateur saisit son email.
2. Il reçoit un email avec un lien unique.
3. Cliquer sur ce lien le connecte automatiquement.

> ➕ **Avantages :** pas de mot de passe à gérer, simple pour l'utilisateur
> 
> ➖ **Inconvénients :** dépend de l'email, moins adaptés aux environnements "business".

### 🔹 3. Social Login (OAuth)
Connexion via Google, Apple, Facebook, GitHub...

> ➕ **Avantages :** Connexion ultra-rapide, sécurité forte (vérification côté fournisseur)
> 
> ➖ **Inconvénients :** Dépendance à un acteur externe, peut être rejetté dans les environnements sensibles (écoles, entreprises).

::: info **💬 Cas particulier iOS**
Apple oblige parfois à proposer **"Sign in with Apple"** si d'autres logins sociaux sont inclus.
:::

### 🔹 4. Biométrie (Face ID/ Touch ID)
Permet de **déverrouiller** un compte déjà connecté.
Ce n'est pas une authentification cloud mais un moyen local de protéger l'accès.

> ➕ **Avantages :** rapide, fluide.
> 
> ➖ **Inconvénients :** doit être couplé à un compte préalablement connecté.

### 🔹 5. Sessions avec tokens (JWT)
La majorité des apps mobiles utilisent aujourd'hui des **tokens JWT** _(JSON Web Token)_, reçus après la connexion.
```http request
Authorization: Bearer <token>
```
- Le token encode des informations (id utilisateur, expiration...).
- Il doit être stocké localement et renvoyé à chaque requête.
- Un **refresh token** permet de prolonger la session de manière sécurisée. L'app peut demander un nouveau token d'accès sans redemander les identifiants, prolongeant ainsi la session.
::: info
Cette approche est au coeur de Supabase Auth, Firebase Auth, Auth0.
:::

## 🛡️ 2.5.3 Stockage sécurisé des sessions
Une application mobile doit pouvoir **mémoriser** la session d'un utilisateur même lorsque l'app est fermée.
Ce stockage doit être **persistant** mais aussi **sécurisé**.

### 🏦 Où stocker un token ?
| Environnement         | Solution                         | Sécurité                   |
|-----------------------|----------------------------------|----------------------------|
| **Ionic / Capacitor** | `SecureStorage` ou `Preferences` | 🔐 Chiffré (SecureStorage) |
| **Flutter**           | `flutter_secure_storage`         | 🔐 Chiffré                 |
| **Android natif**     | Keystore                         | 🔐 Très sécurisé           |
| **iOS natif**         | Keychain                         | 🔐 Très sécurisé           |

> **💬 Recommandation :** Toujours préférer un stockage **sécurisé** pour les tokens (access token + refresh token).

### 👍 Bonnes pratiques
- **Ne jamais** stocker de mot de passe en clair.
- Utiliser un système de **rotation** : un refresh token pour prolonger la session.
- Vérifier l'expiration du token au lancement de l'app.
- En cas de token invalide &rarr; redirection automatique vers l'écran de connexion.
- Si l'utilisateur est hors ligne, lui permettre d'utiliser les données **locales** tant que la session est encore valide.

::: details **💡 Exemple concret :** {open}
Supabase gère automatiquement la persistance de session, mais l'app doit stocker les tokens pour pouvoir fonctionner hor ligne (ou presque)
:::

## 🥸 2.5.4 Solutions modernes d'authentification
Aujourd'hui, la majorité des applications mobiles ne codent plus leur propre système d'authentification. Elles utilisent des services spécialisés (BaaS - _Backend as a Service_ ou des Identity Providers) simples à intégrer.

Voici les principaux :

### 🔸 Supabase Auth
- Entièrement open-source
- Basé sur PostgreSQL + JWT
- Magic links, passwords, OAuth
- Plugins officiels pour **Capacitor**, Flutter, React Native
- Gestion automatique des sessions, tokens, expiration
- Compatible offline (via stockage local)
> 📝 Très bon choix pédagogique et professionnel pour les projets modernes.

### 🔸 Firebase Auth
- Proposé par Google
- Très simple d'utilisation
- Social login, email/password, phone auth (OTP - _One Time Password_ via SMS)
- SDK mobile très solide
- Permet une gestion basique des utilisateurs
> 📝 Parfait pour un premier projet mobile.

### 🔸 Auth0 (niveau entreprise)
- Spécialisé "Identity & Access Management"
- Très complet (SSO, OAuth2, permissions avancées)
- Idéal pour les environnements professionnels complexes
- Intégration plus lourde, mais très robuste
> 📝 Choix privilégié dans les grandes entreprises.

### ⚖️ Comparatif synthétique
| Solution     | Simplicité | Mode offline | Coût   | Idéal pour                     |
|--------------|------------|--------------|--------|--------------------------------|
| **Supabase** | ⭐⭐⭐⭐       | ⭐⭐⭐⭐         | 💰💰   | App moderne avec base SQL      |
| **Firebase** | ⭐⭐⭐⭐⭐      | ⭐⭐           | 💰     | Premiers projets, apps simples |
| **Auth0**    | ⭐⭐⭐        | ⭐            | 💰💰💰 | Entreprises, SSO, loisir pro   |

## 📲 2.5.5 Authentification dans un contexte mobile offline-first
Sur mobile, l'expérience utilisateur dépend fortement de la **qualité de la connexion**.
Les coupures réseau sont normales (tunnels, ascenseur, trains, parking, zones rurales, Aula du Banné (😉), ...)

Pour cette raison, une bonne application mobile doit :
1. **continuer à fonctionner hors ligne**,
2. **maintenir la session utilisateur d'un utilisateur le plus longtemps possible**,
3. **se reconnecter automatiquement** quand le réseau revient.

### 🔧 Contraintes spécifiques au mobile
- Une session doit rester active même si l'app est fermée plusieurs jours.
- Une perte de réseau ne doit **pas déconnecter l'utilisateur**.
- Les données locales doivent continuer à être consultables.
- Si le token expire, l'app doit tenter un **refresh automatique**.

::: details **💡 Exemple concret :** {open}
Une app de notes doit être totalement utilisable offline, **y compris pour consulter ou créer des notes**, tant que la session locale est valide.
:::

## 💪 2.5.6 Stratégies robustes pour l'auth mobile
Voici un exemple de stratégie d'authentification robuste pour une application mobile moderne :

![strategie-auth-mobile.png](/2.5/strategie-auth-mobile.png)

::: details 🟦 1. Vérification de session au démarrage
Au lancement de l'app :
- l'application vérifie si un **token valide** est déjà stocké,
- si oui &rarr; l'utilisateur reste connecté,
- sinon &rarr; redirection vers l'écran de connexion.
:::

::: details 🟧 2. Rafraîchissement automatique du token
Les tokens JWT expirent (ex. après 1 heure).
Un **refresh token** permet d'en redemander un nouveau sans re-saisir le mot de passe.

Suivi classique :
1. L'app utilise le token &rarr; l'API répond `401 Unauthorized`.
2. L'app tente un refresh en arrière-plan.
3. Si le refresh réussit &rarr; nouvelle session tansparente pour l'utilisateur.
4. Si le refresh échoue &rarr; déconnexion.
:::

::: details 🟩 3. Stockage sécurisé du token
Les tokens doivent être stockés via :
- Capacitor `SecureStorage`
- iOS `Keychain`,
- Android `Keystore`,
- Flutter `flutter_secure_storage`.
> 🔐 **Ne jamais stocker un token dans localStorage** (dangereux, accessible via JS &rarr; XSS).

:::

::: details 🟧 4. Continuité hors ligne
Si l'utilisateur est hors ligne :
- l'app doit continuer à fonctionner sur les données locales (voir chapitre 2.4),
- les actions sont **mises en file d'attente**,
- la sync s'effectue lorsque le réseau revient.

:::

::: details 🟥 5. Déconnexion "gracieuse"
Si un token expire _et_ que le refresh échoue (ex. mot de passe changé ailleurs) :
- nettoyage complet de la session stockée,
- redirection vers la page de connexion,
- message clair : "Votre session a expiré, veuillez vous reconnecter."

:::

::: tip **📝 En résumé**
une application mobile doit maintenir une session utilisateur stable, sécurisée et résistante aux interruptions réseau. Les BaaS modernes (Supabase, Firebase), facilitent grandement cette logique.
:::

## 🧩 2.5.7 Activités pédagogiques
### 🧪 Exercice 1 - Comparer les méthodes de connexion
Objectif : comprendre les avantages et limites de différentes méthodes.
> &rarr; Comparez **mot de passe**, **OAuth** et **Magic Link**.
> &rarr; Classez-les selon : sécurité, rapidité, expérience utilisateur, facilité d'intégration.

_💬 Discussion en classe : faut-il obliger les logins sociaux ?_

### 🗄️ Exercice 2 - Stockage de session
Trois scénarios sont proposés :
- Tock stocké dans `Preferences`
- Token stocké dans `SecureStorage`
- Token stocké dans une base _SQLite_

> &rarr; Classez ces solutions du **moins sécurisé** au **plus sécurisé** et justifiez votre choix.
> &rarr; Expliquez pourquoi certaines solutions ne conviennent pas pour les tokens sensibles.

### 🔐 Exercice 3 - Workflow d'authentification
Réalisez un schéma complet du flux d'authentification mobile :
1. L'utilisateur saisit email + mot de passe
2. L'app envoie la requête à un service Auth
3. Le serveur renvoie un token JWT + refresh token
4. L'app stock les tokens localement
5. L'utilisateur accède à l'app
6. Lors d'un appel API &rarr; ajout du header `Authorization: Bearer <token>`
7. Token expiré &rarr; tentative de refresh
8. Échec &rarr; déconnexion propre

> _💬 Cet exercice prépare directement la section 2.6 (Supabase/Firebase)_

## 🔗 2.5.8 Références et ressources

- **[Supabase Auth](https://supabase.com/docs/guides/auth)**
- **[Firebase Authentication](https://firebase.google.com/docs/auth)**
- **[Auth0 – Identity Platform](https://auth0.com/docs)**
- **[OpenID & OAuth 2.0](https://oauth.net/)**
- **[JWT (JSON Web Tokens)](https://jwt.io)**
- **[OWASP Mobile Application Security](https://owasp.org/www-project-mobile-security/)**

