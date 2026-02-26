# 💰 Bonus — Monétiser une application mobile avec Ionic

> ⚠️ **Chapitre hors scope du module**, proposé en bonus pour les plus curieux. Il ne fait pas partie des objectifs évalués, mais reflète la réalité du marché et vous permettra de mettre en place une monétisation dans vos projets personnels.

<iframe src="https://slides.com/tirtho/bonus-monetisation-ionic/embed" width="576" height="420" title="💰 Bonus — Monétiser une application mobile avec Ionic" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

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

## B.1 — Les modèles de monétisation mobiles

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

## B.2 — La publicité mobile avec Google AdMob

### 📱 B.2.1 Qu'est-ce qu'AdMob ?

**Google AdMob** est la régie publicitaire mobile de Google, et la plus utilisée dans le monde. Elle sert d'intermédiaire entre les **annonceurs** (qui veulent diffuser leurs pubs) et les **développeurs** (qui veulent monétiser leur app).

En tant que développeur, vous :
1. créez une **unité publicitaire** dans la console AdMob ;
2. intégrez le **SDK AdMob** dans votre app ;
3. recevez des **revenus** à chaque impression ou clic (CPM / CPC).

> 💬 Exemple : pour 1 000 impressions d'une bannière, vous touchez en moyenne entre 1€ et 3€ selon la région et la thématique de l'app. Les pubs vidéo rewarded rapportent généralement beaucoup plus.

### 🎨 B.2.2 Les formats publicitaires

Il existe plusieurs formats, chacun adapté à un contexte précis.

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
- Déclencher une pub susceptible de provoenir d'un **clic accidentel** sur l'interface.

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

> 💬 Les pubs rewarded ont les **meilleurs eCPM** de tous les formats — souvent 5 à 15× plus élevés qu'une bannière — car l'engagement utilisateur est maximal : l'utilisateur a choisi de regarder.

#### 📊 Estimations de revenus publicitaires (2024–2025)

| Format | eCPM moyen (UE/US) | Engagement | Risque UX |
|--------|-------------------|------------|-----------|
| **Bannière** | 1€ – 3€ / 1 000 impressions | Faible | Très faible |
| **Interstitiel** | 5€ – 15€ / 1 000 impressions | Moyen | Élevé si mal placé |
| **Rewarded** | 10€ – 30€ / 1 000 impressions | Très élevé | Nul (volontaire) |

> 💬 Ces valeurs sont indicatives et varient selon la région, la thématique de l'app et la qualité de l'audience. Un utilisateur européen ou nord-américain génère en moyenne 5 à 10× plus de revenus qu'un utilisateur d'Asie du Sud-Est.

## B.3 — Les achats intégrés (In-App Purchases)

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

### ⚙️ B.3.4 Implémenter les IAP avec RevenueCat

Pour Ionic + Capacitor, la solution la plus fiable et la plus utilisée en production est **RevenueCat**. C'est un service qui abstrait les APIs de facturation d'Apple et Google en une API unifiée.

#### Pourquoi RevenueCat ?

| Sans RevenueCat | Avec RevenueCat |
|-----------------|-----------------|
| Deux APIs différentes (StoreKit iOS + Billing Android) | Une seule API unifiée |
| Gestion manuelle des receipts et de la validation | Validation automatique côté serveur |
| Pas de tableau de bord analytique | Dashboard : revenus, rétention, MRR, LTV |
| Gestion complexe des abonnements (renouvellement, annulation, grace period) | Gestion entièrement automatique |
| Gratuit | Gratuit jusqu'à 2 500$/mois de revenus gérés |

#### Installation

```bash
npm install @revenuecat/purchases-capacitor
npx cap sync
```

#### Configuration Android

Dans `android/app/src/main/AndroidManifest.xml`, vérifiez que le `launchMode` de votre Activity est `standard` ou `singleTop`. Certaines méthodes de paiement Google redirigent l'utilisateur vers une autre app pour valider — si le `launchMode` est mal configuré, l'achat peut être annulé automatiquement.

```xml
<activity
  android:name="com.yourapp.MainActivity"
  android:launchMode="singleTop" />
```

#### Configuration iOS

Dans Xcode, activez la capability **In-App Purchase** : `Project Target → Capabilities → In-App Purchase`. Sans ça, les appels à RevenueCat échoueront silencieusement sur iOS.

