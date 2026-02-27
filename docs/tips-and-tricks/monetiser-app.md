# 💰 Bonus — Monétiser une application mobile avec Ionic

> ⚠️ **Chapitre hors scope du module**, proposé en bonus pour les plus curieux. Il ne fait pas partie des objectifs évalués, mais reflète la réalité du marché et vous permettra de mettre en place une monétisation dans vos projets personnels.

<iframe src="https://slides.com/tirtho/bonus-monetiser-une-application-mobile-avec-ionic/embed" width="576" height="420" title="💰 Bonus — Monétiser une application mobile avec Ionic" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Dans ce chapitre bonus, vous allez découvrir **comment gagner de l'argent avec une application mobile**, de la théorie jusqu'à l'implémentation concrète dans un projet Ionic-Vue.

La monétisation est une réalité du marché : même les applications gratuites doivent générer des revenus pour être viables. Comprendre comment ça fonctionne — et comment l'intégrer proprement dans un projet — est une compétence précieuse, que vous soyez futur développeur freelance, employé, ou entrepreneur.

## 🎯 Objectifs d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- comprendre les **différents modèles de monétisation** d'une application mobile ;
- distinguer les **formats publicitaires** (bannière, interstitiel, rewarded) et savoir **quand les utiliser** ;
- appliquer les **guidelines officielles AdMob** par format ;
- intégrer le plugin **`@capacitor-community/admob`** dans un projet Ionic-Vue ;
- implémenter une **bannière**, une **pub interstitielle** et une **pub récompensée** ;
- comprendre le fonctionnement des **achats intégrés (IAP)** et leur intégration avec **RevenueCat** ;
- comprendre ce que la monétisation implique pour la **publication** sur les stores.

##  💰 B.1 — Les modèles de monétisation mobiles

### 💡 B.1.1 Vue d'ensemble

Il existe plusieurs façons de gagner de l'argent avec une application mobile. Elles ne s'excluent pas et peuvent souvent être **combinées**.

| Modèle | Description | Exemples |
|--------|-------------|---------|
| **Freemium** | Gratuit avec fonctionnalités premium payantes | Spotify, Duolingo |
| **Publicité (ads)** | Affichage de pubs, revenus via impressions/clics | Jeux mobiles gratuits |
| **Abonnement** | Paiement récurrent mensuel ou annuel | Netflix, Strava |
| **Achat unique (paid app)** | L'utilisateur achète l'app une seule fois | Certains jeux/outils |
| **Achats intégrés (IAP)** | Contenu ou fonctionnalités achetables dans l'app | V-Bucks Fortnite, skins |
| **Affiliate / partenariats** | Liens sponsorisés, recommandations rémunérées | Apps de voyage, finance |

> 💬 Exemple : Clash Royale est **gratuit**, mais génère des centaines de millions via les **achats intégrés** (gemmes, coffres). Candy Crush, lui, se finance surtout via les **pubs** et quelques IAP.

### 📊 B.1.2 Lequel choisir ?

Le choix du modèle dépend du **type d'app**, de l'**audience cible** et de la **valeur perçue**.

::: tip 💭 Règle générale
- App utilitaire ou pro → **abonnement ou achat unique**
- Jeu casual ou app grand public → **publicité + IAP**
- App avec forte valeur ajoutée → **freemium** (base gratuite + premium payant)
  :::

::: warning ⚠️ Attention à l'UX
Un mauvais modèle de monétisation peut détruire une bonne application. Les pubs intrusives, les paywalls agressifs ou les dark patterns (faux boutons "Fermer", comptes à rebours trompeurs) génèrent des avis négatifs et des désinstallations massives.
:::

Dans ce chapitre, nous nous concentrons sur deux approches pratiques : la **publicité avec Google AdMob** et les **achats intégrés (IAP)** avec RevenueCat.

##  📢 B.2 — La publicité mobile avec Google AdMob

### 📱 B.2.1 Qu'est-ce qu'AdMob ?

**Google AdMob** est la régie publicitaire mobile de Google, et la plus utilisée dans le monde. Elle sert d'intermédiaire entre les **annonceurs** (qui veulent diffuser leurs pubs) et les **développeurs** (qui veulent monétiser leur app).

En tant que développeur, vous :
1. créez une **unité publicitaire** dans la console AdMob ;
2. intégrez le **SDK AdMob** dans votre app ;
3. recevez des **revenus** à chaque impression ou clic (CPM / CPC).

> 💬 Exemple : pour 1 000 impressions d'une bannière, vous touchez en moyenne entre 1€ et 3€ selon la région et la thématique de l'app. Les pubs vidéo rewarded rapportent généralement beaucoup plus.

### 🎨 B.2.2 Les formats publicitaires

Il existe plusieurs formats, chacun adapté à un contexte précis.

![ads.png](/bonus/ads.png)

#### 🔲 Bannière (`Banner`)
Une petite bande publicitaire, affichée de manière **permanente** en haut ou en bas de l'écran.
Non-intrusive, avec des revenus modestes mais constants.
Idéale pour les apps à usage prolongé (lecture, outils, utilitaires).

> 💬 Exemple : une app de calculatrice affiche une bannière en bas en permanence.

#### ⬛ Interstitiel (`Interstitial`)
Une publicité **plein écran** qui s'affiche entre deux écrans ou à des moments de transition naturels.
Plus intrusive, mais plus rémunératrice.
Doit être utilisée aux **bons moments** — jamais en plein milieu d'une action.
L'utilisateur peut la fermer après quelques secondes.

