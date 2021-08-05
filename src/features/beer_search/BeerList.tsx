import * as components from '../random_beer/styled'
import tw, { styled } from 'twin.macro'
import { RootState } from '../../app/store'
import { useAppSelector } from '../../app/hooks'
import LoadingState from '../../app/components/LoadingState'
import EmptyState from '../../app/components/EmptyState'
import ErrorState from '../../app/components/ErrorState'

const DEFAULT_IMAGE = 'https://images.punkapi.com/v2/keg.png'

const getBeeers = (state: RootState) => state.beers.displayItems
const getLoadingState = (state: RootState) => state.beers.areBeersLoading
const getError = (state: RootState) => state.beers.beerListError

const BeerCardContainer = styled(components.BeerCardContainer)`
  width: 100%;
  border-bottom: 3px solid black;
  box-shadow: none;
  border-radius: 0;
  margin-left: 1rem;
  margin-right: 1rem;
`

const BeerListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > ${BeerCardContainer}:last-child {
    border-bottom: none;
  }
`

const ImgContainer = styled(components.ImgContainer)`
  height: auto;
`
const BodyContainer = styled(components.BodyContainer)``
const Header = styled(components.Header)`
  ${tw`text-base`}
`
const BeerName = styled(components.BeerName)``
const Description = styled(components.Description)``
const Abv = styled(components.Abv)``

const loadingState = <LoadingState>Loading list of beers...</LoadingState>

const emptyState = (
  <EmptyState subject="No beers found">
    Adjust search to find your beer
  </EmptyState>
)

const initialState = (
  <EmptyState subject="Find awesome beer recepies">
    Use search field to find the beer you like.
  </EmptyState>
)


export default function BeerList() {
  const maybeBeers = useAppSelector(getBeeers)
  const isLoading = useAppSelector(getLoadingState)
  const error = useAppSelector(getError) 

  const isNeverLoaded = !error && !isLoading && maybeBeers === undefined
  const beers = maybeBeers || []
  const isNotFound = !error && !isLoading && !isNeverLoaded && !beers.length
  

  return (
    <BeerListContainer>
      {error && <ErrorState>{error.message}</ErrorState>}
      {isNeverLoaded && initialState}
      {isNotFound && emptyState}
      {isLoading && loadingState}
      {beers.map((beer) => (
        <BeerCardContainer state="idle" key={beer.id}>
          <ImgContainer className="h-auto">
            <img alt="" src={beer.image_url || DEFAULT_IMAGE} />
          </ImgContainer>
          <BodyContainer>
            <Header>
              <BeerName>{beer.name}</BeerName>
              <Abv>Abv.&nbsp;{beer.abv}%</Abv>
            </Header>
            <Description>
              <p>{beer.description}</p>
            </Description>
          </BodyContainer>
        </BeerCardContainer>
      ))}
    </BeerListContainer>
  )
}
