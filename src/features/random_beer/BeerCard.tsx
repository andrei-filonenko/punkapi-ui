import { IBeer } from '../../app/schema'
import Button from '../../app/components/Button'
import {
  Header,
  BeerName,
  Abv,
  Description,
  BeerCardContainer,
  ImgContainer,
  BodyContainer,
  ActionButtons,
} from './styled'
import ErrorState from '../../app/components/ErrorState'

const DEFAULT_IMAGE = 'https://images.punkapi.com/v2/keg.png'

interface Props {
  beer: IBeer
  onFetchBeer: () => void
  onFetchNonAlcoholicBeer: () => void
  state: 'idle' | 'loading' | 'failure'
  errorMessage?: string
}

export default function BeerCard({
  beer,
  onFetchBeer,
  onFetchNonAlcoholicBeer,
  errorMessage,
  state = 'idle',
}: Props) {
  const isLoading = state === 'loading'
  const abv = `Abv. ${beer.abv}%`
  const content = (
    <>
      <Header>
        <BeerName>{isLoading ? 'Loading...' : beer.name}</BeerName>
        <Abv>{abv}</Abv>
      </Header>
      <Description>
        <p>{beer.description}</p>
      </Description>
    </>
  )

  return (
    <BeerCardContainer state={state}>
      <ImgContainer>
        <img alt="" src={beer.image_url || DEFAULT_IMAGE} />
      </ImgContainer>
      <BodyContainer>
        {state === 'failure' ? (
          <ErrorState>{errorMessage}</ErrorState>
        ) : (
          content
        )}
        <ActionButtons>
          <Button onClick={onFetchBeer} primary loading={isLoading}>
            Get Random Beer
          </Button>
          <Button onClick={onFetchNonAlcoholicBeer} loading={isLoading}>
            Random Alcohol-Free
          </Button>
        </ActionButtons>
      </BodyContainer>
    </BeerCardContainer>
  )
}
