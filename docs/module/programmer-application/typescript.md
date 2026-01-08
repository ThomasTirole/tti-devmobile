# 🌀 Interlude - Intro à TypeScript
Dans les chapitres précédents, vous avez pu apercevoir du code Ionic-Vue contenant du **TypeScript**(`.ts`, `lang="ts"`).
Avant d'aller plus loin, il est essentiel de comprendre **ce qu'est TypeScript**, **ce qu'il apporte** et **comment l'utiliser sans complexité inutile**.

L'objectif de ce chapitre n'est pas de faire de vous des experts TypeScript, mais de vous donner **les bases nécessaires pour comprendre du code propre et fiable** dans un projet Ionic.

## 🎯 Objectifs d'apprentissage
À la fin de ce chapitre, vous serez capables de :
- expliquer ce qu'est **TypeScript** ;
- comprendre la différence entre **JavaScript** et **TypeScript** ;
- lire et écrire du TypeScript simple ;
- comprendre les erreurs TypeScript les plus courantes ;
- utiliser TypeScript dans un composant ;
- voir TypeScript comme une **aide au développement**, et non comme une contrainte.

## 🤔 Qu'est-ce que TypeScript ?
**TypeScript** est un langage créé par Microsoft.
Il s'agit d'un **sur-ensemble de JavaScript** : tout code JavaScript valide est aussi du TypeScript valide.

La différence principale est que TypeScript permet d'ajouter des **types**. (comme son nom l'indique 😉)

::: warning **⚠️ Important**
TypeScript **n'est jamais exécuté directement**.
Il est **compilé en JavaScript**, qui est le seul langage compris par le navigateur ou le moteur mobile.
:::

::: code-group
```js [JavaScript.js]
let message = "Bonjour"
message = 42
```

```ts [TypeScript.ts]
let message = "Bonjour" // [!code --]
let message: string = "Bonjour" // [!code ++]
message = 42 // ❌ erreur détectée avant l’exécution

```
:::
> Le code JavaScript est valide, mais peut provoquer des erreurs inattendues. Alors que le code TypeScript, détecte le problème **avant même de lancer l'application**.

## 3.2.2 ⁉️ Pourquoi Ionic utilise TypeScript ?
Ionic et Capacitor sont des frameworks **riches et complexes**, qui possèdent **beaucoup d'options**, d'**APIs** et de **paramètres précis à respecter**.

De ce fait, TypeScript permet donc :
- une **auto-complétion intelligente dans l'IDE ;
- une **documentation intégrée** dans le code ;
- la détection d'erreurs courantes (mauvais type, propriété inexistante).

::: details **🖼️ Exemple : appel d'API (récupérer une photo)** {open}

Si l'on en croit la [documentation](https://capacitorjs.com/docs/apis/camera#imageoptions) de l'API Camera de Capacitor, la méthode `getPhoto` accepte un objet de configuration avec plusieurs options, dont `quality` et `resultType`. Les deux paramètres attendent respectivement un nombre entre 0 et 100, et une valeur spécifique parmi un ensemble prédéfini.
::: code-group
```js [JavaScript.js]
import { Camera } from '@capacitor/camera'

Camera.getPhoto({
    quality: "high",
    resultType: "uri"
})
// Ici, JavaScript n'empêche pas les erreurs de configuration.
// Cela retournera une erreur à l'exécution.
```

```ts [TypeScript.ts]
import { Camera } from '@capacitor/camera'

Camera.getPhoto({
    quality: 70,
    resultType: CameraResultType.Uri
})

// Ici TypeScript impose les bonnes valeurs et empêche les erreurs de configuration.
```
:::

## 🆚 3.2.3 JavaScript vs TypeScript : la différence en une minute
TypeScript *ne change pas la logique**, il ajoute un **contrat**.

::: code-group 
```js [JavaScript.js]
function addition(a, b) {
    return a + b
}

addition(2, "3") // résultat inattendu : "23"
```

```ts [TypeScript.ts]
function addition(a: number, b: number): number {
    return a + b
}

addition(2, "3") // ❌ erreur détectée avant l’exécution
```
:::
> 👉 Le code final exécuté sera du JavaScript, mais les **erreurs sont bloquées avant**.

## 🧩 3.2.4 Les types de base en TypeScript

| Type      | Description                          |
|-----------|--------------------------------------|
| `string`  | Texte                                |
| `number`  | Nombre                               |
| `boolean` | Vrai / faux                          |
| `array`   | Tableau                              |
| `object`  | Objet                                |
| `any`     | Désactive le typage (à éviter)       |
| `unknown` | Type inconnu mais plus sûr que `any` |

::: code-group
```js [JavaScript.js]
let title = "Note"
let count = 3
let done = false
let tags = ["cours", "mobile"]
```

```ts [TypeScript.ts]
let title: string = "Note"
let count: number = 3
let done: boolean = false
let tags: string[] = ["cours", "mobile"]
```
:::

## 🧱 3.2.5 Fonctions : paramètres et valeur de retour

