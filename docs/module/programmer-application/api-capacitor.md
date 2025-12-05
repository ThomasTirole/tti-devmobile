# ⚡ 3.4 Utiliser les API natives avec Capacitor
Ionic est un framework web. Mais grâce à **Capacitor**, vous pouvez accéder à des fonctionnalités **100% natives** : appareil photo, stockage, fichiers, réseau, partage, vibrations, etc.

Capacitor agit comme un **pont** entre votre code Javascript/Vue et les API d'Android / iOS.
Dans ce chapitre, vous apprendrez à utiliser les plugins natifs les plus utiles pour vos projets.

::: warning **🚨 Important 🚨**
Les plugins Capacitor que nous allons voir ici ne sont qu'une sélection parmi les nombreux disponibles. De plus, une sélection de plugins "Community", créés et maintenus par la communauté, est également disponible.

Il est important de noter que certains plugins natifs peuvent nécessiter des configurations supplémentaires dans les projets Android/iOS. Assurez-vous de consulter la documentation officielle de Capacitor pour chaque plugin que vous utilisez afin de garantir une intégration correcte.
Pour plus d'informations : [Documentation officielle des plugins Capacitor](https://capacitorjs.com/docs/plugins)
:::

## 📘 3.4.1 Qu'est-ce que Capacitor ?
Capacitor est la couche qui permet à une applicaiton Ionic :
- d'être affichée dans une WebView native (Android/iOS) ;
- mais aussi d'accéder aux fonctionnalités natives,
- de générer des projets Android/iOS automaiquement,
- d'utiliser des plugins écrits en Swift (iOS) et Kotlin/Java (Android).
- tout en restant 100% **en JavaScript/TypeScript** côté développeur.

_Son rôle est simple :_
![capacitor-ionic.png](/3.4/capacitor-ionic.png)

### Capacitor vs Cordova

Capacitor est le successeur moderne de Cordova :

| Feature         | Cordova                          | Capacitor                      |
|-----------------|----------------------------------|--------------------------------|
| Architecture    | Ancienne                         | Moderne                        |
| Plugins         | Très nombreux mais vieillissants | Plugins officiels + support TS |
| Intégration web | Moyenne                          | Excellente                     |
| Maintenance     | Faible                           | Très active                    |
| Web-first       | ❌                                | ✔️                             |

> **👉 Capacitor est l'outil recommandé aujourd'hui pour toutes les apps Ionic.**

::: danger 
AJOUTER INSTALLER CAPACITOR à UN PROJET EXISTANT OU CREER UN NOUVEAU PROJET CAPACITOR
:::

## 🗃️ 3.4.2 Structure d'un projet avec Capacitor
Une fois votre projet créé, vous retrouverez :
```
my-app/
├─ android/           # Projet Android natif (Kotlin/Java)
├─ ios/               # Projet iOS natif (Swift)
├─ src/               # Votre app Vue/Ionic
├─ capacitor.config.ts # Config Capacitor
└─ package.json
```

Les commandes importantes :
```
ionic cap sync
ionic cap open android
ionic cap open ios
ionic cap run android --livereload
```

### Cycle typique de développement mobile
1. Vous modifiez votre code Ionic-Vue
2. Vous faites :
```
ionic build
ionic cap sync
```
> `ionic build` génère les fichiers web dans `www/`  
> `ionic cap sync` copie ces fichiers dans les projets natifs Android/iOS
3. Vous ouvrez le projet natif :
```
ionic cap open android
```
> `ionic cap open android` : ouvre Android Studio  
> `ionic cap open ios` : ouvre Xcode
4. Vous lancez l'app sur un émulateur ou un téléphone réel.
> 📝 Vous pouvez très bien travailler 90% du temps avec `ionic serve`, puis passer au natif pour tester les APIs.


