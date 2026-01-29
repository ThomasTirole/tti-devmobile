# Chapitre 1 : Préparation du projet

## 1.0 Créer le projet
Si vous voulez créer le projet à partir de zéro, exécutez la commande suivante :
```bash
ionic start lightsaber-ionic blank --type=vue --capacitor
```

## 1.1 Installer les dépendances

Il faut installer les plugins **Haptics**, **Status-bar** et **Motion** pour les vibrations, gérer les icônes de statut de l'OS (batterie, etc.) et l'accéléromètre. Installez-les :

```bash
npm install @capacitor/haptics @capacitor/status-bar @capacitor/motion@8
```

## 1.2 Forcer le mode sombre

Notre app aura un fond noir. Ionic fournit plusieurs strategies de dark mode. Ouvrez `src/main.ts` et remplacez la ligne :

```ts
import '@ionic/vue/css/palettes/dark.system.css';
```

par :

```ts
import '@ionic/vue/css/palettes/dark.always.css';
```

`dark.system.css` suit la preference systeme de l'utilisateur, tandis que `dark.always.css` force le theme sombre en permanence, ce qui est exactement ce que nous voulons pour notre app.

## 1.3 Créer le dossier des composables

Creez le dossier qui contiendra notre logique reutilisable :

```bash
mkdir src/composables
```

> Vous y placerez trois fichiers dans les chapitres suivants.
