# 🎨 1.2 Les standards ergonomiques et l'expérience utilisateur

<iframe src="https://slides.com/tirtho/1-2-les-standards-ergonomiques-et-l-experience-utilisateur/embed" width="576" height="420" title="🎨 1.2 Les standards ergonomiques et l'expérience utilisateur" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## 🎯 Objectif d'apprentissage
À la fin de ce chapitre, vous serez capable :
- Expliquer ce qu'est un **standard ergonomique** et pourquoi il est essentiel dans la conception mobile.
- Décrire les **principes de la norme EN ISO 9241-110**.
- Identifier les **principes fondamentaux de l'UX/UI mobile**.
- Appliquer des bonnes pratiques d'ergonomie dans la conception d'interfaces.

## 📖 1.2.1 Introduction à l'ergonomie mobile
L'**ergonomie** désigne l'ensemble des principes visant à **adapter un système à ses utilisateurs** afin qu'il soit facile, efficace et agréable à utiliser. 
En d'autres termes, une interface ergonomique permet d'accomplir une tâche **rapidement**, **sans effort inutile**, et **sans frustration**.

Sur mobile, cette notion est particulièrement importante :
- L'écran est **petit** ; chaque pixel compte !
- L'utilisateur est souvent **en mouvement** ; son attention est donc limitée.
- Les interactions se font par **tactile**, parfois dans des contextes bruyantes, instables ou lumineux.

> 💬 **Différence entre ergonomie et esthétique**
> 
> Une application peut être visuellement superbe... mais difficile à utiliser. À l'inverse, une interface simple et sobre peut offrir une excellente expérience utilisateur.

::: details **💡 Exemple concret** {open}
Pensez à une application de messagerie : pour être ergonomique, elle doit permettre d'envoyer un message en **moins de trois actions** (ouvrir, taper, envoyer).
Si l'utilisateur doit naviguer dans plusieurs menus avant de trouver le champ de texte, l'application échoue sur le plan ergonomique.
:::

::: danger **🎯 Objectif**
Vous devez apprendre à concevoir des interfaces qui **s'adaptent à l'humain**, et non l'inverse !
:::

## 📜 1.2.2 La norme NE ISO 9241-110
La norme **EN ISO 9241-110** définit les **principes ergonomiques de base** pour les interfaces homme-machine.
Elle fournit un cadre de référence pour évaluer si une application est réellement **centrée sur l'utilisateur**
Initialement Con*ue pour les logiciels de bureau, elle s'appliquea ujourd'hui pleinement aux applicaitons web et mobiles.

Voici les **7 commandements** de la norme, illustrés par des exemples mobiles :
| Principe                                        | Description                                                                           | Exemple concret                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **1. Conformité aux attentes de l’utilisateur** | L’interface doit se comporter comme prévu selon les conventions connues.              | Les boutons “Retour” et “Partager” sont placés là où les utilisateurs s’y attendent. |
| **2. Auto-descriptivité**                       | Chaque action ou icône doit être compréhensible sans explication supplémentaire.      | Une icône “poubelle” pour supprimer, “cœur” pour aimer, etc.                         |
| **3. Contrôle utilisateur**                     | L’utilisateur doit pouvoir annuler, corriger ou revenir en arrière.                   | Annulation d’un envoi d’email dans Gmail mobile.                                     |
| **4. Conformité à la tâche**                    | L’application doit être adaptée à la manière dont la tâche est réellement effectuée.  | Dans une app de notes, créer une note en un clic sans passer par plusieurs menus.    |
| **5. Tolérance aux erreurs**                    | L’interface doit prévenir les erreurs ou permettre de les corriger facilement.        | “Annuler” après la suppression d’un message, confirmation avant action irréversible. |
| **6. Cohérence**                                | Les éléments similaires doivent avoir le même comportement visuel et fonctionnel.     | Même style de bouton dans toute l’application.                                       |
| **7. Adaptabilité**                             | L’application doit pouvoir s’ajuster au contexte et aux préférences de l’utilisateur. | Mode sombre, taille de texte ajustable, orientation portrait/paysage.                |

::: warning **💡 À retenir**
Ces principes ne sont pas des règles rigides : ils constituent des **repères universels** pour juger si une interface est intuitive, claire et rassurante.
:::

## 🧭 1.2.3 Les grands principes UX/UI sur mobile
L'**UX (User Experience)** et l'**UI (User Interface)** sont deux notions complémentaires :
- L'**UX** s'intéresse **à l'expérience vécue par l'utilisatuer** (utilité, efficacité, émotions).
- L'**UI** concerne **l'aspect visuel et interactif** de l'interface (boutons, typographie, couleurs, icônes).

### 🧠 Objectif commun
Créer une application qui soit à la fois **utile**, **simple**, **cohérente**, et **agréable à utiliser**.

