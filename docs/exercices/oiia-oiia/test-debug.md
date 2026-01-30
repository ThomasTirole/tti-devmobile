# Chapitre 8 — Test et debug

## 8.1 Mode debug

Activez l'overlay de debug dans `HomePage.vue` :

```ts
const CONFIG = {
  // ...
  DEBUG: true,   // ← changer a true
};
```

Cela affiche en bas de l'écran le taux de rotation en temps reel et l'état du spin. Utile pour calibrer le seuil.

## 8.2 Test dans le navigateur

```bash
npm run dev
```

L'app s'ouvre dans votre navigateur. Le gyroscope n'est pas disponible sur desktop, donc l'image statique s'affiche sans interaction. C'est suffisant pour vérifier le layout et le style.

## 8.3 Test sur Android

C'est le vrai test. Une fois l'app installée sur votre telephone :

1. Lancez l'app — vous voyez le chat statique sur fond noir.
2. Commencez à tourner sur vous-meme — apres ~150ms le chat commence à tourner et le son démarre.
3. arrêtez-vous — apres ~250ms tout s'arrête et vous revenez au chat statique.

## 8.4 Ajuster les paramètres

Si la detection est trop sensible ou pas assez, modifiez le CONFIG :

```ts
const CONFIG = {
  ROTATION_THRESHOLD: 50,   // baisser (ex: 30) si ca ne détecte pas assez
                             // monter (ex: 80) si ca se declenche trop facilement
  START_DELAY:        150,   // baisser pour un démarrage plus reactif
  STOP_DELAY:         250,   // monter pour éviter les coupures pendant la rotation
};
```

## 8.5 Problèmes courants

| Problème                      | Cause probable                             | Solution                                                                |
|-------------------------------|--------------------------------------------|-------------------------------------------------------------------------|
| Pas de son                    | Fichier `oiia.mp3` manquant dans `public/` | vérifier que le fichier existe et que le chemin dans CONFIG est correct |
| Image absente                 | Fichier PNG/GIF manquant dans `public/`    | vérifier le fichier et le chemin dans CONFIG                            |
| Rien ne se passe en tournant  | Seuil trop élevé                           | Activer `DEBUG: true`, observer le taux, baisser `ROTATION_THRESHOLD`   |
| L'animation clignote          | Seuil trop bas ou <br/> trop courts        | Monter `ROTATION_THRESHOLD` ou `STOP_DELAY`                             |
| Erreur "Motion not available" | Test en navigateur desktop                 | Normal — les capteurs ne sont disponibles que sur mobile                |


## Récapitulatif de l'architecture

```
src/
├── composables/
│   └── useSpinDetector.ts    ← CAPTEUR : detection gyroscope via Capacitor Motion
│                                Expose : isSpinning, rotationRate, start(), stop()
├── views/
│   └── HomePage.vue          ← PAGE : UI + audio + lifecycle
│                                Consomme le composable, gere l'affichage et le son
├── App.vue                   ← RACINE : fullscreen via StatusBar.hide()
├── main.ts                   ← ENTREE : dark mode force, montage Vue
└── router/
    └── index.ts              ← ROUTING : une seule route → HomePage
```

Principe de séparation :

- Le **composable** ne sait rien de l'UI ni de l'audio. Il détecte la rotation, c'est tout.
- La **page** ne sait rien du gyroscope. Elle lit `isSpinning` et réagit.
- Le **App.vue** ne sait rien du contenu. Il configure l'environnement (fullscreen).

C'est le principe de **separation des responsabilités** : chaque fichier fait une seule chose bien.

Si besoin, vous trouverez le projet final sur le repo suivant : [oiia-oiia](https://github.com/ThomasTirole/oiia-oiia/tree/solution). N'oubliez pas de bien être sur la branche `solution` et d'installer toutes les dépendances avec `npm install` avant de lancer le projet.