> 💬 Exemple : dans un jeu mobile, une interstitielle s'affiche entre deux niveaux ou après un "Game Over".

#### 🎬 Rewarded (`RewardedAd`)
Une publicité **vidéo volontaire** : l'utilisateur choisit de la regarder en échange d'une récompense dans l'app (vie supplémentaire, monnaie virtuelle, déblocage de contenu...).
Meilleur taux d'engagement de tous les formats, et non-intrusive car volontaire.
Très utilisée dans les jeux.

> 💬 Exemple : "Regardez une vidéo pour obtenir 50 pièces d'or !" dans un jeu mobile.

#### 📋 Tableau récapitulatif

| Format | Intrusivité | Revenus | Déclenchement recommandé |
|--------|-------------|---------|--------------------------|
| **Bannière** | Faible | Faibles | Permanent, contenu statique |
| **Interstitiel** | Élevée | Moyens | Transitions naturelles (fin de niveau, changement de page) |
| **Rewarded** | Nulle (volontaire) | Élevés | Sur action explicite de l'utilisateur |

### ⏱️ B.2.3 Guidelines officielles et bonnes pratiques UX

Google publie des guidelines officielles pour chaque format. Ne pas les respecter peut entraîner la **suspension de votre compte AdMob** ou le **refus de votre app sur le store**. Voici les règles essentielles, format par format.

#### 🔲 Guidelines — Bannière

::: details 📋 Règles officielles AdMob {open}
- Ne jamais placer une bannière de façon à **provoquer des clics accidentels** — par exemple juste sous un bouton de l'app.
- Ne pas **empiler** plusieurs bannières sur le même écran.
- Ne pas **masquer** la bannière sous d'autres éléments de l'interface.
- La bannière doit rester **visible** sans jamais gêner l'usage principal.
- Utiliser de préférence le format **`ADAPTIVE_BANNER`** : il s'adapte à la largeur de l'écran et est le format recommandé par Google depuis 2023.

