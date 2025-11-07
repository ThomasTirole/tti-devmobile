# 🪪 2.1 Typologie des applications mobiles

## 🎯 Objectif d’apprentissage
À la fin de ce chapitre, vous serez capables de :
- Comprendre pourquoi il existe plusieurs **types d’applications mobiles**.
- Distinguer les approches **natives**, **web**, **hybrides** et **cross-plateformes**.
- Identifier les **forces**, **limites** et **contextes d’usage** de chacune.
- Expliquer comment le choix d’une technologie influence la **performance**, la **maintenance** et le **coût** d’un projet mobile.

::: details INFO
Selon le référentiel du module, il existe **quatre grands types d’applications** :
1. **Natives** – développées spécifiquement pour Android ou iOS.
2. **Web** – accessibles via un navigateur, sans installation.
3. **Hybrides** – des applications web encapsulées dans un conteneur natif (WebView).
4. **Cross-plateformes** – un seul code source compilé pour plusieurs systèmes (ex. Flutter, React Native).

💡 Les approches hybrides ont servi de **transition historique** vers les solutions cross-plateformes modernes.  
Aujourd’hui, des frameworks comme **Ionic** utilisent encore des bases web (héritées du modèle hybride), tout en intégrant des outils natifs grâce à **Capacitor**.
:::


## 🤔 2.1.1 Pourquoi plusieurs types d'applications ?
L’univers mobile ne repose pas sur un seul système d’exploitation, mais sur plusieurs plateformes majeures : **iOS**, **Android**, et dans une moindre mesure, le **Web mobile**.  
Chaque **environnement** possède ses propres **outils**, **langages**, **règles de sécurité** et **méthodes de publication**.

Face à cette diversité, les entreprises et les développeurs se posent une question essentielle :

> _Comment développer une application qui atteigne tous les utilisateurs sans multiplier les coûts, les efforts et les délais ?_

C’est cette recherche d’équilibre entre **performance**, **coût** et **accessibilité** qui a conduit à l’émergence de **plusieurs approches techniques**, chacune répondant à un besoin spécifique :

- Le **développement natif**, pour des performances et une intégration système optimales.
- Le **développement web**, pour une compatibilité universelle et des mises à jour instantanées.
- Les **applications hybrides**, qui encapsulent une application web dans un conteneur natif.
- Les **solutions cross-plateformes**, qui permettent de compiler une même base de code pour plusieurs systèmes d’exploitation.

::: warning 💡 À retenir
Il n’existe pas de “meilleure” approche universelle : le bon choix dépend toujours du **contexte du projet**, des **objectifs**, du **budget** et du **public cible**.
:::

::: danger
exercice ou on doit analyser un marché etc par exemple je mets un pays avec un certain OS et je demande aux étudiants de choisir le type d'application le plus adapté et justifier avec leur analyse
:::


## 📱 2.1.2 Les applications natives
Les **applications natives** sont développées spécifiquement pour un **système d’exploitation donné**.  
Elles utilisent les **langages officiels** et les **outils fournis par les créateurs de la plateforme** :

- Pour **Android**, le développement se fait en **Java** et **Kotlin**, à l’aide d’**Android Studio**.
- Pour **iOS**, il se fait en **Swift** ou **Objective-C**, dans **Xcode**.

Les applications natives sont **compilées pour chaque système d’exploitation** et publiées sur les **stores officiels** (Google Play, App Store).  
Elles interagissent directement avec les **API du système** et exploitent pleinement les **capacités matérielles** du téléphone : appareil photo, GPS, Bluetooth, gyroscope, notifications, biométrie, etc.

Grâce à cette intégration complète, elles offrent une **performance maximale**, une **fluidité irréprochable** et une **expérience utilisateur parfaitement cohérente** avec le reste du système.

::: details **💡 Exemples concrets** : {open}
Des applications telles que **WhatsApp**, **TikTok** ou **Instagram** sont développées en natif.  
Elles ont besoin d’un accès complet aux capteurs (caméra, micro, stockage) et doivent gérer des animations complexes avec une grande réactivité.
:::

Cependant, cette qualité a un prix : développer une application native pour Android **et** iOS signifie maintenir **deux bases de code distinctes**, écrites dans des langages différents.  
Cela implique deux équipes de développement, des tests séparés et des coûts plus élevés.

> 💬 En résumé, le développement natif reste le choix privilégié lorsque la **performance**, la **stabilité** et la **qualité d’intégration** priment sur le **budget** et le **temps de développement**.