::: details **Fonction simple**
::: code-group
```js [JavaScript.js]
function greet(name) {
    return "Bonjour " + name
}
```
```ts [TypeScript.ts]
function greet(name: string): string {
    return "Bonjour " + name
}
```
:::
::: details **Fonction avec paramètres optionnels**
::: code-group
```js [JavaScript.js]
function greet(name, title) {
    if (title) {
        return "Bonjour " + title + " " + name
    }
    return "Bonjour " + name
}
```
```ts [TypeScript.ts]
function greet(name: string, title?: string): string {
    if (title) {
        return "Bonjour " + title + " " + name
    }
    return "Bonjour " + name
}
```
:::
::: details **Fonction avec paramètres par défaut**
::: code-group
```js [JavaScript.js]
function greet(name, title = "M./Mme") {
    return "Bonjour " + title + " " + name
}
```
```ts [TypeScript.ts]
function greet(name: string, title: string = "M./Mme"): string {
    return "Bonjour " + title + " " + name
}
```
:::
::: details **Fonction `async`**
::: code-group
```js [JavaScript.js]
async function loadData() {
    return { success: true }
}
```
```ts [TypeScript.ts]
async function loadData(): Promise<{ success: boolean }> {
    return { success: true }
}
// Le type de retour est une promesse résolvant un objet avec une propriété "success" de type boolean.
```
:::

## 📜 3.2.6 Objets et interfaces
Lorsque les données deviennent plus complexes, TypeScript permet de définir une **structure claire**.

Si l'on prend l'exemple d'un objet représentant une tâche :
::: code-group
```js [JavaScript.js]
const task = {
    id: 1,
    title: "Acheter du lait",
    completed: false
}
```
```ts [TypeScript.ts]
interface Task { // [!code ++]
    id: number // [!code ++]
    title: string // [!code ++]
    completed: boolean // [!code ++]
} // [!code ++]
const task: Task = {
    id: 1,
    title: "Acheter du lait",
    completed: false
}
// L'interface "Task" définit la structure attendue pour l'objet "task".
```
:::
> 👉 L'avantage, c'est qu'on **n'oublie aucune propriété**, qu'on **évite les fautes de frappe** et que **la lisibilité ainsi que la structure** du code **sont améliorées**.

## ⚠️ 3.2.7 `null`, `undefined` et erreurs fréquentes
TypeScript est strict avec les valeurs **absentes**.

::: code-group
```js [JavaScript.js]
console.log(note.title.toUpperCase())
// Pas d'erreur, mais peut planter si note ou title est null
```
```ts [TypeScript.ts]
console.log(note?.title?.toUpperCase())
// Utilisation de l'opérateur de chaînage optionnel pour éviter les erreurs si note ou title est null ou undefined
```
:::

> 👉 Utilisez toujours l'**opérateur de chaînage optionnel** (`?.`) lorsque vous accédez à des propriétés qui pourraient être `null` ou `undefined`. TypeScript vous aide à **anticiper ces cas dangereux**.

## 🧪 3.2.8 TypeScript dans un composant Ionic-Vue (Vue 3 + Composition API)
Dans un composant Ionic-Vue, vous pouvez [utiliser TypeScript](https://vuejs.org/guide/typescript/composition-api.html) de manière transparente
```vue [Template.vue]
<script setup lang="ts">
```

::: details `ref`typés
::: code-group
```js [script.js]
import { ref } from 'vue'

const count = ref(0)
```

```ts [script.ts]
import { ref from 'vue'

const count = ref<number>(0)
```
:::
::: details `reactive` typés
::: code-group
```js [script.js]
import { reactive } from 'vue'
const user = reactive({
    id: 1,
    name: "Alice"
})
```

```ts [script.ts]
import { reactive } from 'vue'
interface User {
    id: number
    name: string
    aura: number
    beersDrank: number
}
const user = reactive<User>({
    id: 1,
    name: "Thomas",
    aura: 1000000,
    beersDrank: 42
})

// Dans Vue, puisque reactive est normalement utilisé pour des objets, on définit une interface pour structurer l'objet.
```
:::

:::details `computed` typés
::: code-group
```js [script.js]
import { computed } from 'vue'
const doubleCount = computed(() => count.value * 2)
```
```ts [script.ts]
import { computed } from 'vue'
const doubleCount = computed<number>(() => count.value * 2)
```
:::
::: details Tableau typé
::: code-group
```js [script.js]
import { ref } from 'vue'

const tasks = ref([])
```

```ts [script.ts]
import { ref } from 'vue'
const tasks = ref<string[]>([])
```
:::

## 🏆 3.2.9 Bonnes pratiques TypeScript pour ce module
- ne pas tout typer dès le début : commencez par du JavaScript simple, puis ajoutez des types au fur et à mesure que le besoin s'en fait sentir ;
- privilégiez les types spécifiques (`string`, `number`, `boolean`, etc.) plutôt que `any` ;
- utilisez les interfaces pour structurer les objets complexes ;
- typer les **données qui circulent** (API, stores, props) ;
- lisez les messages d'erreur au lieu de les ignorer : ils sont là pour vous aider à écrire un code plus sûr.

::: tip
TypeScript est un **filet de sécurité, pas une contrainte**.
:::


