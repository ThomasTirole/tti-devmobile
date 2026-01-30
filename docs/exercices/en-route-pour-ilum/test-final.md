# Chapitre 9 : Test de l'application

## 9.1 Test dans le navigateur

```bash
npm run dev
```

Ouvrez l'URL affichée dans Chrome. Vous pouvez tester :

1. **Tap sur le bouton power** : la lame s'étend avec le son d'allumage, puis le hum démarre.
2. **Re-tap** : la lame se rétracte avec le son d'extinction.
3. **Changement de couleur** : quand le sabre est éteint, cliquez sur une pastille, puis rallumez.

> Les vibrations ne fonctionneront pas dans le navigateur (c'est normal).

## 9.2 Simuler l'accelerometre

Pour tester la detection de swing sans telephone :

1. Ouvrez Chrome DevTools (`F12`)
2. Allez dans l'onglet **Sensors** (dans le menu `...` > More tools > Sensors)
3. Dans la section **Orientation**, bougez les sliders rapidement

## 9.3 Test sur un appareil Android

```bash
npm install @capacitor/android
npx cap add android
npm run build
npx cap sync android
npx cap open android
```

## 9.4 Scenarios de test sur appareil

| # | Action | Resultat attendu |
|---|--------|-----------------|
| 1 | Tap power | Lame s'etend + son ignite + hum demarre + vibration forte |
| 2 | Secouer le telephone | Son de swing + vibration moyenne |
| 3 | Re-tap power | Lame se retracte + son retract + hum s'arrete + vibration warning |
| 4 | Changer de couleur (sabre eteint) | La pastille selectionnee s'agrandit, le prochain allumage utilise la nouvelle couleur |

---

## Recapitulatif de l'architecture

```
src/
├── main.ts                              # Dark mode force
├── views/
│   └── HomePage.vue                     # Interface + orchestration
└── composables/
    ├── useLightsaberSound.ts            # Web Audio API (sons)
    ├── useHapticFeedback.ts             # Capacitor Haptics (vibrations)
    └── useMotionDetector.ts             # Capacitor Motion (accelerometre)
```

**APIs Capacitor utilisees :**

| Plugin | Usage | Methodes cles |
|--------|-------|---------------|
| `@capacitor/haptics` | Vibrations | `Haptics.impact()`, `Haptics.notification()` |
| `@capacitor/motion` | Accelerometre | `Motion.addListener('accel', ...)` |
| `@capacitor/status-bar` | Barre de statut sombre | `StatusBar.setStyle()`, `StatusBar.setBackgroundColor()` |

Si besoin, vous trouverez le projet final sur le repo suivant : [lightsaber-ionic](https://github.com/divtec-cejef/lightsaber-ionic/tree/solution-improved). N'oubliez pas de bien être sur la branche `solution-improved` et d'installer toutes les dépendances avec `npm install` avant de lancer le projet.
