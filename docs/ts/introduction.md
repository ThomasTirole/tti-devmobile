# Pourquoi TypeScript ?

**TypeScript** ajoute un typage statique à JavaScript.  
Dans un projet mobile (Ionic + Vue), il apporte :
- Robustesse : moins d’erreurs à l’exécution (typos, mauvais types).
- Auto-complétion et documentation dans l’IDE.
- Meilleure maintenabilité (équipes, long terme).

## Exemple rapide

```ts
// Sans TS (JS) : erreur possible à l'exécution
function add(a, b) { return a + b }

// Avec TS : erreur détectée à la compilation
function add(a: number, b: number): number {
return a + b
}
```

::: tip Dans ce module
On utilise TS de façon pragmatique : types de base, interfaces, fonctions, et un peu de classes.
:::
