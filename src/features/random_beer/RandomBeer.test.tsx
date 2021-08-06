import { Provider } from 'react-redux'
import { store } from '../../app/store'
import RandomBeer from './RandomBeer'
import {
  beer,
  beer2,
  loadBeerActionDone,
  nonAlcoholic,
} from '../../test-utils/fixtures'
import { getImages } from '../../test-utils/util'
import { IBeer } from '../../app/schema'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

const server = setupServer(
  rest.get('https://api.punkapi.com/v2/beers/random', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([beer2]))
  }),
  rest.get('https://api.punkapi.com/v2/beers', (req, res, ctx) => {
    const query = req.url.searchParams
    const abv_lt = Number(query.get('abv_lt'))
    if (!isNaN(abv_lt) && abv_lt < 0.6 && abv_lt > 0) {
      return res(ctx.status(200), ctx.json(nonAlcoholic))
    }
    return res(ctx.status(500))
  })
)

beforeAll(() => {
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderCard() {
  const rendered = render(
    <Provider store={store}>
      <RandomBeer />
    </Provider>
  )
  store.dispatch(loadBeerActionDone())
  return rendered
}

describe('<RandomBeer />', () => {
  test('Renders beer attributes', () => {
    const rendered = renderCard()
    expect(rendered.getByText(beer.name)).toBeInTheDocument()
    expect(rendered.getByText(beer.description)).toBeInTheDocument()
    expect(rendered.getByText(`Abv. ${beer.abv}%`)).toBeInTheDocument()
    const image = Array.from(getImages())[0]
    expect(image.src).toEqual(beer.image_url)
  })

  test('Renders alternative image source', () => {
    render(
      <Provider store={store}>
        <RandomBeer />
      </Provider>
    )

    // sometimes image_url is empty
    const b: IBeer = {
      ...beer,
      image_url: null,
    }
    store.dispatch(loadBeerActionDone(b))

    const image = Array.from(getImages())[0]
    // we assume that if there is no image, it may be served from a keg
    expect(image.src).toMatch(/keg.png/)
  })

  test('Gets random beer', async () => {
    const rendered = renderCard()
    const btn = rendered.getByText(/get random beer/i)
    fireEvent.click(btn)
    // at first we see a loading spinner
    await waitFor(() => screen.getByText(/loading/i))
    expect(btn).toBeDisabled()
    // after a while, we see new beer populate the fields
    await waitFor(() => screen.getByText(beer2.name))
    expect(rendered.getByText(beer2.description)).toBeInTheDocument()
  })

  test('Gets random non alcoholic beer', async () => {
    // remove randomness from the test to make picking element
    // from a list determenitstic
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8)
    const rendered = renderCard()
    const btn = rendered.getByText(/Random Alcohol-Free/i)
    fireEvent.click(btn)

    // at first we see a loading spinner
    await waitFor(() => screen.getByText(/loading/i))
    expect(btn).toBeDisabled()

    // when new beer loads, the name updates
    await waitFor(() => screen.getByText(nonAlcoholic[1].name))

    // after a while, we see new beer populate the fields
    expect(rendered.getByText(nonAlcoholic[1].description)).toBeInTheDocument()
    // restore Math.random
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('Displays error state when there is a problem', async () => {
    const rendered = renderCard()
    const btn = rendered.getByText(/get random beer/i)
    const s = server
    s.resetHandlers(
      rest.get('https://api.punkapi.com/v2/beers/random', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    fireEvent.click(btn)
    await waitFor(() => screen.getByText(/loading/i))
    await waitFor(() => screen.getByRole('alert'))
  })
})
