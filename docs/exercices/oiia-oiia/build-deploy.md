# Chapitre 7 — Build et déploiement Android

## 7.1 Build web

Compilez le code Vue/TypeScript en fichiers statiques :

```bash
npm run build
```

Cette commande fait deux choses (voir `package.json`) :
1. `vue-tsc` — vérifie les types TypeScript
2. `vite build` — compile et bundle le code dans le dossier `dist/`

## 7.2 Sync vers Android

Copiez le build web dans le projet Android natif :

```bash
npx cap sync android
```

Cette commande :
1. Copie le contenu de `dist/` vers `android/app/src/main/assets/public/`
2. Met a jour les plugins Capacitor dans le projet Gradle
3. génère le fichier `capacitor.config.json` pour Android

> **Important** : il faut relancer `npx cap sync` a chaque fois que vous modifiez le code web ou ajoutez/mettez a jour un plugin Capacitor.

## 7.3 Ouvrir dans Android Studio

```bash
npx cap open android
```

Cette commande ouvre le projet dans Android Studio. Depuis là, vous pouvez :

- Connecter votre telephone Android en USB
- Lancer l'app avec le bouton "Run" (fleche verte)
- Ou générer un APK via **Build > Build Bundle(s) / APK(s)**

> **Prérequis** : Android Studio doit être installe avec le SDK Android. Votre telephone doit avoir le **mode développeur** et le **débogage USB** actives.

## 7.4 Commande rapide pour itérer

Pendant le développement, vous répéterez souvent ce cycle :

```bash
npm run build && npx cap sync android
```

Puis relancez l'app depuis Android Studio.