#### Initialisation dans `main.ts`

```typescript
// src/main.ts
import { LOG_LEVEL, Purchases } from '@revenuecat/purchases-capacitor'

const configure = async () => {
  // En développement, activer les logs pour le debug
  await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG })

  await Purchases.configure({
    apiKey:    'votre_cle_revenuecat', // Clé API depuis le dashboard RevenueCat
    appUserID: 'id_utilisateur'        // Optionnel : pour lier à votre système d'auth
  })
}

router.isReady().then(() => {
  app.mount('#app')
  configure()
})
```

::: tip 💡 Note Vue.js importante
Si vous utilisez les wrappers réactifs de Vue (`reactive`, `readonly`), passez les objets bruts — pas les Proxy — aux méthodes Capacitor avec `toRaw()`. C'est un comportement spécifique à Vue 3 qui peut causer des bugs subtils et difficiles à diagnostiquer.
:::

#### Composable `useIAP.ts`

Dans la même logique que le composable AdMob, on encapsule toute la logique IAP :

```typescript
// src/composables/useIAP.ts
import { Purchases, PurchasesOfferings } from '@revenuecat/purchases-capacitor'
import { ref } from 'vue'

export function useIAP() {
  const offerings = ref<PurchasesOfferings | null>(null)
  const isPremium = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ── Charger les offres disponibles ───────────────────────────
  /**
   * Récupère les "Offerings" configurées dans le dashboard RevenueCat.
   * Une Offering est un ensemble de produits à proposer à l'utilisateur
   * (ex: "Mensuel à 2.99€", "Annuel à 19.99€").
   */
  async function loadOfferings(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const result = await Purchases.getOfferings()
      offerings.value = result.offerings
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
      const customerInfo = await Purchases.getCustomerInfo()
      isPremium.value = customerInfo.customerInfo.entitlements.active['premium'] !== undefined
    } catch (e: any) {
      console.warn('[IAP] Impossible de vérifier le statut premium :', e)
    }
  }

  // ── Acheter un package ───────────────────────────────────────
  /**
   * Déclenche l'achat d'un package (abonnement ou achat unique).
   * Ouvre la fenêtre de paiement native du store.
   * @returns true si l'achat est réussi et que l'utilisateur est maintenant premium
   */
  async function purchasePackage(packageToPurchase: any): Promise<boolean> {
    isLoading.value = true
    error.value = null
    try {
      const { customerInfo } = await Purchases.purchasePackage({ aPackage: packageToPurchase })
      isPremium.value = customerInfo.entitlements.active['premium'] !== undefined
      return isPremium.value
    } catch (e: any) {
      // L'utilisateur a annulé → pas une erreur à afficher à l'écran
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
   * Restaure les achats précédents de l'utilisateur (ex : réinstallation de l'app).
   * OBLIGATOIRE sur iOS : Apple exige un bouton "Restaurer les achats" dans toute
   * app contenant des achats intégrés.
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
    offerings,
    isPremium,
    isLoading,
    error,
    loadOfferings,
    checkPremiumStatus,
    purchasePackage,
    restorePurchases,
  }
}
```

#### Exemple de page Paywall

```vue
<!-- src/views/PaywallPage.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Passer Premium ⭐</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/tabs/home">Fermer</ion-button>
        </ion-buttons>
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
        <ion-card-content>
          Vous avez accès à toutes les fonctionnalités.
        </ion-card-content>
      </ion-card>

      <template v-else-if="offerings?.current">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Fonctionnalités Premium</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>✅ Sans publicité</p>
            <p>✅ Accès illimité au contenu</p>
            <p>✅ Fonctionnalités exclusives</p>
          </ion-card-content>
        </ion-card>

        <!-- Packages disponibles (mensuel, annuel, ...) -->
        <ion-list>
          <ion-item
            v-for="pkg in offerings.current.availablePackages"
            :key="pkg.identifier"
            button
            @click="purchase(pkg)"
          >
            <ion-label>
              <h2>{{ pkg.product.title }}</h2>
              <p>{{ pkg.product.description }}</p>
            </ion-label>
            <ion-note slot="end">
              {{ pkg.product.priceString }}
            </ion-note>
          </ion-item>
        </ion-list>

        <!-- Obligatoire sur iOS -->
        <ion-button expand="block" fill="clear" @click="restorePurchases">
          Restaurer mes achats
        </ion-button>
      </template>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel, IonNote, IonSpinner
} from '@ionic/vue'
import { useIAP } from '@/composables/useIAP'

const {
  offerings, isPremium, isLoading, error,
  loadOfferings, checkPremiumStatus, purchasePackage, restorePurchases
} = useIAP()

async function purchase(pkg: any) {
  await purchasePackage(pkg)
}

onMounted(async () => {
  await checkPremiumStatus()
  await loadOfferings()
})
</script>
```

