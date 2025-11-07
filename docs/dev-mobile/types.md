# Types d’applications mobiles

Il existe plusieurs approches pour créer une application mobile.  
Le choix dépend de critères comme le **budget**, les **compétences disponibles**, la **performance attendue** et l’**accès aux fonctionnalités natives**.

## Les quatre grands types

| Type | Technologies | Avantages | Limites | Exemples d’usage |
|------|--------------|-----------|---------|------------------|
| **Native** | Swift/ObjC (iOS), Java/Kotlin (Android) | - Performance optimale<br>- Accès complet aux API et capteurs<br>- UX fluide adaptée à chaque OS | - Deux développements distincts (iOS/Android)<br>- Coût et temps élevés<br>- Compétences spécialisées requises | Jeux 3D, apps gourmandes, apps critiques |
| **Hybride (WebView)** | HTML, CSS, JS dans un conteneur WebView (ex. Cordova) | - Réutilisation du code web<br>- Développement rapide<br>- Déploiement multi-plateformes | - Performances limitées<br>- UX parfois moins fluide<br>- Accès natif restreint | Prototypes, apps simples de contenu |
| **Cross-platform** | Frameworks modernes (React Native, Flutter, Xamarin, etc.) | - Un seul code pour iOS + Android<br>- Bon compromis performance/UX<br>- Accès aux capteurs via plugins | - Dépendance à un framework externe<br>- Limitations possibles pour des fonctionnalités spécifiques | Applications métiers, e-commerce, réseaux sociaux |
| **PWA (Progressive Web App)** | Web moderne (HTML, CSS, JS, Service Workers) | - Déploiement simple (URL)<br>- Fonctionne offline (cache)<br>- Installation sans store | - Fonctionnalités natives limitées (surtout iOS)<br>- Pas toujours acceptée du grand public | Sites d’actualités, catalogues, outils internes |

## Critères de choix

- **Performance** : animations 3D, jeux → natif recommandé.
- **Budget & équipe** : équipe web → cross-platform ou PWA.
- **Accès matériel** : besoin de Bluetooth, NFC, ARKit → natif.
- **Time-to-market** : cross-platform ou PWA.
- **Distribution** : si besoin d’être sur les stores → natif ou cross-platform.

::: tip
Commencer par une **PWA** peut être une bonne stratégie pour tester un marché ou valider une idée avant d’investir dans une application native.
:::