::: danger
prévoir un petit schéma “architecture native” avec OS / API / App pour visualiser la différence
:::

## 🌐 2.1.3 Les applications web mobiles
Les **applications web mobiles** ne s’installent pas depuis un store : elles s’exécutent directement dans le **navigateur** (Chrome, Safari, Firefox, Edge, etc.).  
Elles sont développées avec les langages standards du web : **HTML**, **CSS** et **JavaScript**.

Leur principal atout réside dans leur **universalité** : un seul site peut être consulté depuis n’importe quel appareil, quelle que soit sa marque ou son système d’exploitation.  
Il suffit d’une **connexion Internet** et d’un navigateur moderne.

Les applications web offrent plusieurs avantages :
- un **développement rapide**, avec des coûts réduits ;
- des **mises à jour instantanées**, sans téléchargement ;
- une **compatibilité multi-appareils** (ordinateur, tablette, smartphone).

Mais elles présentent aussi certaines limites :
- elles dépendent d’une **connexion stable** ;
- leur **accès aux capteurs** (appareil photo, GPS, stockage local) reste **limité**, même si des APIs web modernes (*Web Bluetooth, WebUSB, WebRTC, Geolocation API*) élargissent peu à peu les possibilités ;
- leur performance est généralement **inférieure** à celle des applications natives.

::: details **💡 Exemples concrets** : {open}
Des plateformes comme **Twitter Web**, **Wikipedia Mobile** ou certaines **applications bancaires consultables via navigateur** illustrent ce type d’approche.  
Elles offrent une expérience fluide pour la consultation d’informations, mais moins adaptée aux interactions complexes ou aux jeux.
:::

---

### 🚀 Focus : les Progressive Web Apps (PWA)

Pour dépasser les limites des applications web classiques, les **Progressive Web Apps (PWA)** combinent les avantages du web et ceux du mobile.  
Elles utilisent les mêmes technologies (HTML, CSS, JavaScript), mais s’enrichissent de fonctionnalités natives grâce à des APIs modernes et à un cache local géré par le navigateur.

Une PWA peut :
- être **installée** sur l’écran d’accueil comme une application classique ;
- fonctionner **hors ligne** grâce au cache local (*Service Worker*) ;
- envoyer des **notifications push** ;
- s’exécuter **en plein écran**, sans barre d’adresse.

> 💬 Les PWA comblent le fossé entre le web et le mobile, tout en restant économiques à développer et faciles à maintenir.

::: details **💡 Exemple concret** : {open}
**Starbucks** propose une PWA permettant de consulter le menu, passer des commandes et accumuler des points de fidélité, même avec une connexion intermittente.  
Cette version PWA pèse **99 % de moins** que l’application native, tout en offrant une expérience très similaire.
:::

