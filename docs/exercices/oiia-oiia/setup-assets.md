# Chapitre 4 — Preparation des assets

Vous avez besoin de trois fichiers à placer dans le dossier `public/` :

| Fichier          | Role                                                                         |
|------------------|------------------------------------------------------------------------------|
| `cat_static.png` | Image du chat affichée quand l'utilisateur ne tourne pas                     |
| `cat_spin.gif`   | GIF anime du chat qui tourne (optionnel — sinon on utilise une rotation CSS) |
| `oiia.mp3`       | Son "oiia oiia" joue en boucle pendant la rotation                           |

Placez-les directement dans `public/` :

```
public/
├── cat_static.png
├── cat_spin.gif
├── oiia.mp3
└── favicon.png
```

Les fichiers dans `public/` sont servis tels quels à la racine de l'app. Un fichier `public/oiia.mp3` devient accèssible via l'URL `/oiia.mp3` dans votre code.

> **Astuce** : si vous n'avez pas encore les vrais assets, l'app fonctionnera quand meme — l'image sera simplement absente et l'audio silencieux. Vous pouvez aussi utiliser une rotation CSS sur l'image statique au lieu d'un GIF (voir la config `USE_GIF` au chapitre 6).
