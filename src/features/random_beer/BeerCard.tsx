import { IBeer } from '../../app/schema'
import Button from '../../app/components/Button'
import {
  Header,
  BeerName,
  Abv,
  Description,
  ErrorContainer,
  BeerCardContainer,
  ImgContainer,
  BodyContainer,
  ActionButtons,
} from './styled'

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

  const content = (
    <>
      <Header>
        <BeerName>{beer.name}</BeerName>
        <Abv>Abv.&nbsp;{beer.abv}%</Abv>
      </Header>
      <Description>
        <p>{beer.description}</p>
      </Description>
    </>
  )

  const error = (
    <ErrorContainer role="alert">
      <p className="font-bold">Error</p>
      <p>{errorMessage}</p>
    </ErrorContainer>
  )

  return (
    <BeerCardContainer state={state}>
      <ImgContainer>
        <img alt="" src={beer.image_url || DEFAULT_IMAGE} />
      </ImgContainer>
      <BodyContainer>
        {state === 'failure' ? error : content}
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
