import BeerCard from './BeerCard'
import { useAppSelector } from '../../app/hooks'
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { fetchRandomBeer } from '../../app/beerSlice'
import { RootState } from '../../app/store'

const getBeer = (state: RootState) => state.beers.randomBeer || null

const getPanelState = (state: RootState) => state.beers.randomBeerState

const getError = (state: RootState) => state.beers.randomBeerError

export default function RandomBeer() {
  const dispatch = useDispatch()
  
  const beer = useAppSelector(getBeer)
  const panelState = useAppSelector(getPanelState)
  const error = useAppSelector(getError)


  useEffect(() => {
    dispatch(fetchRandomBeer()) 
  }, [dispatch])  

  const fetchBeer = useCallback(() => {
    dispatch(fetchRandomBeer())
  }, [dispatch])

  const fetchNonAlcoholicBeer = useCallback(() => {
    dispatch(fetchRandomBeer(true))
  }, [dispatch])


  if (beer !== null) {
    return (
      <BeerCard
        errorMessage={error?.message}
        beer={beer}
        onFetchBeer={fetchBeer}
        onFetchNonAlcoholicBeer={fetchNonAlcoholicBeer}
        state = {panelState}
      />
    )
  }
  return null
}
