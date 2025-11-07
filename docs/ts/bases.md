# Bases du langage TypeScript

## Types primitifs

``` ts
let nom: string = "Ada"
let age: number = 36
let actif: boolean = true
let id: number | string = 42 // union
```

## Fonctions

``` ts
function greet(name: string, upper?: boolean): string {
const msg = `Hello ${name}`
return upper ? msg.toUpperCase() : msg
}
```

## Objets et interfaces

``` ts
interface User {
id: number
name: string
email?: string // optionnel
}

const u: User = { id: 1, name: "Ada" }
```

## Tableaux et tuples

``` ts
const scores: number[] = [10, 12, 9]
const pair: [number, string] = [1, "one"]
```

## Enums (facultatif)

``` ts
enum Status { Todo = "todo", Doing = "doing", Done = "done" }
```

## Types utilitaires (exemples)

``` ts
type UserPublic = Pick<User, "id" | "name">
type UserPartial = Partial<User>
```

::: warning Bonnes pratiques
- Éviter any par défaut.
- Préférer types/interfaces exportés dans des fichiers dédiés.
- Taper les retours des fonctions publiques.  
  :::