::: tip 🕹️ Essayez par vous-même !
1. Ouvrez le navigateur natif de votre smartphone.
2. Allez sur le site de Starbucks : [https://www.starbucks.com](https://www.starbucks.com)
3. Cliquez sur “Partager” puis “Ajouter à l’écran d’accueil”.
4. Lancez l’application depuis votre écran d’accueil : vous venez d’installer une PWA !  
:::

::: danger
faire un GIF de démonstration
:::

## 💻 2.1.4 Les applications hybrides
Les **applications hybrides** ou **cross-plateformes** cherchent à combiner les avantages des applications web et des applications natives.  
Elles reposent sur une **base de code web** (HTML, CSS, JavaScript) mais sont **encapsulées** dans un conteneur natif qui leur permet d’être installées depuis un store (Google Play ou App Store).

Techniquement, une application hybride fonctionne comme une page web affichée à l’intérieur d’un “navigateur embarqué”, appelé **_WebView_**.  
Ce composant fait office de passerelle entre le code web et le système d’exploitation.  
Des **ponts natifs** (plugins) permettent d’accéder à certaines fonctionnalités du téléphone — par exemple la caméra, le GPS ou les notifications — sans avoir à écrire du code natif.

::: tip 💬 Exemple avec **Ionic**
Le framework **Ionic**, associé à **Capacitor**, illustre bien ce modèle.  
Il permet de créer une seule application à base de technologies web, puis de la déployer sur **Android**, **iOS**, ou même sur le **web** via un navigateur.  
Grâce à Capacitor, Ionic peut aujourd’hui accéder directement aux capteurs de l’appareil, tout en conservant la souplesse du développement web.
:::

### 👍 Avantages
- **Gain de temps** : un seul code pour plusieurs plateformes.
- **Réutilisation des compétences web** déjà acquises.
- **Publication simplifiée** sur les stores, comme une application native.

### ⚠️ Limites
- **Performance parfois inférieure** : les animations ou les rendus 3D peuvent manquer de fluidité.
- **Expérience utilisateur moins homogène** : certaines différences visuelles persistent selon les systèmes.
- **Dépendance aux plugins** : pour accéder aux capteurs, il faut des extensions spécifiques (et souvent tierces).

> 💬 En résumé : l’approche hybride n’est pas dépréciée, elle a simplement évolué.  
> C’est un bon compromis pour des projets légers ou à budget limité, mais elle montre ses limites dans des applications à forte intensité graphique ou à haut volume d’utilisateurs.

::: details **💡 Exemple concret** : {open}
Les premières versions d’**Instagram**, d’**Uber** et de **Twitter** étaient hybrides avant de migrer vers du natif pour gagner en performance.  
Aujourd’hui encore, de nombreuses **applications métiers** ou **outils internes/éducatifs** utilisent l’approche hybride pour rester **efficaces**, **modernes** et **économiques**.
:::

::: danger
prévoir une illustration simple : schéma du fonctionnement hybride (WebView, pont natif, accès aux APIs)
:::

## ⚛️ 2.1.5 Les applications cross-plateformes
Les **applications cross-plateformes** (ou multiplateformes) représentes aujourd'hui une des approches les plus répandues du développement mobile.
Elles visent à combiner la **performance des applications natives** avec la **productivité d'un code unique** partagé entre plusieurs systèmes d'exploitation.

Le principe est simple : écrire une seule base de code, dans un langage ou un framework spécifique, puis **compiler** cette base pour générer de véritables applications **Android** et **iOS**.
Contrairement aux applications hybrides, les solutions cross-plateformes modernes **ne reposent pas sur une WebView** : elles utilisent des moteurs de rendu capables d'afficher des **composants natifs** ou **quasi-natifs**.

> 💬 En clair : une application cross-plateforme utilise un seul code source, mais son rendu et ses interactions sont résolument natifs, offrant ainsi une expérience fluide et performante à l'utilisateur.

### Principaux frameworks cross-plateformes
| Framework                | Langage principal       | Moteur / Principe                                        | Points forts                                            | Exemples d’applications    |
| ------------------------ | ----------------------- | -------------------------------------------------------- | ------------------------------------------------------- | -------------------------- |
| **Flutter**              | Dart                    | Moteur graphique **Skia** : rend lui-même les composants | Très performant, interface cohérente sur tous les OS    | Google Ads, BMW App        |
| **React Native**         | JavaScript / TypeScript | Utilise les **composants natifs** via un pont JS ↔ Natif | Large communauté, proche du web, bonne performance      | Facebook, Discord, Shopify |
| **.NET MAUI**            | C# / XAML               | Compilation native basée sur l’écosystème .NET           | Idéal pour les projets d’entreprise, compatible Windows | Microsoft Teams, Skype     |
| **Kotlin Multiplatform** | Kotlin                  | Partage la logique métier, interface propre à chaque OS  | Flexible, interopérable avec le natif                   | Netflix, CashApp           |

### 👍 Avantages
- **Un seul code source** pour plusieurs plateformes.
- **Performance proche du natif** grâce à la compilation et au rendu natif.
- **Expérience utilisateur fluide et cohérente** quel que soit l'appareil.
- **Maintenance simplifiée** : une seule base de code à mettre à jour.
- **Communautés et documentation très actives**, notamment pour Flutter et React Native.

### ⚠️ Limites
- **Dépendance au framework** : si Flutter ou React Native évoluent, il faut suivre leurs mises à jour.
- **Taille de l'application** parfois plus importante qu'en natif pur.
- **Accès partiel à certaines API récentes**, parfois nécessitant du code natif complémentaire.
- **Courbe d'apprentissage** : chaque framework introduit sa propre logique (Dart, C#, JSX, etc.).

> 💬 En résumé : les frameworks cross-plateformes modernes consistuent aujourd'hui **le meilleur compromis entre performance, rapidité et coût**. 
> Ils permettent de créer des applications **multisystèmes performantes**, tout en réduisant la duplication du travail et les coûts de maintenance.

::: danger
prévoir une illustration simple : schéma “un code → plusieurs plateformes (Android / iOS / Web)”
:::


