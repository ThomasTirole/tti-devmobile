# Chapitre 2 : Le template HTML du sabre

Ouvrez `src/views/HomePage.vue` et remplacez **tout le contenu du fichier** par ce qui suit. Nous allons construire le fichier section par section, en commencant par le template.

## 2.1 Structure de la page

```vue
<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="false" class="saber-content">
      <div class="saber-scene">

        <!-- L'assemblage lame + poignee (Chapitre 2.2 et 2.3) -->

        <!-- Le bouton power (Chapitre 2.4) -->

        <!-- Le selecteur de couleur (Chapitre 2.5) -->

      </div>
    </ion-content>
  </ion-page>
</template>
```

Quelques points importants :

- Pas de `<ion-header>` : on veut un ecran plein ecran immersif, sans barre de titre.
- `:fullscreen="true"` permet au contenu de s'etendre sous la barre de statut.
- `:scroll-y="false"` desactive le scroll, on ne veut pas que l'utilisateur puisse scroller.
- `saber-scene` sera notre conteneur flex qui organise les elements verticalement.

## 2.2 La lame

La lame et la poignee sont regroupees dans un conteneur `saber-assembly`. Cela permet de positionner la lame en `absolute` par rapport a la poignee avec `bottom: 100%`, de sorte qu'elle est toujours collee juste au-dessus de la poignee, quelle que soit la taille de l'ecran.

Remplacez le premier commentaire par :

```html
        <!-- Assemblage du sabre : lame + poignee groupees -->
        <div class="saber-assembly">
          <!-- La lame solide (rectangle fin et colore) -->
          <div
            class="blade"
            :class="{ 'blade--on': isOn }"
            :style="{ '--blade-color': activeColor }"
          ></div>
          <!-- Le halo (meme forme mais floutee, pour l'effet glow) -->
          <div
            class="blade-glow"
            :class="{ 'blade-glow--on': isOn }"
            :style="{ '--blade-color': activeColor }"
          ></div>

          <!-- Chapitre 2.3 : la poignee ira ici -->

        </div>
```

La lame est composee de deux elements superposes :

- **`blade`** : un rectangle fin (8px) qui represente la lame solide.
- **`blade-glow`** : un rectangle plus large et floute qui cree le halo lumineux caracteristique.

Les deux utilisent une **variable CSS** `--blade-color` passee via `:style`, ce qui permet de changer la couleur dynamiquement. La classe conditionnelle `blade--on` controle l'animation d'extension via `scaleY`. Les deux elements sont en `position: absolute` avec `bottom: 100%`, ce qui les place juste au-dessus du conteneur `saber-assembly` (donc au-dessus de la poignee).

## 2.3 La poignee (hilt)

Remplacez le commentaire de la poignee **a l'interieur** du `saber-assembly` par :

```html
          <!-- La poignee du sabre -->
          <div class="hilt">
            <div class="hilt-top"></div>
            <div class="hilt-grip">
              <!-- 6 rainures decoratives sur la poignee -->
              <div class="hilt-ridge" v-for="n in 6" :key="n"></div>
            </div>
            <div class="hilt-pommel"></div>
          </div>
```

La poignee est un assemblage de trois parties CSS :

- **`hilt-top`** : l'embout superieur (emetteur) ou sort la lame.
- **`hilt-grip`** : le corps de la poignee avec ses rainures (`hilt-ridge`).
- **`hilt-pommel`** : la base de la poignee.

Le `v-for="n in 6"` genere 6 rainures decoratives. La poignee est le seul enfant en flux normal du `saber-assembly`, ce qui definit la taille du conteneur et sert de point d'ancrage pour la lame.

## 2.4 Le bouton power

Remplacez le commentaire du bouton par :

```html
        <!-- Le bouton power (icone SVG standard) -->
        <button
          class="power-btn"
          :class="{ 'power-btn--on': isOn }"
          :style="{ '--btn-color': activeColor }"
          @click="toggle"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
               stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="12" />
            <path d="M16.24 7.76a6 6 0 1 1-8.49 0" />
          </svg>
        </button>
```

Le bouton utilise une icone SVG "power" inline. Quand le sabre est allume, la classe `power-btn--on` ajoute une bordure lumineuse et un `box-shadow` colore. Le `@click="toggle"` appelle la fonction que nous definirons dans le script.

## 2.5 Le selecteur de couleur

Remplacez le dernier commentaire par :

```html
        <!-- Le selecteur de couleur (visible uniquement quand le sabre est eteint) -->
        <div class="color-picker" v-show="!isOn">
          <button
            v-for="color in colors"
            :key="color.name"
            class="color-swatch"
            :class="{ 'color-swatch--active': selectedColor === color.value }"
            :style="{ background: color.value }"
            @click="selectedColor = color.value"
          >
          </button>
        </div>
```

`v-show="!isOn"` masque le selecteur quand le sabre est allume (on ne change pas de cristal kyber en plein combat). Chaque pastille de couleur est un `<button>` avec un `background` dynamique et une classe `--active` pour celle qui est selectionnee.
