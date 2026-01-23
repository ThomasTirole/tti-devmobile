# 4️⃣ Modèle - Services API - Store
Nous allons créer le modèle de données, les services pour interagir avec l'API Supabase et le store Pinia pour gérer l'état des cartes dans l'application.

## 4️⃣.1️⃣ Créer le modèle TypeScript
Dans le dossier `src/types`, créez un fichier `Card.ts` pour définir le modèle de données d'une carte :

```ts [src/types/Card.ts]
// Types “fermés” (union types) : on limite les valeurs possibles.
// Ça aide l’IDE + évite les fautes de frappe.
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type Role = 'troop' | 'spell' | 'building'

// Interface = “contrat” de forme pour un objet Card.
// Ce sont les champs exactement comme dans la table Supabase `cards`.
export interface Card {
  id: string
  name: string
  rarity: Rarity
  elixir_cost: number
  role: Role
  hitpoints: number
  damage: number
  arena: number
  is_favorite: boolean
  created_at: string
}

// Quand on crée une carte, Supabase génère `id` et `created_at`.
// Donc côté front on ne les fournit pas.
export type CardInsert = Omit<Card, 'id' | 'created_at'>

// Quand on modifie une carte, on ne modifie pas forcément tout.
// Partial = tous les champs deviennent optionnels.
export type CardUpdate = Partial<CardInsert>
```

## 4️⃣.2️⃣ Créer les services API
Dans le dossier `src/services`, créez un fichier `cardsService.ts` pour gérer les interactions avec l'API Supabase :

```ts [src/services/cardsService.ts]
import { supabase } from '@/lib/supabase'
import type { Card, CardInsert, CardUpdate } from '@/types/Card'

/**
 * Récupère toutes les cartes depuis Supabase.
 * - select('*') : récupère toutes les colonnes
 * - order('created_at') : tri pour afficher les plus récentes en premier
 */
export async function fetchCards(): Promise<Card[]> {
  const { data, error } = await supabase
    .from('cards') // table
    .select('*')
    .order('created_at', { ascending: false })

  // Toujours gérer l’erreur : sinon on “échoue silencieusement”
  if (error) throw error

  // data peut être null, donc on retourne [] par défaut
  return (data ?? []) as Card[]
}

/**
 * Crée une carte.
 * - insert(payload) : ajoute une ligne
 * - select('*').single() : on veut récupérer la ligne créée directement
 */
export async function createCard(payload: CardInsert): Promise<Card> {
  const { data, error } = await supabase
    .from('cards')
    .insert(payload)
    .select('*')   // demande à Supabase de renvoyer la ligne créée
    .single()      // on veut un objet (pas un tableau)

  if (error) throw error
  return data as Card
}

/**
 * Met à jour une carte (PATCH).
 * - update(patch) : met à jour les champs fournis
 * - eq('id', id) : cible la bonne carte
 * - select('*').single() : renvoie la carte mise à jour
 */
export async function updateCard(id: string, patch: CardUpdate): Promise<Card> {
  const { data, error } = await supabase
    .from('cards')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as Card
}

/**
 * Supprime une carte par id.
 * Ici on ne renvoie rien : void.
 */
export async function deleteCard(id: string): Promise<void> {
  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', id)

  if (error) throw error
}
```

## 4️⃣.3️⃣ Créer le store Pinia
Dans le dossier `src/stores`, créez un fichier `cardStore.ts` pour gérer l'état des cartes dans l'application
```ts [src/stores/cardStore.ts]
import { defineStore } from 'pinia'
import type { Card, CardInsert, CardUpdate } from '@/types/Card'
import * as api from '@/services/cardsService'

/**
 * Le store = “source de vérité” (state centralisé).
 * L’UI lit le state et déclenche des actions.
 */
export const useCardsStore = defineStore('cards', {
  state: () => ({
    cards: [] as Card[],
    loading: false,
    error: '' as string | null
  }),

  actions: {
    /**
     * Charge la liste depuis Supabase.
     * loading/error permettent d’afficher un spinner ou un message.
     */
    async load() {
      this.loading = true
      this.error = null

      try {
        this.cards = await api.fetchCards()
      } catch (e: any) {
        this.error = e?.message ?? 'Erreur de chargement'
      } finally {
        this.loading = false
      }
    },

    /**
     * Ajoute une carte en DB + met à jour le store immédiatement.
     */
    async add(payload: CardInsert) {
      this.error = null
      const created = await api.createCard(payload)

      // On ajoute en tête pour la voir directement dans l’UI
      this.cards = [created, ...this.cards]
    },

    /**
     * Modifie une carte en DB + remplace la version dans le store.
     */
    async edit(id: string, patch: CardUpdate) {
      this.error = null
      const updated = await api.updateCard(id, patch)

      // Remplace l’élément modifié sans recharger toute la liste
      this.cards = this.cards.map(c => (c.id === id ? updated : c))
    },

    /**
     * Supprime en DB + supprime dans le store.
     */
    async remove(id: string) {
      this.error = null
      await api.deleteCard(id)

      this.cards = this.cards.filter(c => c.id !== id)
    },

    /**
     * Toggle “favori” : on lit d’abord dans le store puis on update.
     * (Petite logique métier côté front)
     */
    async toggleFavorite(id: string) {
      const current = this.cards.find(c => c.id === id)
      if (!current) return

      await this.edit(id, { is_favorite: !current.is_favorite })
    }
  }
})
```




