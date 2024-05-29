export type Pokemon = {
  id: number
  name: string
}
const pokemonList: Pokemon[] = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
  { id: 4, name: 'Charmander' },
  { id: 5, name: 'Charmeleon' },
  { id: 6, name: 'Charizard' },
  { id: 7, name: 'Squirtle' },
  { id: 8, name: 'Wartortle' },
  { id: 9, name: 'Blastoise' },
]

export const findPokemonById = async (id: number) => {
  return pokemonList.find(p => p.id === id)
}

export const findPokemonByName = async (name: string) => {
  return pokemonList.find(p => p.name === name)
}

export const getPokemonList = async (page?: number): Promise<{ list: Pokemon[], count: number}> => {
  if (!page) { return { list: pokemonList, count: pokemonList.length } }
  return { list: pokemonList.slice((page - 1) * 5, page * 5), count: pokemonList.length }
}

export const addPokemon = async (pokemon: Pokemon) => {
  if (pokemonList.some((p) => p.id === pokemon.id)) {
    throw new Error('Pokemon already exists')
  }
  pokemonList.push(pokemon)
  return pokemon
}

export const deletePokemon = async (pokemonId: number) => {
  const index = pokemonList.findIndex((pokemon) => pokemon.id === pokemonId)
  if (index === -1) {
    throw new Error('Pokemon not found')
  }
  return pokemonList.splice(index, 1)[0]
}