# 📥 Procédure de génération et installation de l'APK

## Partie 1 : Génération de l'APK

### Prérequis

- Node.js installé
- Android Studio installé avec le SDK Android
- Le projet SpotFinder cloné/téléchargé

### Étapes de génération

#### 1. Installer les dépendances

```bash
cd broken-app
npm install
```

#### 2. Compiler l'application web

```bash
npm run build
```

#### 3. Synchroniser avec Android

```bash
npx cap sync android
```

#### 4. Ouvrir dans Android Studio

```bash
npx cap open android
```

Ou ouvrir Android Studio manuellement et sélectionner le dossier `android/` du projet.

#### 5. Générer l'APK dans Android Studio

1. Attendre que Gradle synchronise le projet (peut prendre plusieurs minutes)
2. Menu : **Build** → **Generate App Bundles or APKs** → **Generate APKs**
3. Attendre la fin de la compilation
4. Cliquer sur **locate** dans la notification en bas à droite

L'APK se trouve dans :
```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### 6. Renommer l'APK (optionnel)

Renommer `app-debug.apk` pour plus de clarté.

## Partie 2 : Installation sur appareil physique

#### 1. Préparer le téléphone

1. Aller dans **Paramètres** → **À propos du téléphone**
2. Appuyer 7 fois sur **Numéro de build** pour activer les options développeur
3. Retourner dans **Paramètres** → **Options pour les développeurs**
4. Activer **Débogage USB**

#### 2. Transférer l'APK

1. Connecter le téléphone à l'ordinateur via USB
2. Sur le téléphone, sélectionner **Transfert de fichiers**
3. Copier le fichier `.apk` dans le dossier **Download** du téléphone

#### 3. Installer l'APK

1. Sur le téléphone, ouvrir l'application **Fichiers** (ou gestionnaire de fichiers)
2. Naviguer vers **Download**
3. Appuyer sur le fichier `.apk`
4. Si demandé, autoriser l'installation depuis cette source
5. Appuyer sur **Installer**

## Partie 3 : Installation sur émulateur Android Studio

### Méthode A : Glisser-déposer (la plus simple)

1. Ouvrir Android Studio
2. Lancer un émulateur (AVD Manager → Play sur un appareil virtuel)
3. Attendre que l'émulateur démarre complètement
4. **Glisser-déposer** le fichier `SpotFinder.apk` sur la fenêtre de l'émulateur
5. L'installation se fait automatiquement

### Méthode B : Via ADB (ligne de commande)

#### 1. Lancer l'émulateur

Depuis Android Studio : **Tools** → **Device Manager** → **Play** sur un appareil

Ou en ligne de commande :
```bash
emulator -avd Pixel_6_API_33
```

(Remplacer `Pixel_6_API_33` par le nom de votre AVD)

#### 2. Vérifier la connexion

```bash
adb devices
```

Devrait afficher quelque chose comme :
```
List of devices attached
emulator-5554   device
```

#### 3. Installer l'APK

```bash
adb install chemin/vers/SpotFinder.apk
```

Exemple Windows :
```bash
adb install C:\Users\tirotho\Downloads\SpotFinder.apk
```

Exemple Mac/Linux :
```bash
adb install ~/Downloads/SpotFinder.apk
```

#### 4. Lancer l'application

L'application apparaît dans le menu des applications de l'émulateur.

## Partie 4 : Dépannage

### "Installation bloquée" ou "Source inconnue"

Sur l'appareil :
1. **Paramètres** → **Sécurité** (ou **Applications**)
2. Activer **Sources inconnues** ou **Installer des apps inconnues**
3. Autoriser le navigateur ou le gestionnaire de fichiers

### "L'application n'est pas installée"

Causes possibles :
- Version Android trop ancienne (minimum : Android 6.0)
- Espace de stockage insuffisant
- APK corrompu → re-télécharger

### ADB non reconnu

Ajouter le chemin du SDK Android aux variables d'environnement :
- Windows : `C:\Users\[USER]\AppData\Local\Android\Sdk\platform-tools`
- Mac : `~/Library/Android/sdk/platform-tools`

### L'émulateur est très lent

- Activer l'accélération matérielle (HAXM sur Intel, Hyper-V sur Windows)
- Allouer plus de RAM à l'émulateur
- Utiliser un appareil physique si possible



## Résumé des commandes

```bash
# Génération
npm install
npm run build
npx cap sync android
npx cap open android
# Puis Build > Build APK dans Android Studio

# Installation sur émulateur (ADB)
adb devices
adb install SpotFinder.apk

# Désinstallation si besoin
adb uninstall com.spotfinder.app
```
