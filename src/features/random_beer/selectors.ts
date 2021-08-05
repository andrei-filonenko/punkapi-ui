import { RootState } from '../../app/store'

/**
 *
 * Select all non-alcoholic beers from a store
 *
 * @param state
 * @returns list of non-alcholic beers
 */
export const getAllNonAlcoholicBeers = (state: RootState) =>
  Object.values(state.beers.byId).filter((beer) => {
    return !!beer.abv && beer.abv <= 0.51
  })