### 🪶 Clarté et hiérarchie visuelle
Une bonne interface hiérarchise les informations pour **guider le regard**.
Les éléments importants doivent être visibles immédiatement : un titre clair, un bouton d'action principal mis en avant, des espacements cohérents.

> 💬 Exemple : sur une app de transport, le bouton "Acheter un billet" est davantage visible que "Historique des voyages".

### 🔁 Cohérence graphique
Les couleurs, icônes et comportements doivent rester identiques d'un écran à l'autre.
Cela évite de "réapprendre" l'interface à chaque navigation.

> 💬 Exemple : si le bouton de validation est vert sur un écran, il ne doit pas être rouge ailleurs.

### ⚡ Feedback immédiat
Chaque action de l'utilisateur doit déclencher une réaction visuelle, sonore ou haptique :
- Animation de chargement,
- Message ou notification de confirmation,
- Vibration légère

> 💬 Exemple : une icône qui se coche après l'ajout d'un favori indique que l'action a bien été enregistrée.

### 🔮 Prévisibilité et contrôle
L'utilisateur doit toujours savoir **où il se trouve** et **ce qui va se passer**.
Des transitions douces et des titres d'écran clairs renforcent le sentiment de maîtrise.

> 💬 Exemple : une barre de navigation affichant l'onglet actif ("Accueil", "Profil", "paramètres").

### ️‍ 👁️‍ Accessibilité
Une interface inclusive doit être utilisable par tous, y compris les personnes avec handicaps visuels, auditifs ou moteurs.
Quelques bonnes pratiques :
- Taille de texte ajustable
- Contraste suffisant (WCAG 2.1 : ratio 4:5:1 minimum),
- Éléments tactiles espacées d'au moins **48 px**,
- Compatibilité avec les lecteurs d'écran (VoiceOver, TalkBack). 

> 💬 Exemple : Les boutons "+" et "-" d'une calculatrice doivent être bien esapcés pour éviter les erreurs tactiles.

## 🪧 1.2.4 Les guidelines officielles (Apple & Google)
Les deux principaux écosystèmes mobiles, **Apple** et **Google**, ont chacun défini leurs propres **lignes directrices de conception**.
Ces documents servent de **références mondiales** pour garantir la cohérence et la qualité des applications publiées sur leurs plateformes.

### 🍎 Apple - Human Interface Guidelines (HIG)
Les **Human Interface Guidelines** sont les règles de conceptions définies par Apple pour iOS, iPadOS, watchOS et macOS.
Elles reposent sur une idée simple : **La technologie doit s'effacer au profit de l'expérience**.

**📘Principes clés :**
- **Clarté** : chaque élément doit avoir uen fonction identifiable
- **Déférence** : l'interface doit servir le contenu, sans le distraire
- **Profondeur** : les transitions et mouvements créent du sens et de la hiérarchie
> 🎯 L'objectif est d'obteinr une **interface fluide**, **élégante** et **discrète**, où tout semble *"aller de soi"*.

::: details **💡Exemples concrets :** {open}
- Les boutons sont plats et minimalistes, sans bordures inutiles
- Les animations renforcent la compréhension (glissement, fondu).
- Le geste "Swipe back" permet de revenir en arrière naturellement.
:::


