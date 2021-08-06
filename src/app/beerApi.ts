import {
  Beer,
  BeerList,
  BeerQueryParams,
  IBeer,
  IBeerQueryParams,
} from './schema'

const PER_PAGE = 80

export async function getRandomBeer(): Promise<IBeer> {
  const resp = await fetch('https://api.punkapi.com/v2/beers/random')
  const data = await resp.json()
  const beer = Beer.check(data[0])
  return beer
}

async function getBeersForPage(
  params: IBeerQueryParams,
  page: number,
  per_page = PER_PAGE
): Promise<IBeer[]> {
  const queryParams = Object.entries({ ...params, page, per_page })
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
  const res = await fetch(`https://api.punkapi.com/v2/beers?${queryParams}`)
  const data = await res.json()
  return BeerList.check(data)
}

export async function getBeers(
  queryParams: IBeerQueryParams = {},
  page: number = 1,
  loaded: IBeer[] = []
): Promise<IBeer[]> {
  // do validation of input parameters
  const params = BeerQueryParams.check(queryParams)
  const resp = await getBeersForPage(params, page)
  const result = loaded.concat(resp)
  if (resp.length < 80) {
    // return results only if the list is not
    // populated with results
    return result
  }
  // cycle while list is not exhausted
  return getBeers(queryParams, page + 1, result)
}

const exports = { getRandomBeer, getBeers }
export default exports
