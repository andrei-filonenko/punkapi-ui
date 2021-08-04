import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import beerReducer from './beerSlice'

export const store = configureStore({
  reducer: {
    beers: beerReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