::: tip 🔗 Ressource officielle
👉 [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
:::

### 🤖 Google - Material Design
**Material Design** est le système visuel de Google.
Introduit en 2014, il repose sur la métaphore du **papier et de la lumière**, oû les éléments semblent flotter sur des plans différents.

**📘 Principes clés :**
- **Matérialité** : chaque composant a une "épaisseur" virtuelle et réagit à la lumière.
- **Hiérarchie visuelle** : les ombres et couleurs guident l'attention.
- **Cohérence** : mêmes composants et comportements sur toutes les applications Android.

::: details **💡 Exemples concrets :** {open}
- Le **Floating Action Button (FAB)** pour une action principale (ex : "+ Nouveau").
- L'utilisation **d'ombres progressives** pour indiquer la profondeur.
- Des transitions douces et cohérentes entre les écrans.
> 🎯 L'objectif est d'obtenir une **interface vivante**, **dynamique** et **familière** pour l'utilisateur Android.
:::
> 
::: tip 🔗 Ressource officielle
👉 [Material Design 3 (Google)](https://m3.material.io/)
:::

### ⚖️ Comparaison HIG vs Material Design
| Aspect      | Apple HIG                           | Google Material Design                  |
| ----------- | ----------------------------------- | --------------------------------------- |
| Philosophie | Minimalisme et élégance             | Dynamisme et matérialité                |
| Interaction | Gestes naturels, transitions douces | Animation et ombres pour guider         |
| Ton visuel  | Neutre, lumineux                    | Coloré, structuré                       |
| Flexibilité | Environnement fermé et cohérent     | Environnement ouvert et personnalisable |

::: warning **💡 À retenir**
Chaque système a sa logique propre. En tant que développeur ou designer, vous devez **respecter les conventions du système** sur lequel vous travaillez, afin de ne pas "dépayser" vos utilisateurs.
:::

## 👍 1.2.5 Bonnes pratiques d'ergonomie mobile
Concevoir une interface ergonomique, c'est avant tout **réduire la charge cognitive** de l'utilisateur et **rendre les actions naturelles**.
Voici les principales bonnes pratiques à retenir :

### 🎯 Un objectif par écran
Chaque écran doit avoir une **intention claire** : consulter, acheter, envoyer, etc.
Si plusieurs actions majeures cohabitent, l'utilisateur risque de se perdre.

> 💬 Exemple : Une application bancaire sépare clairement les écrans "Solde", "Paiements" et "Paramètres".

### 🗺️ Navigation simple et cohérente
L'utilisateur doit toujours savoir **où il est et comment revenir en arrière**.
Les menus et boutons doivent être **visibles**, **logiques** et **constants**.

> 💬 Exemple : Une barre de navigation en bas d'écran avec 3 à 5 onglets maximum ("Accueil", "Recherche", "Profil", etc.) favorise la compréhension

### 🗒️ Prioriser le contenu essentiel
Sur mobile, l'espace est limité : il faut aller à l'essentiel.
Les informations les plus importantes doivent être placés **haut de l'écran** et accessibles en un regard.

> 💬 Exemple : Une app météo affiche d'abord la température actuelle avant les prévisions détaillées.

### ⚠️ Messages d'erreurs clairs
Les erreurs doivent être compréhensibles, utiles et réparables.
Préférez :
> "Le mot de passe doit contenir au moins 8 caractères", plutôt que :
> "Erreur 401".

💡 Bonus : proposez toujours une **solution ou un lien direct** pour corriger l'erreur.

### 🧪 Tester, observer, ajuster
Une interface réussie n'est jamais parfaite du premier coup.
Les tests utilisateurs permettent d'identifier les **points de friction** et d'améliorer l'expérience réelle.
> 🎯 Vous verrez dans le chapitre [5.2 - Test non-fonctionnels](module/test/test.md) comment évaluer concrètement l'ergonomie et la satisfaction des utilisateurs.

## 🧩 1.2.6 Activités pédagogiques
### 📝 Exercice 1 - Évaluer l'ergonomie d'une application mobile
Choisissez une application mobile que vous utilisez fréquemment (Instagram, CFF, etc.).
Analyser la selon **trois principes** de la norme **EN ISO 9241-110**.
> ➡️ Quelles forces et faiblesses remarquez-vous ?
> 
> ➡️ L'application respecte-t-elle la cohérence et la tolérance aux erreurs ?

### ⚖️ Exercice 2 - Comparaison iOS / Android
Comparez la **même application** sur un téléphone Android et un iPhone.
> ➡️ Quelles différences d'apparence, d'interaction ou de logique notez-vous ?
> 
> ➡️ Selon vous, laquelle est la plus ergonomique, et pourquoi ?

[//]: # (### 🏋️ Exercice 3 - Améliorer une interface)

[//]: # (On vous montre la capture d'écran d'une application mal conçue : texte miniuscule, boutons trop proches, icônes incompréhensibles.)

[//]: # (> ➡️ Proposez au moins **trois améliorations ergonomiques** précises et justifiées selon les principes étudiés.)

[//]: # ()
[//]: # (💡 **Astuce :** appuyez-vous sur les 7 principes de la norme ISO pour argumenter vos choix.)

## 🔗 1.2.7 - Référence et ressources
- **EN ISO 9241-110:2020** - *Ergonomic principles for human-system interaction*
- **Google Material Design 3** - [https://m3.material.io/](https://m3.material.io/)
- **Apple Human Interface Guidelines** - [https://developer.apple.com/design/human-interface-guidelines/](https://developer.apple.com/design/human-interface-guidelines/)
- **Nielsen Norman Group (NN/g)** - [Ten Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- **W3C - Accessibility Principles** - [https://www.w3.org/WAI/fundamentals/accessibility-principles/](https://www.w3.org/WAI/fundamentals/accessibility-principles/)







## 📔 TL;DR
::: details Récapitulatif du chapitre
Ce chapitre explique l’ergonomie mobile et la norme ISO 9241-110, puis relie UX et UI à des principes concrets. Il compare les guidelines Apple HIG et Google Material Design. Il propose des bonnes pratiques pour concevoir des interfaces claires, cohérentes, accessibles et testables.
:::

