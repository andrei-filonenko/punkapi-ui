import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { IBeer } from './schema'
import { RootState } from './store'
import { getAllNonAlcoholicBeers } from '../features/random_beer/selectors'
import { formatDate, parseUSDate, pickRandom } from '../util'
import beerApi, { getBeers } from './beerApi'

export interface Error {
  message?: string
}

export interface IBeerState {
  maxDate: number
  nameSearches: { [key: string]: number[] }
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
  nameSearches: {},
  maxDate: 0,
  areBeersLoading: false,
  randomBeerState: 'idle',
  byId: {},
} as IBeerState

type ApiConfig = { state: RootState }

function compareBeersById(a: IBeer, b: IBeer) {
  if (a.id > b.id) return -1
  if (a.id < b.id) return 1
  return 0
}

interface NameFetchReturnType {
  name: string
  beers: IBeer[]
}

export const fetchBeersByName = createAsyncThunk<
  NameFetchReturnType,
  string,
  ApiConfig
>('beers/fetchBeersByName', async (name, thumpApi) => {
  const state = thumpApi.getState()
  // get name by cache
  // given that backend uses fuzzy search
  // there is no way to construct a robust partial inclusion order
  // for search results unless we have the exact distance function
  // so caching just by search string
  if (state.beers.nameSearches.hasOwnProperty(name.toUpperCase())) {
    const beers = state.beers.nameSearches[name.toUpperCase()].map(
      (id) => state.beers.byId[id]
    )
    return {
      name,
      beers,
    }
  }
  const beers = await getBeers({ beer_name: name })
  return { beers, name }
})

const cachedBeersBrewedBefore = (timestamp: number) => (state: RootState) => {
  const beers = Object.values(state.beers.byId).filter((beer) => {
    if (!beer.first_brewed) {
      return false
    }
    const beerTs = parseUSDate(beer.first_brewed as string).getTime()
    return beerTs < timestamp
  })
  beers.sort(compareBeersById)
  return beers
}
interface DateFetchReturnType {
  timestamp: number
  beers: IBeer[]
}

// Caching in this action is done by benefiting from
// the fact that dates are linearly ordered
// so if query date is before previous date, the results are
// already in the cache
// otherwise we need only to fetch entries between these dates
export const fetchBeersByDate = createAsyncThunk<
  DateFetchReturnType,
  Date,
  ApiConfig
>('beers/fetchBeersDate', async (query, thumpApi) => {
  const timestamp = query.getTime()
  const state = thumpApi.getState()
  const currentTimestamp = state.beers.maxDate
  let beers: IBeer[] = []
  const brewed_before = formatDate(query)
  if (currentTimestamp === 0) {
    beers = await getBeers({ brewed_before })
    // older beers must already be in the store
  } else if (timestamp <= currentTimestamp) {
    beers = cachedBeersBrewedBefore(timestamp)(state)
  } else {
    const brewedAfterDate = new Date(currentTimestamp)
    const fromCache = cachedBeersBrewedBefore(brewedAfterDate.getTime())(state)
    // retract one month to brewed after to get a closed interval
    // FIXME: use moment-like library to deal with edge cases
    brewedAfterDate.setMonth(brewedAfterDate.getMonth() - 1)
    const brewed_after = formatDate(brewedAfterDate)
    const missingBeers = await getBeers({ brewed_after, brewed_before })
    beers = fromCache.concat(missingBeers)
  }
  return { beers, timestamp }
})

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
      .addCase(
        fetchBeersByDate.fulfilled,
        (state, { payload: { timestamp, beers } }) => {
          // update cache
          for (const beer of beers) {
            state.byId[beer.id] = beer
          }
          state.areBeersLoading = false
          delete state.beerListError
          if (state.maxDate < timestamp) {
            state.maxDate = timestamp
          }
          state.displayItems = beers
        }
      )
      .addCase(fetchBeersByName.fulfilled, (state, action) => {
        state.areBeersLoading = false
        const beers = action.payload.beers
        const name = action.payload.name.toUpperCase()
        if (!state.nameSearches.hasOwnProperty(name)) {
          // remember ids of searched beers
          state.nameSearches[name] = action.payload.beers.map((b) => b.id)
          // update cache
          for (const beer of beers) {
            state.byId[beer.id] = beer
          }
        }
        delete state.beerListError
        state.displayItems = action.payload.beers
      })
      .addCase(fetchBeersByDate.pending, (state) => {
        delete state.beerListError
        state.areBeersLoading = true
      })
      .addCase(fetchBeersByName.pending, (state) => {
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