::: details 🔧 Ce qu'il faut configurer dans les stores avant de tester
**Dans Google Play Console :**
1. Créer un abonnement (ou produit) dans l'onglet "Monétisation"
2. Définir un ID de produit (ex: `premium_monthly`)
3. Définir un prix et une période de facturation
4. Publier sur la piste de test interne

**Dans App Store Connect :**
1. Créer un abonnement auto-renouvelable dans "Fonctionnalités → Achats intégrés"
2. Définir un nom localisé, un ID et un prix
3. Activer la capability In-App Purchase dans Xcode

**Dans le dashboard RevenueCat :**
1. Créer un **Product** lié à l'ID de votre produit store
2. Créer un **Entitlement** (ex: `premium`) et y associer ce produit
3. Créer une **Offering** (ex: `default`) avec les packages à proposer à l'utilisateur

> 💬 RevenueCat sert d'intermédiaire : il écoute les événements de facturation des stores, valide les reçus côté serveur, et expose une API unifiée à votre app. Sans lui, vous auriez deux intégrations complètement différentes à maintenir.
:::

## B.4 — Implications pour la publication

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

## B.5 — Mise en pratique : projet AdMob de A à Z

Passons à la pratique ! Nous allons créer un petit projet Ionic-Vue qui démontre les trois formats publicitaires.

> 🎯 **Objectif du projet** : une mini-app "QuizFlash" avec :
> - une **bannière** permanente en bas
> - une **interstitielle** affichée après une transition naturelle (avec cooldown)
> - une pub **rewarded** pour débloquer un indice

### B.5.1 — Créer le projet

```bash
ionic start quizflash-admob tabs --type=vue --capacitor
cd quizflash-admob
```

### B.5.2 — Installer le plugin AdMob

```bash
npm install @capacitor-community/admob@6
npx cap update
```

::: warning ⚠️ Version
Ce chapitre utilise `@capacitor-community/admob@6`, compatible avec Capacitor 6. Pour Capacitor 7, installez `@capacitor-community/admob@7`.
:::

### B.5.3 — Configuration Android

Dans `android/app/src/main/AndroidManifest.xml`, ajoutez à l'intérieur de `<application>` :

```xml
<meta-data
  android:name="com.google.android.gms.ads.APPLICATION_ID"
  android:value="@string/admob_app_id"/>
```

Dans `android/app/src/main/res/values/strings.xml`, ajoutez :

```xml
<string name="admob_app_id">ca-app-pub-3940256099942544~3347511713</string>
```

> 💬 Cet ID est l'**App ID de test officiel** de Google. En production, il sera remplacé par votre propre App ID AdMob.

### B.5.4 — Configuration iOS (si applicable)

