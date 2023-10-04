import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Pokemon = {
  name: string,
  url: string,
}

type InitialState = {
  pokemons: Pokemon[]
  limit: number
  offset: number
}

const initialState: InitialState = {
  pokemons: [],
  limit: 20,
  offset: 0,
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = [...state.pokemons, ...action.payload]
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload
    }
  }
})

export const {setPokemons, setOffset} = pokemonSlice.actions

export default pokemonSlice.reducer