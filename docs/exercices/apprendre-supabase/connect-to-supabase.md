# 2️⃣ Connecter Ionic à Supabase

## 2️⃣.1️⃣ Récupérer les clés Supabase
Référez-vous à l'étape 0️⃣.6️⃣ de l'exercice [Configurer Supabase](../apprendre-supabase/setup-supabase.md)

## 2️⃣.2️⃣ Créer un fichier `.env`
À la racine du projet Ionic (`clash-cards`), créez un fichier `.env` et ajoutez-y les variables d'environnement suivantes avec vos propres valeurs :

```env [.env]
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_KEY=sb_publishable__xxXxxxxXxXXXxx
```
::: warning **⚠️ IMPORTANT**
Préfixez les variables d'environnement par `VITE_` pour qu'elles soient accessibles dans le code client avec Vite.
:::

## 2️⃣.3️⃣ Créer le client Supabase
Créer `src/lib/supabase.ts` pour initialiser le client Supabase avec les variables d'environnement :
```ts [src/lib/supabase.ts]
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(url, key)
```
> ✅ Redémarrez le seveur si besoin `ionic serve`

