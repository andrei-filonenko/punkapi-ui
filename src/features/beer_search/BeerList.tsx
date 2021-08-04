import * as components from '../random_beer/styled'
import tw, { styled } from 'twin.macro';
import { RootState } from '../../app/store'
import { useAppSelector } from '../../app/hooks'

const DEFAULT_IMAGE = 'https://images.punkapi.com/v2/keg.png'

const getBeeers = (state: RootState) => state.beers.displayItems || []

const BeerListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`

const BeerCardContainer = styled(components.BeerCardContainer)`
  width: 100%; 
  border-bottom: 3px solid black;
  box-shadow: none;
  border-radius: 0;
  margin-left: 1rem;
  margin-right: 1rem;
` 

const ImgContainer = styled(components.ImgContainer)`
   height: auto
` 
const BodyContainer = styled(components.BodyContainer)`` 
const Header = styled(components.Header)`
  ${tw`text-base`}
` 
const BeerName = styled(components.BeerName)``
const Description = styled(components.Description)``
const Abv = styled(components.Abv)``


export default function BeerList() {
  const beers = useAppSelector(getBeeers)
  return (
    <BeerListContainer>
      {beers.map(beer => (
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