📎 [Banner ad guidance — Google AdMob](https://support.google.com/admob/answer/6128877)
:::

#### ⬛ Guidelines — Interstitiel

::: details 📋 Règles officielles AdMob {open}
Ces règles sont issues de la [documentation officielle AdMob](https://support.google.com/admob/answer/6066980).

**À propos du format**

Les interstitielles sont conçues pour les **apps à expérience linéaire**, avec des points de départ et d'arrêt clairement définis. Si votre app n'a pas cette structure (ex : lampe torche, calculatrice), préférez une bannière.

Certaines interstitielles peuvent avoir un **délai jusqu'à 5 secondes** avant d'afficher le bouton "Fermer". Si les _high-engagement ads_ sont activées, ce délai peut monter à **12 secondes** pour les vidéos. Des sources tierces peuvent aller jusqu'à **30 secondes**.

**✅ Implémentations recommandées**
- Afficher **après** une transition naturelle (fin de niveau, changement de section).
- Laisser l'utilisateur **terminer son action** avant d'afficher la pub.
- **Pré-charger** la pub en arrière-plan avant d'en avoir besoin (`prepareInterstitial()`).
- Réfléchir aux trois questions suivantes avant chaque déclenchement :
    - Comment l'utilisateur interagit-il avec l'app à cet instant ?
    - L'interstitielle va-t-elle le surprendre ?
    - Est-ce vraiment le bon moment ?

**❌ Implémentations interdites**
- Afficher une interstitielle **au lancement** de l'application.
- Déclencher une pub **en plein milieu** d'une action (formulaire, lecture, gameplay actif).
- Afficher **plusieurs interstitielles à la suite** sans pause.
- Placer le bouton "Fermer" de façon à le rendre **difficile à trouver ou à toucher**.
- Déclencher une pub susceptible de provenir d'un **clic accidentel** sur l'interface.

📎 [Interstitial ad guidance — Google AdMob](https://support.google.com/admob/answer/6066980)
:::

::: tip 💬 Règle des intervalles
Implémentez toujours un **cooldown** entre deux interstitielles. Une bonne pratique est de ne pas en afficher plus d'**une toutes les 3 à 5 minutes**. Vous verrez comment implémenter ça dans le code avec une variable de timestamp.
:::

#### 🎬 Guidelines — Rewarded

::: details 📋 Règles officielles AdMob {open}
- La pub doit toujours être **volontaire** : l'utilisateur doit explicitement choisir de la regarder.
- La **récompense doit être clairement annoncée** avant le visionnage ("Regardez 30 secondes pour obtenir 50 pièces").
- Ne jamais **forcer** un utilisateur à regarder une rewarded pour continuer à utiliser l'app normalement.
- La récompense doit être **délivrée uniquement après** visionnage complet (géré automatiquement par l'événement `Rewarded`).
- Pour les récompenses à fort enjeu (argent réel, contenu premium), utiliser la **vérification côté serveur (SSV)**.
  :::

> 💬 Les pubs rewarded ont les **meilleurs eCPM** (effective Costs Per Mille, soit le revenu généré pour 1000 impressions publicitaires affichées) de tous les formats — souvent 5 à 15× plus élevés qu'une bannière — car l'engagement utilisateur est maximal : l'utilisateur a choisi de regarder.

#### 📊 Estimations de revenus publicitaires (2024–2025)

| Format | eCPM moyen (UE/US) | Engagement | Risque UX |
|--------|-------------------|------------|-----------|
| **Bannière** | 1€ – 3€ / 1 000 impressions | Faible | Très faible |
| **Interstitiel** | 5€ – 15€ / 1 000 impressions | Moyen | Élevé si mal placé |
| **Rewarded** | 10€ – 30€ / 1 000 impressions | Très élevé | Nul (volontaire) |

> 💬 Ces valeurs sont indicatives et varient selon la région, la thématique de l'app et la qualité de l'audience. Un utilisateur européen ou nord-américain génère en moyenne 5 à 10× plus de revenus qu'un utilisateur d'Asie du Sud-Est.

<video src="/bonus/mobile-game-ads.mp4" controls style="width: 50%; border-radius: 8px;" />

##  🛒 B.3 — Les achats intégrés (In-App Purchases)

### 🛒 B.3.1 Principe général

Les **achats intégrés** (IAP) permettent à l'utilisateur d'acheter du contenu ou des fonctionnalités directement depuis l'application, sans quitter l'app. C'est un des modèles les plus rentables pour les jeux et les apps à forte valeur perçue.

Il en existe trois types principaux :

| Type | Description | Exemple |
|------|-------------|---------|
| **Consommable** | Acheté et "consommé" (disparaît après usage) | 100 pièces d'or, 5 vies |
| **Non-consommable** | Acheté une fois, disponible à vie | Supprimer les pubs, déverrouiller un niveau |
| **Abonnement** | Accès récurrent, renouvelable automatiquement | Accès premium mensuel |

### 🏪 B.3.2 Le rôle des stores

Les stores (**Google Play** et **App Store**) sont **obligatoirement impliqués** dans les achats intégrés. Ils :
- hébergent et valident les produits achetables ;
- gèrent le paiement de manière sécurisée (l'app ne touche jamais aux données de paiement) ;
- prélèvent une **commission de 15% à 30%** sur chaque achat.

> 💬 Sur un achat à 1.00 CHF dans votre app, vous recevez entre 0.70 et 0.85 CHF selon votre volume et les politiques en vigueur. C'est l'une des raisons pour lesquelles Apple et Google se retrouvent régulièrement devant les tribunaux antitrust...

### 🔄 B.3.3 Le flux d'un achat

Voici ce qui se passe lorsqu'un utilisateur achète quelque chose dans une app :

1. L'utilisateur appuie sur "Acheter" dans l'app.
2. Le **store natif** (Google Play ou App Store) prend le relais et affiche sa fenêtre de paiement sécurisée.
3. L'utilisateur confirme l'achat (empreinte, Face ID, mot de passe).
4. Le store envoie un **receipt** (reçu cryptographique) à votre app.
5. Votre app **valide** ce receipt (idéalement côté serveur) et délivre le contenu acheté.
6. Le store verse les revenus mensuellement — après déduction de sa commission.

::: warning ⚠️ Validation côté serveur
Pour les achats à fort enjeu (monnaie premium, abonnements), il est fortement recommandé de **valider le receipt côté serveur** pour éviter la fraude. C'est l'une des choses que RevenueCat gère automatiquement.
:::

### ⚙️ B.3.4 RevenueCat — pourquoi et comment ça marche

Pour Ionic + Capacitor, la solution la plus fiable et la plus utilisée en production est **RevenueCat**. C'est un service qui abstrait les APIs de facturation d'Apple et Google en une API unifiée.

| Sans RevenueCat | Avec RevenueCat |
|-----------------|-----------------|
| Deux APIs différentes (StoreKit iOS + Billing Android) | Une seule API unifiée |
| Gestion manuelle des receipts et de la validation | Validation automatique côté serveur |
| Pas de tableau de bord analytique | Dashboard : revenus, rétention, MRR, LTV |
| Gestion complexe des abonnements (renouvellement, annulation, grace period) | Gestion entièrement automatique |
| Gratuit | Gratuit jusqu'à 2 500$/mois de revenus gérés |

RevenueCat introduit trois concepts clés que vous retrouverez dans le code :

- **Product** : un produit défini dans le store (ex : `premium_monthly` sur Google Play)
- **Entitlement** : un accès que l'utilisateur débloque en achetant (ex : `premium`) — c'est ce que votre app vérifie
- **Offering** : l'ensemble des packages à proposer à l'utilisateur sur l'écran paywall (ex : mensuel + annuel)

> 💬 RevenueCat sert d'intermédiaire : il écoute les événements de facturation des stores, valide les reçus côté serveur, et expose une API unifiée à votre app. Sans lui, vous auriez deux intégrations complètement différentes à maintenir.

::: warning ⚠️ Prérequis pour tester les IAP
Contrairement à AdMob qui fonctionne immédiatement en local avec des IDs de test, les achats intégrés nécessitent que votre app soit **publiée sur une piste de test interne** de Google Play ou App Store avant de pouvoir tester la fenêtre de paiement native. RevenueCat ne peut pas simuler cela en local.

Tester les achats intégrés nécessite plusieurs prérequis qui dépassent le cadre de cet atelier :
- un compte RevenueCat créé et configuré avec votre app
- des produits créés et publiés dans Google Play Console ou App Store Connect
- votre app publiée sur une piste de test interne du store

**Dans cet exercice, concentrez-vous sur AdMob** — les trois formats publicitaires (bannière, interstitielle, rewarded) fonctionnent immédiatement en local avec les IDs de test. Le code IAP est là pour que vous puissiez l'utiliser dans vos projets personnels une fois les prérequis remplis.
:::


##  📋 B.4 — Implications pour la publication

Avant de publier une app avec monétisation, plusieurs étapes supplémentaires sont nécessaires par rapport à une app classique.

### 📋 B.4.1 Ce qu'il faut prévoir à l'avance

| Élément | Obligatoire ? | Description |
|---------|--------------|-------------|
| **Politique de confidentialité** | ✅ Oui | Obligatoire dès que vous collectez des données (AdMob le fait) |
| **Consentement RGPD (UMP)** | ✅ Oui (UE) | Formulaire de consentement pour les pubs personnalisées |
| **Déclaration des pubs dans le store** | ✅ Oui | Google Play et App Store demandent de déclarer l'usage d'AdMob |
| **Compte AdMob créé et vérifié** | ✅ Oui | Le compte doit être lié au projet avant publication |
| **Compte développeur Google Play** | ✅ Oui (Android) | 25$ unique |
| **Compte développeur Apple** | ✅ Oui (iOS) | 99$/an |
| **Informations fiscales** | ✅ Oui | Google et Apple exigent des données fiscales pour virer les revenus |
| **Déclaration COPPA (enfants)** | ✅ Si ciblage <13 ans | Pubs non-personnalisées obligatoires |
| **Bouton "Restaurer les achats"** | ✅ Oui (iOS + IAP) | Apple exige ce bouton dans toute app avec achats intégrés |

### 🔐 B.4.2 Le consentement RGPD et l'UMP

Depuis 2024, Google exige que toutes les apps diffusant des pubs dans l'**Union Européenne** affichent un formulaire de consentement via l'**UMP (User Messaging Platform)**.

Ce formulaire demande à l'utilisateur s'il accepte les pubs personnalisées (basées sur ses données) ou non.

::: warning ⚠️ Important
Si l'utilisateur refuse les pubs personnalisées, les revenus sont généralement inférieurs, mais les pubs non-personnalisées (`npa: true`) continuent d'être diffusées. Ne pas afficher ce formulaire peut entraîner la suspension de votre compte AdMob.
:::

L'implémentation de ce formulaire est intégrée directement dans le composable `useAdMob.ts` via `requestConsentInfo()` et `showConsentForm()` — vous n'avez donc rien d'autre à faire.

### 📊 B.4.3 Les IDs de test vs production

AdMob fournit des **IDs publicitaires de test officiels**, à utiliser pendant le développement. Ces IDs affichent de vraies pubs de test, sans générer de faux revenus ni risquer la suspension du compte.

| Plateforme | ID de test Banner | ID de test Interstitiel | ID de test Rewarded |
|------------|-------------------|------------------------|---------------------|
| **Android** | `ca-app-pub-3940256099942544/6300978111` | `ca-app-pub-3940256099942544/1033173712` | `ca-app-pub-3940256099942544/5224354917` |
| **iOS** | `ca-app-pub-3940256099942544/2934735716` | `ca-app-pub-3940256099942544/4411468910` | `ca-app-pub-3940256099942544/1712485313` |

::: danger ⛔ Ne jamais faire ça
Utiliser vos IDs de production pour tester = générer de faux clics = **suspension immédiate et définitive** du compte AdMob. Toujours utiliser les IDs de test pendant le développement.
:::

##  🔨 B.5 — Mise en pratique : projet AdMob de A à Z

Passons à la pratique ! Nous allons créer un petit projet Ionic-Vue qui démontre les trois formats publicitaires ainsi qu'un écran de paywall IAP.

> 🎯 **Objectif du projet** : une mini-app "QuizFlash" avec :
> - **Tab 1** — Quiz avec bannière en bas, interstitielle entre les questions (cooldown), rewarded pour un indice
> - **Tab 2** — Écran Paywall avec les offres IAP --> attention, ça ne marchera pas en local tant que vous n'aurez pas publié l'app sur une piste de test du store, mais le code est là pour que vous puissiez l'utiliser dans vos projets personnels

### B.5.1 — Créer et préparer le projet
```bash
ionic start quizflash-admob tabs --type=vue --capacitor
cd quizflash-admob
```

Vérifiez votre version de Capacitor si besoin :
```bash
npx cap --version
```

Installez les plugins :
```bash
npm install @capacitor-community/admob@8 # remplacez selon version de Capacitor
npm install @revenuecat/purchases-capacitor # pour les achats intégrés (IAP)
```

Ajoutez la plateforme Android et synchronisez :
```bash
npx cap add android      # génère le dossier android/ (une seule fois)
ionic build              # compile le projet web dans www/
npx cap sync             # copie www/ dans android/ et installe les plugins natifs
```

::: warning ⚠️ L'ordre compte
`npx cap add android` doit être fait **avant** d'éditer les fichiers natifs — il génère la structure `android/`. `ionic build` ne touche jamais à `AndroidManifest.xml` ni à `strings.xml` : ces fichiers sont sous votre contrôle dès leur création et `cap sync` ne les écrase pas.

Vérification de la version : `npx cap --version`. Ce chapitre utilise `admob@8` pour Capacitor 8, utilisez `admob@7` pour Capacitor 7, `admob@6` pour Capacitor 6...
:::

### B.5.2 — Configuration Android

Une fois le dossier `android/` généré, éditez les deux fichiers suivants.

Dans `android/app/src/main/AndroidManifest.xml`, ajoutez à l'intérieur de `<application>` :
```xml
<meta-data
  android:name="com.google.android.gms.ads.APPLICATION_ID"
  android:value="@string/admob_app_id"/>
```

> Attention, veillez à ne pas mettre dans le `<meta-data>` qui est dans la balise `<provider>`. Pour être sûr, allez jusqu'à la fin de la balise `</application>`.



Dans `android/app/src/main/res/values/strings.xml`, ajoutez :
```xml
<string name="admob_app_id">ca-app-pub-3940256099942544~3347511713</string>
```

> 💬 Cet ID est l'**App ID de test officiel** de Google. En production, il sera remplacé par votre propre App ID AdMob.
### B.5.3 — Composable `useAdMob.ts`

Créez `src/composables/useAdMob.ts` :

```typescript [src/composables/useAdMob.ts]
import {
    AdMob,
    BannerAdOptions, BannerAdSize, BannerAdPosition,
    AdmobConsentStatus,
} from '@capacitor-community/admob'

// ─── IDs publicitaires ──────────────────────────────────────────
// En développement → IDs de test officiels Google (IS_TESTING = true)
// En production    → passer IS_TESTING à false et renseigner vos IDs
const IS_TESTING = true

const AD_IDS = {
    banner:       IS_TESTING ? 'ca-app-pub-3940256099942544/6300978111'  : 'VOTRE_ID_BANNER',
    interstitial: IS_TESTING ? 'ca-app-pub-3940256099942544/1033173712' : 'VOTRE_ID_INTERSTITIAL',
    rewarded:     IS_TESTING ? 'ca-app-pub-3940256099942544/5224354917' : 'VOTRE_ID_REWARDED',
}

// ─── Cooldown interstitiel ──────────────────────────────────────
// Timestamp du dernier affichage, pour respecter les guidelines Google
let lastInterstitialTime = 0
const INTERSTITIAL_COOLDOWN_MS = 3 * 60 * 1000 // 3 minutes minimum

export function useAdMob() {

    // ── Initialisation ────────────────────────────────────────────
    /**
     * À appeler UNE SEULE FOIS au démarrage dans main.ts.
     * Gère le consentement RGPD (UMP) et l'ATT sur iOS 14+.
     */
    async function initialize(): Promise<void> {
        await AdMob.initialize()

        const consentInfo = await AdMob.requestConsentInfo()
        if (consentInfo.isConsentFormAvailable && consentInfo.status === AdmobConsentStatus.REQUIRED) {
            await AdMob.showConsentForm()
        }

        const trackingInfo = await AdMob.trackingAuthorizationStatus()
        if (trackingInfo.status === 'notDetermined') {
            await AdMob.requestTrackingAuthorization()
        }
    }

    // ── Bannière ──────────────────────────────────────────────────
    async function showBanner(): Promise<void> {
        const options: BannerAdOptions = {
            adId:     AD_IDS.banner,
            adSize:   BannerAdSize.ADAPTIVE_BANNER, // format recommandé par Google
            position: BannerAdPosition.BOTTOM_CENTER,
        }
        await AdMob.showBanner(options)
    }

    async function hideBanner(): Promise<void> { await AdMob.hideBanner() }

    /**
     * Détruit la bannière. À appeler dans onUnmounted.
     */
    async function removeBanner(): Promise<void> { await AdMob.removeBanner() }

    // ── Interstitiel ──────────────────────────────────────────────
    /**
     * Pré-charge en arrière-plan (à faire avant d'en avoir besoin).
     * Bonne pratique : charger la pub avant d'en avoir besoin
     * pour éviter un délai au moment de l'affichage.
     */
    async function prepareInterstitial(): Promise<void> {
        await AdMob.prepareInterstitial({ adId: AD_IDS.interstitial })
    }

    /**
     * Affiche l'interstitielle uniquement si le cooldown est respecté.
     * Respecte les guidelines AdMob (pas de spam).
     * @returns true si la pub a été affichée
     */
    async function showInterstitial(): Promise<boolean> {
        const now = Date.now()
        if (now - lastInterstitialTime < INTERSTITIAL_COOLDOWN_MS) {
            console.log('[AdMob] Cooldown actif — interstitielle ignorée.')
            return false
        }
        try {
            await AdMob.showInterstitial()
            lastInterstitialTime = now
            return true
        } catch (e) {
            console.warn('[AdMob] Interstitiale non disponible :', e)
            return false
        }
    }

    // ── Rewarded ──────────────────────────────────────────────────
    /**
     * Affiche une pub rewarded et retourne la récompense si l'utilisateur
     * a regardé la vidéo jusqu'au bout. Retourne null sinon.
     */
    async function showRewardedAd(): Promise<{ type: string; amount: number } | null> {
        try {
            await AdMob.prepareRewardVideoAd({ adId: AD_IDS.rewarded })
            const reward = await AdMob.showRewardVideoAd()
            return { type: reward.type, amount: reward.amount }
        } catch (e) {
            console.warn('[AdMob] Rewarded non disponible :', e)
            return null
        }
    }

    return {
        initialize,
        showBanner, hideBanner, removeBanner,
        prepareInterstitial, showInterstitial,
        showRewardedAd,
    }
}
```

::: details 💡 Pourquoi un composable ?
Même logique qu'au chapitre **2.3** : la **page** ne doit pas connaître les détails d'AdMob. Le **composable** encapsule les IDs, le cooldown, la gestion d'erreurs et le consentement RGPD. Si demain vous changez de régie pub, vous ne touchez qu'à ce fichier.
:::

### B.5.4 — Initialiser AdMob dans `main.ts`

```typescript [src/main.ts]
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IonicVue } from '@ionic/vue'
import { useAdMob } from '@/composables/useAdMob' // [!code ++]

// ... reste du code

async function bootstrap() {
  const app = createApp(App).use(IonicVue).use(router)

  const { initialize } = useAdMob() // [!code ++]
  await initialize()                // [!code ++]

  router.isReady().then(() => {
    app.mount('#app')
  })
}

bootstrap()
```

::: warning ⚠️ **Attention** :
On utilise aussi l'encapsulation du code dans une fonction `bootstrap()` asynchrone pour pouvoir `await initialize()` avant de monter l'app. C'est important pour que le consentement RGPD soit géré avant tout affichage de pub.
:::

### B.5.5 — Tab 1 : Quiz avec les trois formats publicitaires

La bannière AdMob s'affiche par-dessus l'interface native — elle ne connaît pas la barre de tabs. Sans ajustement, elle masque le bas du contenu ou se superpose aux onglets.

```vue [src/views/Tab1Page.vue]
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>QuizFlash 🧠</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Question {{ currentQuestion + 1 }} / {{ questions.length }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ questions[currentQuestion].text }}</p>

          <!-- Transition naturelle → bon moment pour une interstitielle -->
          <ion-button expand="block" @click="nextQuestion">
            Question suivante →
          </ion-button>

          <!-- Rewarded : l'utilisateur demande explicitement un indice -->
          <ion-button expand="block" fill="outline" color="warning" @click="getHint">
            💡 Obtenir un indice (regarder une vidéo)
          </ion-button>
        </ion-card-content>
      </ion-card>

      <ion-toast
          :is-open="toastOpen"
          :message="toastMessage"
          :duration="3000"
          @didDismiss="toastOpen = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonToast
  } from '@ionic/vue'
  import { useAdMob } from '@/composables/useAdMob'

  const { showBanner, removeBanner, prepareInterstitial, showInterstitial, showRewardedAd } = useAdMob()

  const questions = [
    { text: 'Quelle est la capitale de la Suisse ?' },
    { text: 'Combien font 7 × 8 ?' },
    { text: 'En quelle année a eu lieu la Révolution française ?' },
    { text: 'Quel est le symbole chimique de l\'or ?' },
    { text: 'Combien de côtés a un hexagone ?' },
  ]
  const currentQuestion = ref(0)
  const toastOpen = ref(false)
  const toastMessage = ref('')

  function showToast(msg: string) {
    toastMessage.value = msg
    toastOpen.value = true
  }

  async function nextQuestion() {
    currentQuestion.value = (currentQuestion.value + 1) % questions.length

    // Transition naturelle → on tente l'interstitielle (le cooldown gère le rythme)
    const shown = await showInterstitial()
    if (!shown) {
      // Pas affichée (cooldown) → on précharge pour la prochaine transition
      await prepareInterstitial()
    }
  }

  async function getHint() {
    showToast('⏳ Chargement de la vidéo...')
    const reward = await showRewardedAd()

    if (reward) {
      showToast(`🎉 Indice débloqué ! (récompense : ${reward.amount} ${reward.type})`)
    } else {
      showToast('❌ Vidéo non disponible, réessayez plus tard.')
    }
  }

  onMounted(async () => {
    await showBanner()           // Bannière dès l'arrivée sur la page
    await prepareInterstitial()  // Pré-chargement en arrière-plan
  })

  onUnmounted(async () => {
    await removeBanner()         // Nettoyage propre à la sortie
  })
</script>
```

::: tip 💭 Récap des 3 formats dans cette page
- **Bannière** : affichée automatiquement dans `onMounted`, retirée dans `onUnmounted`
- **Interstitiel** : tentée lors d'une transition naturelle (`nextQuestion`), cooldown géré dans le composable
- **Rewarded** : déclenchée uniquement sur action explicite de l'utilisateur (`getHint`)
:::

À partir d'ici, vous pouvez tester l'application pour y voir les pubs. Les trois formats fonctionnent immédiatement en local grâce aux IDs de test officiels. N'oubliez pas que les achats intégrés (Tab 2), ci-dessous, nécessitent une configuration préalable dans les stores et la publication sur une piste de test pour fonctionner.

### B.5.6 — Composable `useIAP.ts`
::: danger 🚨 **Important** :
Depuis cette étape, ce code ne fonctionnera pas en local tant que vous n'aurez pas configuré votre projet dans RevenueCat et publié sur une piste de test du store. Cependant, il est là pour que vous puissiez l'utiliser dans vos projets personnels une fois les prérequis remplis.
:::

```typescript [src/composables/useIAP.ts]
import { Purchases, PurchasesOffering } from '@revenuecat/purchases-capacitor'
import { ref, toRaw } from 'vue'

export function useIAP() {
  const offering = ref<PurchasesOffering | null>(null)
  const isPremium = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ── Charger l'offre active ────────────────────────────────────
  /**
   * Récupère l'Offering "default" configurée dans RevenueCat.
   * Contient les packages à proposer (mensuel, annuel, etc.).
   */
  async function loadOffering(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const result = await Purchases.getOfferings()
      offering.value = result.current ?? null
    } catch (e: any) {
      error.value = e?.message ?? 'Impossible de charger les offres'
    } finally {
      isLoading.value = false
    }
  }

  // ── Vérifier le statut premium ───────────────────────────────
  /**
   * Vérifie si l'utilisateur a un accès premium actif.
   * À appeler au démarrage de l'app et après chaque achat.
   * "premium" est l'identifiant de l'entitlement dans RevenueCat.
   */
  async function checkPremiumStatus(): Promise<void> {
    try {
      const { customerInfo } = await Purchases.getCustomerInfo()
      isPremium.value = customerInfo.entitlements.active['premium'] !== undefined
    } catch (e: any) {
      console.warn('[IAP] Impossible de vérifier le statut premium :', e)
    }
  }

  // ── Acheter un package ───────────────────────────────────────
  /**
   * Déclenche l'achat d'un package (abonnement ou achat unique).
   * toRaw() est nécessaire pour éviter que Vue passe un Proxy à Capacitor.
   */
  async function purchasePackage(packageToPurchase: any): Promise<boolean> {
    isLoading.value = true
    error.value = null
    try {
      const { customerInfo } = await Purchases.purchasePackage({
        aPackage: toRaw(packageToPurchase)
      })
      isPremium.value = customerInfo.entitlements.active['premium'] !== undefined
      return isPremium.value
    } catch (e: any) {
      if (e?.code !== 'PURCHASE_CANCELLED') {
        error.value = e?.message ?? 'Erreur lors de l\'achat'
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  // ── Restaurer les achats ─────────────────────────────────────
  /**
   * OBLIGATOIRE sur iOS : Apple exige un bouton "Restaurer les achats"
   * dans toute app contenant des achats intégrés.
   */
  async function restorePurchases(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const { customerInfo } = await Purchases.restorePurchases()
      isPremium.value = customerInfo.entitlements.active['premium'] !== undefined
    } catch (e: any) {
      error.value = e?.message ?? 'Impossible de restaurer les achats'
    } finally {
      isLoading.value = false
    }
  }

  return {
    offering,
    isPremium,
    isLoading,
    error,
    loadOffering,
    checkPremiumStatus,
    purchasePackage,
    restorePurchases,
  }
}
```

::: details 🔧 Ce qu'il faut configurer avant de tester

> ⚠️ **Rappel** :
Ces étapes ne permettront pas de tester les achats en local. Le Tab 2 affichera "Aucune offre disponible" tant que tout n'est pas configuré — c'est normal.


**1. Créer un compte RevenueCat**

Rendez-vous sur [app.revenuecat.com](https://app.revenuecat.com) et créez un compte gratuit (GitHub ou email). Créez un **projet**, puis ajoutez une **app** en choisissant Google Play Store ou App Store et en renseignant le package name de votre app (visible dans `android/app/build.gradle`, champ `applicationId`).

RevenueCat vous génère une **clé API publique** — c'est elle qui va dans `main.ts` :

```typescript
await Purchases.configure({
  apiKey: 'appl_XXXXXXXXXXXXXXXX', // votre clé API RevenueCat
})
```

**2. Créer un produit dans le store**

Dans **Google Play Console** (onglet "Monétisation → Abonnements") ou **App Store Connect**, créez un produit et notez son **ID** (ex: `premium_monthly`). Sur iOS, activez aussi la capability **In-App Purchase** dans Xcode.

**3. Relier le produit dans RevenueCat**

Dans votre projet RevenueCat :
1. **Products** → Add product → collez l'ID du produit store
2. **Entitlements** → Create → nommez-le `premium` → associez-y le produit
3. **Offerings** → Create → nommez-la `default` → ajoutez un package → reliez-le au produit

**4. Publier sur la piste de test interne**

Votre app doit être uploadée au moins une fois sur la **piste de test interne** de Google Play pour que la fenêtre de paiement native s'ouvre. Un simple APK signé suffit — l'app n'a pas besoin d'être publique.

Liens utiles : [Dashboard RevenueCat](https://app.revenuecat.com) · [Google Play Console](https://play.google.com/console) · [App Store Connect](https://appstoreconnect.apple.com) · [Doc RevenueCat Capacitor](https://www.revenuecat.com/docs/getting-started/installation/capacitor)
:::

### B.5.7 — Tab 2 : Écran Paywall (IAP)
```vue [src/views/Tab2Page.vue]
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Premium ⭐</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <div v-if="isLoading" class="ion-text-center ion-padding">
        <ion-spinner />
        <p>Chargement des offres...</p>
      </div>

      <ion-card v-else-if="error" color="danger">
        <ion-card-content>{{ error }}</ion-card-content>
      </ion-card>

      <ion-card v-else-if="isPremium" color="success">
        <ion-card-header>
          <ion-card-title>⭐ Vous êtes Premium !</ion-card-title>
        </ion-card-header>
        <ion-card-content>Vous avez accès à toutes les fonctionnalités.</ion-card-content>
      </ion-card>

      <template v-else-if="offering">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Passer Premium</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>✅ Sans publicité</p>
            <p>✅ Accès illimité au contenu</p>
            <p>✅ Fonctionnalités exclusives</p>
          </ion-card-content>
        </ion-card>

        <ion-list>
          <ion-item
            v-for="pkg in offering.availablePackages"
            :key="pkg.identifier"
            button
            @click="purchasePackage(pkg)"
          >
            <ion-label>
              <h2>{{ pkg.product.title }}</h2>
              <p>{{ pkg.product.description }}</p>
            </ion-label>
            <ion-note slot="end">{{ pkg.product.priceString }}</ion-note>
          </ion-item>
        </ion-list>

        <!-- Obligatoire sur iOS -->
        <ion-button expand="block" fill="clear" @click="restorePurchases">
          Restaurer mes achats
        </ion-button>
      </template>

      <ion-card v-else>
        <ion-card-content class="ion-text-center">
          <p>Aucune offre disponible.</p>
          <p><small>RevenueCat doit être configuré avec un vrai compte et des produits publiés sur le store.</small></p>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel, IonNote, IonSpinner, IonButton
} from '@ionic/vue'
import { useIAP } from '@/composables/useIAP'

const {
  offering, isPremium, isLoading, error,
  loadOffering, checkPremiumStatus, purchasePackage, restorePurchases
} = useIAP()

onMounted(async () => {
  await checkPremiumStatus()
  await loadOffering()
})
</script>
```

Si votre app contient des **achats intégrés (IAP)**, dans le `AndroidManifest.xml` vérifiez également que le `launchMode` de votre Activity est `standard` ou `singleTop`. Avec `singleTask` ou `singleInstance`, certaines méthodes de paiement Google redirigent l'utilisateur vers une app bancaire pour valider — au retour, Android recrée une nouvelle instance de l'activité et l'achat est annulé automatiquement.
```xml
<activity
  android:name="com.yourapp.MainActivity"
  android:launchMode="singleTop" /> <!-- ← ne pas utiliser singleTask avec les IAP -->
```

**3.** Mettez à jour l'**App ID** dans `strings.xml` (Android) et `Info.plist` (iOS).

**4.** Déclarez l'usage d'AdMob dans Google Play Console et App Store Connect.

## 🤝 B.6 — Bonnes pratiques et éthique de la monétisation

Monétiser une application, c'est aussi accepter une **responsabilité envers ses utilisateurs**.

### ✅ À faire
- Toujours afficher le formulaire de consentement RGPD (UMP).
- Respecter les cooldowns et les guidelines officielles de chaque format.
- Proposer une option "supprimer les pubs" (achat non-consommable IAP) si les revenus le permettent.
- Toujours inclure un bouton "Restaurer les achats" si votre app contient des IAP (obligatoire iOS).
- Tester l'expérience avec les yeux d'un vrai utilisateur, pas seulement comme développeur.

### ❌ À ne jamais faire
- Afficher des pubs au lancement de l'app.
- Cacher ou rendre difficile d'accès le bouton "Fermer" d'une interstitielle.
- Générer de faux clics sur vos propres pubs (suspension immédiate et définitive du compte AdMob).
- Diffuser des pubs personnalisées dans une app ciblant les enfants de moins de 13 ans.
- Utiliser des dark patterns pour pousser à l'achat (faux comptes à rebours, faux prix barrés).

> 💬 Google et Apple ont des équipes dédiées à la détection de ces pratiques. Les conséquences vont de la suspension du compte AdMob à la dépublication définitive de l'application.

## 🧩 B.7 — Activité : Ajouter une bannière à votre projet

**🎯 Objectif :** intégrer une bannière de test dans le projet Ionic développé durant l'atelier.

1. Installez `@capacitor-community/admob@8` dans votre projet existant.
2. Faites `npx cap add android` si ce n'est pas encore fait, puis `ionic build` et `npx cap sync`.
3. Configurez `AndroidManifest.xml` et `strings.xml` avec l'App ID de test.
4. Créez le composable `useAdMob.ts` en vous basant sur celui du cours.
5. Ajoutez une bannière sur la page principale — pensez au `margin` si votre app a des tabs.
6. Vérifiez qu'elle s'affiche correctement sur l'émulateur ou votre appareil.

🏆 **Bonus :** ajoutez une interstitielle déclenchée après une action de votre choix, avec un cooldown de 2 minutes.

## 🔗 B.8 — Références et ressources

- [**@capacitor-community/admob — GitHub**](https://github.com/capacitor-community/admob)
- [**Google AdMob — Console**](https://admob.google.com)
- [**Google AdMob — IDs de test officiels**](https://developers.google.com/admob/android/test-ads)
- [**Google AdMob — Guidelines interstitielles**](https://support.google.com/admob/answer/6066980)
- [**Google AdMob — Guidelines bannières**](https://support.google.com/admob/answer/6128877)
- [**Google UMP — Consentement RGPD**](https://support.google.com/admob/answer/10113207)
- [**RevenueCat — Achats intégrés Capacitor**](https://www.revenuecat.com/docs/getting-started/installation/capacitor)
- [**RevenueCat — Quickstart**](https://www.revenuecat.com/docs/getting-started/quickstart)
- [**Politiques AdMob**](https://support.google.com/admob/answer/6128543)
- [**Apple — In-App Purchase**](https://developer.apple.com/in-app-purchase/)
- [**Google Play — Facturation in-app**](https://developer.android.com/google/play/billing)

## 📔 TL;DR
::: details Récapitulatif du chapitre {open}
Ce chapitre bonus couvre la monétisation mobile sous deux angles. Pour la **publicité**, il présente les trois formats AdMob (bannière, interstitielle, rewarded), leurs guidelines officielles Google par format (placement, cooldown, interdictions), et leur implémentation dans un composable `useAdMob.ts` réutilisable incluant la gestion du consentement RGPD. La bannière nécessite un `margin` pour se placer au-dessus de la barre de tabs Ionic. Pour les **achats intégrés (IAP)**, il explique les trois types de produits, le flux d'un achat via le store, et l'implémentation avec RevenueCat (`@revenuecat/purchases-capacitor`) — solution recommandée pour sa gestion unifiée iOS + Android. Les IAP nécessitent une publication sur piste de test store pour être testées. Le projet fil rouge "QuizFlash" intègre les deux approches en deux onglets.
:::
