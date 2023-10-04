import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPokemons, Pokemon, setOffset } from '@/store/pokemonSlice'
import { RootState } from '@/store/store'

type ApiData = {
  count: number,
  next: number,
  previous: number,
  results: {
    name: string,
    url: string
  }[]
}

export default function Home() {
  const dispatch = useDispatch()
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons)
  const offset = useSelector((state: RootState) => state.pokemon.offset)
  const limit = useSelector((state: RootState) => state.pokemon.limit)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        const data: ApiData = await res.json()
        if (data.results.length) {
          const pokemons: Pokemon[] = data.results.map((val, idx) => ({
            ...val,
            id: idx+1
          }))
          dispatch(setPokemons(pokemons))
        } else {
          dispatch(setPokemons([]))
        }
      } catch {
        dispatch(setPokemons([]))
      } finally {
        setIsLoading(false)
      }
    }
    fetchPokemons()
  }, [offset])

  const loadMorePokemon = () => {
    dispatch(setOffset(offset + 1))
  }

  return (
    <main className="flex flex-col container max-w-md mx-auto p-2 bg-gray-900">
      <div className="grid grid-cols-2 gap-2 mb-4">
        {
          pokemons.map(pokemon => {
            return (
              <div key={pokemon.id} className="flex flex-col items-center justify-center p-3 bg-gray-500 rounded">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt="pokemon image"
                  width={500}
                  height={500}
                />
                <div className='text-white font-bold'>{pokemon.name}</div>
              </div>
            )
          })
        }
      </div>
      <div>{ isLoading ? <div className='text-white font-bold text-lg text-center'>Loading...</div> : <></> }</div>
      <button
        type='button'
        className='bg-blue-500 hover:bg-blue-700 px-3 py-2 text-white w-full'
        onClick={loadMorePokemon}
      >
        Load More Pokemon
      </button>
    </main>
  )
}