Dans `ios/App/App/Info.plist`, ajoutez dans le `<dict>` principal :

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-3940256099942544~1458002511</string>
<key>NSUserTrackingUsageDescription</key>
<string>Cet identifiant sera utilisé pour vous proposer des publicités personnalisées.</string>
```

### B.5.5 — Composable `useAdMob.ts`

Créez `src/composables/useAdMob.ts` :

```typescript
// src/composables/useAdMob.ts
import {
  AdMob,
  BannerAdOptions, BannerAdSize, BannerAdPosition,
  AdOptions, RewardAdOptions,
  AdmobConsentStatus
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
    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
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
      adSize:   BannerAdSize.ADAPTIVE_BANNER, // Format recommandé par Google
      position: BannerAdPosition.BOTTOM_CENTER,
      margin:   0,
    }
    await AdMob.showBanner(options)
  }

  async function hideBanner(): Promise<void> {
    await AdMob.hideBanner()
  }

  async function removeBanner(): Promise<void> {
    await AdMob.removeBanner()
  }

  // ── Interstitiel ──────────────────────────────────────────────
  /**
   * Pré-charge en arrière-plan (à faire avant d'en avoir besoin).
   */
  async function prepareInterstitial(): Promise<void> {
    const options: AdOptions = { adId: AD_IDS.interstitial }
    await AdMob.prepareInterstitial(options)
  }

  /**
   * Affiche l'interstitielle si le cooldown est respecté.
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
    const options: RewardAdOptions = { adId: AD_IDS.rewarded }
    try {
      await AdMob.prepareRewardVideoAd(options)
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

### B.5.6 — Initialiser AdMob dans `main.ts`

```typescript
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IonicVue } from '@ionic/vue'
import { useAdMob } from '@/composables/useAdMob' // [!code ++]

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

### B.5.7 — Page avec les trois formats

```vue
<!-- src/views/Tab1Page.vue -->
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

::: tip 💭 Récap des 3 formats dans ce fichier
- **Bannière** : affichée automatiquement dans `onMounted`, retirée dans `onUnmounted`
- **Interstitiel** : tentée lors d'une transition naturelle (`nextQuestion`), cooldown géré dans le composable
- **Rewarded** : déclenchée uniquement sur action explicite de l'utilisateur (`getHint`)
  :::

### B.5.8 — Tester sur Android

AdMob nécessite un vrai SDK mobile — le navigateur ne suffit pas. Buildez et déployez sur Android :

```bash
ionic build
npx cap sync android
npx cap open android
```

Dans Android Studio, branchez votre téléphone ou lancez un émulateur, puis cliquez sur **Run ▶️**.

::: info ℹ️ Ce que vous devriez voir
- Une **bannière** en bas de l'écran dès l'ouverture
- Une **interstitielle** après plusieurs clics sur "Question suivante" (cooldown de 3 minutes)
- Une **vidéo rewarded** après le clic sur "Obtenir un indice"

Tous ces formats affichent la mention **"Test Ad"** en mode test — c'est tout à fait normal.
:::

### B.5.9 — Passer en production

Quand votre application est prête à être publiée :

**1.** Créez un compte sur [admob.google.com](https://admob.google.com), ajoutez votre application, et créez une unité publicitaire pour chaque format.

**2.** Dans `useAdMob.ts`, passez `IS_TESTING = false` et renseignez vos vrais IDs :

```typescript
const IS_TESTING = false // [!code ++]

const AD_IDS = {
  banner:       'ca-app-pub-XXXXXXXX/XXXXXXXXXX', // [!code ++]
  interstitial: 'ca-app-pub-XXXXXXXX/XXXXXXXXXX', // [!code ++]
  rewarded:     'ca-app-pub-XXXXXXXX/XXXXXXXXXX', // [!code ++]
}
```

**3.** Mettez à jour l'**App ID** dans `AndroidManifest.xml` et `Info.plist` avec votre vrai App ID AdMob.

**4.** Déclarez l'usage d'AdMob dans Google Play Console et App Store Connect.

## B.6 — Bonnes pratiques et éthique de la monétisation

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

1. Installez `@capacitor-community/admob@6` dans votre projet existant.
2. Configurez `AndroidManifest.xml` avec l'App ID de test.
3. Créez le composable `useAdMob.ts` en vous basant sur celui du cours.
4. Ajoutez une bannière sur la page principale de votre application.
5. Vérifiez qu'elle s'affiche correctement sur l'émulateur ou votre appareil.

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
Ce chapitre bonus couvre la monétisation mobile sous deux angles. Pour la **publicité**, il présente les trois formats AdMob (bannière, interstitielle, rewarded), leurs guidelines officielles Google par format (placement, cooldown, interdictions), et leur implémentation dans un composable `useAdMob.ts` réutilisable incluant la gestion du consentement RGPD. Pour les **achats intégrés (IAP)**, il explique les trois types de produits (consommable, non-consommable, abonnement), le flux d'un achat via le store, et l'implémentation avec RevenueCat (`@revenuecat/purchases-capacitor`) — solution recommandée pour sa gestion unifiée iOS + Android. Le projet fil rouge "QuizFlash" illustre les trois formats publicitaires de A à Z.
:::
