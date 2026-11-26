// Compile chaque deck Slidev (slides/<nom>/slides.md) en site statique
// dans docs/public/slides/<nom>/, pour l'intégrer au support via une iframe.
// Utilisation : npm run slides:build
import { readdirSync, existsSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '..')
const slidesDir = join(root, 'slides')
const outRoot = join(root, 'docs', 'public', 'slides')

const decks = readdirSync(slidesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(slidesDir, d.name, 'slides.md')))
  .map((d) => d.name)

rmSync(outRoot, { recursive: true, force: true })

for (const deck of decks) {
  const entry = join(slidesDir, deck, 'slides.md')
  const out = join(outRoot, deck)
  console.log(`[slides] ${deck} -> docs/public/slides/${deck}/`)
  execFileSync(
    'npx',
    ['slidev', 'build', entry, '--base', `/slides/${deck}/`, '--out', out],
    { stdio: 'inherit', cwd: root },
  )
}

console.log(`[slides] ${decks.length} deck(s) compilé(s)`)
