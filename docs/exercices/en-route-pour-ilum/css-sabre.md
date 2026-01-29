# Chapitre 3 : Les styles CSS du sabre

Ajoutez le bloc `<style scoped>` a la fin de `HomePage.vue`. Nous allons le detailler section par section.

## 3.1 Scene et fond

```css
<style scoped>
/* Fond noir pour toute la page */
.saber-content {
  --background: #000;
}

/* Conteneur principal : flex vertical, elements alignes en bas */
.saber-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
}
```

`--background` est une variable CSS Ionic qui controle le fond de `ion-content`. On utilise `justify-content: flex-end` pour placer la poignee et le bouton en bas de l'ecran, la lame s'etendant vers le haut.

## 3.2 L'assemblage et la lame

```css
/* ---- Assemblage lame + poignee ---- */

/*
 * Le saber-assembly regroupe la lame et la poignee.
 * Il est en position relative pour que la lame (absolute)
 * se positionne par rapport a lui.
 */
.saber-assembly {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
}

/* La lame solide */
.blade {
  /* Positionnee juste au-dessus de l'assemblage (= au-dessus de la poignee) */
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 8px;
  height: 55vh;
  border-radius: 4px 4px 0 0;
  background: var(--blade-color, #4488ff);
  /* translateX(-50%) centre la lame, scaleY(0) la rend invisible */
  transform: translateX(-50%) scaleY(0);
  transform-origin: bottom center;
  /* Animation fluide avec courbe de Bezier pour un effet "snap" */
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  z-index: 2;
}

/* Quand allumee : la lame atteint sa taille complete */
.blade--on {
  transform: translateX(-50%) scaleY(1);
}

/* Le halo lumineux (meme position, plus large, floute) */
.blade-glow {
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 30px;
  height: 55vh;
  border-radius: 15px 15px 0 0;
  background: var(--blade-color, #4488ff);
  opacity: 0;
  /* Le flou cree l'effet de lueur */
  filter: blur(18px);
  transform: translateX(-50%) scaleY(0);
  transform-origin: bottom center;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
              opacity 0.4s ease;
  will-change: transform, opacity;
  z-index: 1;
}

/* Quand allumee : le halo pulse doucement */
.blade-glow--on {
  transform: translateX(-50%) scaleY(1);
  opacity: 0.6;
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Animation de pulsation du halo */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.75; }
}
```

Quelques points cles :

- **`bottom: 100%`** : positionne le bas de la lame au sommet du `saber-assembly`. Comme la poignee est le seul enfant en flux normal, la lame demarre exactement a la sortie de la poignee. Pas de calcul magique : la lame est toujours collee au manche.
- **`translateX(-50%)`** : combine avec `left: 50%` pour centrer horizontalement la lame, meme si elle est en `position: absolute`.
- **`transform: scaleY()`** plutot qu'une animation de `height` : les transformations CSS sont **accelerees par le GPU**, ce qui garantit une animation fluide a 60fps meme sur mobile. Le `transform-origin: bottom center` fait "pousser" la lame depuis la base (la poignee).

## 3.3 La poignee

```css
/* ---- Poignee ---- */
.hilt {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Embout superieur (emetteur) */
.hilt-top {
  width: 18px;
  height: 20px;
  background: linear-gradient(to bottom, #888, #aaa);
  border-radius: 3px 3px 0 0;
  border: 1px solid #666;
}

/* Corps de la poignee */
.hilt-grip {
  width: 22px;
  height: 100px;
  background: linear-gradient(to right, #555, #777, #555);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-left: 1px solid #444;
  border-right: 1px solid #444;
}

/* Rainures decoratives */
.hilt-ridge {
  width: 24px;
  height: 2px;
  background: #444;
  border-radius: 1px;
}

/* Base de la poignee */
.hilt-pommel {
  width: 26px;
  height: 14px;
  background: linear-gradient(to bottom, #777, #555);
  border-radius: 0 0 4px 4px;
  border: 1px solid #444;
  border-top: none;
}
```

Les `linear-gradient` donnent un aspect metallique a la poignee. Chaque partie a une largeur legerement differente pour creer un profil realiste.

## 3.4 Le bouton power

```css
/* ---- Bouton power ---- */
.power-btn {
  margin-top: 30px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid #444;
  background: #1a1a1a;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  /* Supprime le flash bleu au tap sur mobile */
  -webkit-tap-highlight-color: transparent;
}

/* Effet visuel au moment du tap */
.power-btn:active {
  transform: scale(0.92);
}

/* Etat allume : bordure et glow de la couleur du sabre */
.power-btn--on {
  border-color: var(--btn-color, #4488ff);
  color: var(--btn-color, #4488ff);
  box-shadow: 0 0 20px var(--btn-color, #4488ff);
}
```

## 3.5 Le selecteur de couleur

```css
/* ---- Selecteur de couleur ---- */
.color-picker {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  z-index: 3;
}

.color-swatch {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #333;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.color-swatch:active {
  transform: scale(0.9);
}

/* Pastille selectionnee : bordure blanche + legere lueur */
.color-swatch--active {
  border-color: #fff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  transform: scale(1.15);
}
</style>
```
