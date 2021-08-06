import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { IBeer } from './schema'
import { RootState } from './store'
import { getAllNonAlcoholicBeers } from '../features/random_beer/selectors'
import { formatDate, pickRandom } from '../util'
import beerApi, { getBeers } from './beerApi'

export interface Error {
  message?: string
}

export interface IBeerState {
  randomBeerState: 'idle' | 'loading' | 'failure'
  byId: { [id: number]: IBeer }
  randomBeer?: IBeer
  isNonAlcoholicBeerReceived?: boolean
  randomBeerError?: Error
  beerListError?: Error
  displayItems?: IBeer[]
  areBeersLoading: boolean
}

export const initialState = {
  areBeersLoading: false,
  randomBeerState: 'idle',
  byId: {},
} as IBeerState

type ApiConfig = { state: RootState }

export const fetchBeersByName = createAsyncThunk<IBeer[], string, ApiConfig>(
  'beers/fetchBeersByName',
  (beer_name, thumpApi) => {
    return getBeers({ beer_name }).catch(thumpApi.rejectWithValue)
  }
)

export const fetchBeersByDate = createAsyncThunk<IBeer[], Date, ApiConfig>(
  'beers/fetchBeersDate',
  (d, thumpApi) => {
    const brewed_before = formatDate(d)
    return getBeers({ brewed_before }).catch(thumpApi.rejectWithValue)
  }
)

export const nonAlcoholicLoaded = createAction<void>('beers/nonAlcoholicLoaded')
export const addBeers = createAction<IBeer[]>('beers/addBeers')
export const fetchRandomBeer = createAsyncThunk<
  IBeer,
  boolean | undefined,
  ApiConfig
>(
  'beers/fetchRandomBeer',
  async function _get_beers_action(isNonAlcoholic, thumpApi) {
    const state = thumpApi.getState()
    const currentBeerId = state.beers.randomBeer?.id
    let nextBeer: IBeer
    if (!isNonAlcoholic) {
      nextBeer = await beerApi.getRandomBeer()
      if (currentBeerId === nextBeer.id) {
        // we should try again if we've got the same id by chance
        nextBeer = await _get_beers_action(isNonAlcoholic, thumpApi)
      }
      return nextBeer
    }
    // let's see if the beers are already in the cache
    if (state.beers.isNonAlcoholicBeerReceived) {
      const beers = getAllNonAlcoholicBeers(state)
      // if so pick random one that's not displayed
      return pickRandom(beers.filter((b) => b.id !== currentBeerId))
    }
    const beers = await beerApi.getBeers({ abv_lt: 0.51 })
    // set flag in the cache that all random beers are already loadeed
    // we don't have an endpoint for random non-alcoholic beer
    // so we'll get all of them
    thumpApi.dispatch(nonAlcoholicLoaded())
    // load beers into cache for future use
    thumpApi.dispatch(addBeers(beers))
    return pickRandom(beers.filter((b) => b.id !== currentBeerId))
  }
)

export const beerSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    addBeer(state, action: PayloadAction<IBeer>) {
      state.byId[action.payload.id] = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(nonAlcoholicLoaded, (state, action) => {
        state.isNonAlcoholicBeerReceived = true
      })
      .addCase(addBeers, (state, action) => {
        for (const beer of action.payload) {
          state.byId[beer.id] = beer
        }
      })
      .addCase(fetchRandomBeer.pending, (state) => {
        state.randomBeerState = 'loading'
      })
      .addCase(fetchRandomBeer.fulfilled, (state, action) => {
        const beer = action.payload
        state.randomBeer = beer
        state.byId[beer.id] = beer
        state.randomBeerState = 'idle'
      })
      .addCase(fetchRandomBeer.rejected, (state, action) => {
        state.randomBeerState = 'failure'
        state.randomBeerError = action.error
      })
      .addCase(fetchBeersByDate.fulfilled, (state, action) => {
        state.areBeersLoading = false
        delete state.beerListError
        state.displayItems = action.payload
      })
      .addCase(fetchBeersByName.fulfilled, (state, action) => {
        state.areBeersLoading = false
        delete state.beerListError
        state.displayItems = action.payload
      })
      .addCase(fetchBeersByDate.pending, (state) => {
        delete state.beerListError
        state.areBeersLoading = true
      })
      .addCase(fetchBeersByName.pending, (state, action) => {
        delete state.beerListError
        state.areBeersLoading = true
      })
      .addCase(fetchBeersByDate.rejected, (state, action) => {
        state.areBeersLoading = false
        state.beerListError = action.error
        state.displayItems = []
      })
      .addCase(fetchBeersByName.rejected, (state, action) => {
        state.areBeersLoading = false
        state.beerListError = action.error
        state.displayItems = []
      })
  },
})

export const { addBeer } = beerSlice.actions

export default beerSlice.reducer
