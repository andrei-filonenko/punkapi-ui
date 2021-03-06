import RandomBeer from './features/random_beer/RandomBeer'
import BeerSearch from './features/beer_search/BeerSearch'
import LoadingState from './app/components/LoadingState'
import BeerList from './features/beer_search/BeerList'
import { useAppSelector } from './app/hooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchRandomBeer } from './app/beerSlice'
import tw, { styled } from 'twin.macro'

const PageLoading = styled.div`
  ${tw`flex justify-center py-24`}
`

function App() {
  // app is fully loaded only when random beer query is done
  // which is supposed to run on page load
  const isAppLoading = useAppSelector((state) => !state.beers.randomBeer)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRandomBeer())
  }, [dispatch])

  return (
    <div className="App">
      {isAppLoading ? (
        <PageLoading>
          <LoadingState />
        </PageLoading>
      ) : (
        <>
          <RandomBeer />
          <BeerSearch />
          <BeerList />
        </>
      )}
    </div>
  )
}

export default App
