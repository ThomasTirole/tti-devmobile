# 🔍 5.2 Vérifier les exigences non fonctionnelles d'une application mobile

Une application mobile peut parfaitement fonctionner d'un point de vue fonctionnel, tout en offrant une **mauvaise expérience globale**.

L'utilisateur arrive à effectuer les actions prévues, mais l'application est lente, peu lisible, instable ou peu agréable à utiliser.

Les **exigences non fonctionnelles** permettent d'évaluer la **qualité globale** d'une application mobile. Elles répondent à une question différente de celle du chapitre précédent :
> **_Comment l'application se comporte-t-elle dans des conditions réelles d'utilisation ?_**

## 🎯 Objectifs d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- expliquer ce que sont des **exigences non fonctionnelles** ;
- identifier les principaux **critères de qualité** d'une application mobile ;
- comprendre l'importance de la **portabilité**, de l'ergonomie et des performances ;
- tester une application dans des **conditions réelles d'utilisation** ;
- analyser les risques liés à la **sécurité et à la gestion des données** ;
- formuler des **propositions d'amélioration** basées sur des observations concrètes.

## 🤔 5.2.1 Qu'est-ce qu'une exigence non fonctionnelle ?
Une exigence non fonctionnelle décrit **comment** une application doit se comporter, et non **ce qu'elle doit faire**.

Elle ne correspond pas à une action précise, mais à une **qualité attendue**.

Exemples d'exigences non fonctionnelles :
- l'application doit rester fluide ;
- l'interface doit être lisible sur différents écrans ;
- les données doivent être stockées de manière sécurisée ;
- l'application ne doit pas planter lors d'une interruption.

Sur mobile, ces exigences sont particulièrement importantes, car les utilisateurs sont :
- souvent en déplacement ;
- soumis à des interruptions fréquentes ;
- peu tolérants aux lenteurs ou aux dysfonctionnements.

## 📱 5.2.2 Tests de portabilité
La portabilité consiste à vérifier que l'application fonctionne correctement sur **différents appareils et environnements**.

Une application mobile peut se comporter différemment selon :
- la taille d'écran ;
- la résolution ;
- les performances matérielles ;
- l'OS
- la version du système.

Les tests de portabilité permettent de vérifier que :
- l'interface reste lisible sur un petit comme un grand écran ;
- les éléments ne débordent pas ou ne se chevauchent pas ;
- l'application s'adapte correctement à l'orientation portrait ou paysage (si les deux sont supportées).

> 👉 Tester uniquement sur un appareil n'est jamais suffisant.

## 🖱️ 5.2.3 Tests d'ergonomie et d'expérience utilisateur
Même si la conception de l'interface a déjà été abordée dans un autre module, il est essentiel de **vérifier** que l'ergonomie fonctionne réellement une fois l'application développée. Les tests d'ergonomie consistent à observer :
- la fluidité de la navigation ;
- la clarté des écrans ;
- la facilité à comprendre les actions possibles ;
- la cohérence des gestes tactiles.

Sur mobile, une mauvaise ergonomie se traduit rapidement par :
- des erreurs de manipulation ;
- de la frustration ;
- un abandon de l'application.

> 👉 Une application peut être fonctionnelle, mais inutilisable si son ergonomie est mauvaise.

## ⚡ 5.2.4 Tests de performance et de stabilité

Les performances jouent un rôle majeur dans la perception de qualité d'une application mobile. Les tests relatifs à la performance vise à vérifier :
- le temps de chargement des écrans ;
- la fluidité des animations ;
- la réactivité des interactions ;
- la stabilité générale de l'application.

::: warning 🚨
Une application lente ou instable consomme plus de ressources, dégrade l'expérience utilisateur et génère des avis négatifs ! 
:::

Il est également important de vérifier que l'application **ne plante pas lors d'une utilisation prolongée** et gère correctement **les erreurs inattendues**.

## 🔐 5.2.5 Tests de sécurité (niveau introductif)
Même sans entrer dans un audit de sécurité approfondi, certaines vérifications de base sont indispensables.

Les tests de sécurité consistent notamment à vérifier :
- que les permissions demandées sont justifiées ;
- que les données sensibles ne sont pas exposées inutilement ;
- que le stockage local est utilisé de manière appropriée ;
- que l'authentification (si présente) est sécurisée et fonctionne correctement.

Sur mobile, une application qui semble intrusive ou peu transparente perd rapidement la confiance des utilisateurs, ce qui peut entraîner un désintérêt ou un désabonnement. D'autant plus dans notre époque actuelle avec toutes les législations sur la protection des données (RGPD, nlPD, ...)

> 👉 La sécurité participe directement à la qualité perçue de l'application.

## 🌐 5.2.6 Tests en conditions réelles d'utilisation
Une application mobile est rarement utilisée dans des conditions idéales. Il est donc essentiel de la tester dans des situations réalistes.

Cela inclut notamment :
- un réseau lent ou instable ;
- une perte temporaire de connexion ;
- une interruption de l'application (appel, notification) ;
- une mise en veille du téléphone ;
- une reprise après interruption.

Les tests en conditions réelles permettent de vérifier que :
- l'application ne se bloque pas ;
- les données ne sont pas perdues ;
- l'expérience reste cohérente malgré les contraintes.

## 🧠 5.2.7 Synthèse et bonnes pratiques
Pour conclure, il est important de retenir que :
- les exigences non fonctionnelles influencent fortement la satisfaction utilisateur ;
- elles doivent être testées tout au long du développement ;
- une application de qualité est une application **fonctionnelle**, **stable**, **agréable à utiliser** et **fiable** dans des conditions réelles.

::: tip ☝️🤓
Tester ces aspects permet d'améliorer la **durabilité** et la **crédibilité** d'un projet mobile
:::

## 🧪 5.2.8 Activité pratique – Tests non fonctionnels

À partir d’une application mobile (réelle ou fictive), vous devez :

* analyser la portabilité de l’application ;
* évaluer son ergonomie ;
* observer ses performances générales ;
* identifier d’éventuels problèmes non fonctionnels ;
* proposer des améliorations concrètes.

Ce travail vise à développer un **regard critique** sur la qualité d’une application mobile.

## 🔗 5.2.9 Sources et références

* [Android Developers – App quality](https://developer.android.com/docs/quality-guidelines)
* [Apple Developer – Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
* [OWASP – Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)
* [ISO/IEC 25010 – Software quality model](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010)

