import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react'
import BeerSearch from './BeerSearch'
import userEvent from '@testing-library/user-event'
import BeerList from './BeerList'
import { largeBeerList } from '../../test-utils/fixtures'

const witness = jest.fn()

const server = setupServer(
  rest.get('https://api.punkapi.com/v2/beers', (req, res, ctx) => {
    const query = req.url.searchParams
    const name = query.get('beer_name')
    const date = query.get('brewed_before')
    witness(query.toString())
    if (name === 'Corona Extra') {
      return res(ctx.json(largeBeerList(10)))
    }
    if (date === '1-2015') {
      return res(ctx.json(largeBeerList(5)))
    }
    return res(ctx.status(500))
  })
)

beforeAll(() => server.listen())
beforeEach(() => {
  jest.clearAllMocks()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

function renderComponent() {
  const rendered = render(
    <Provider store={store}>
      <BeerSearch />
      <BeerList />
    </Provider>
  )
  return rendered
}

describe('beer search functionality', () => {
  // initial state of the component
  test('Initial load components', () => {
    const rendered = renderComponent()
    const searchForm = rendered.getByRole('search')

    expect(searchForm).toBeInTheDocument()

    const button = rendered.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button.textContent).toMatch(/find my beer/i)

    const searchInput = rendered.getByPlaceholderText(/Beer name/i)
    expect(searchInput).toBeInTheDocument()

    const searchTypeRadioGroup = rendered.getByRole('radiogroup')
    expect(searchTypeRadioGroup).toBeInTheDocument()

    const searchTypeRadios = rendered.getAllByRole('radio')
    expect(searchTypeRadios.length).toEqual(2)

    const nameEl = rendered.getByLabelText('By Name') as HTMLInputElement
    const dateEl = rendered.getByLabelText('By Date') as HTMLInputElement

    expect(nameEl).toBeInTheDocument()
    expect(nameEl.value).toEqual('name')
    expect(nameEl.name).toEqual('searchType')
    expect(nameEl.defaultChecked).toEqual(true)

    expect(dateEl).toBeInTheDocument()
    expect(dateEl.value).toEqual('date')
    expect(dateEl.name).toEqual('searchType')
    expect(dateEl.defaultChecked).toEqual(false)

    expect(
      rendered.getByText(/find awesome beer recepies/i)
    ).toBeInTheDocument()
  })

  test('loading state', async () => {
    const rendered = renderComponent()
    const searchField = rendered.getByRole('textbox')
    fireEvent.change(searchField, { target: { value: 'Corona Extra' } })
    const btn = rendered.getByText(/find my beer/i) as HTMLButtonElement
    userEvent.click(btn)
    const nameEl = rendered.getByLabelText('By Name') as HTMLInputElement
    const dateEl = rendered.getByLabelText('By Date') as HTMLInputElement
    await waitFor(() => {
      return expect(btn).toBeDisabled()
    })
    expect(searchField).toBeDisabled()
    expect(nameEl).toBeDisabled()
    expect(dateEl).toBeDisabled()

    expect(rendered.getByText(/Loading list of beers/i)).toBeInTheDocument()
  })

  test('placeholder change', async () => {
    const rendered = renderComponent()
    const searchField = rendered.getByRole('textbox') as HTMLInputElement
    const nameEl = rendered.getByLabelText('By Name') as HTMLInputElement
    const dateEl = rendered.getByLabelText('By Date') as HTMLInputElement
    expect(searchField.placeholder).toMatch(/beer name/i)
    fireEvent.click(dateEl)
    expect(searchField.placeholder).toMatch(/date the beer brewed/i)
    fireEvent.click(nameEl)
    expect(searchField.placeholder).toMatch(/beer name/i)
  })

  test('Name validation messages', async () => {
    const rendered = renderComponent()
    const searchField = rendered.getByRole('textbox')
    expect(
      rendered.queryByText(/Only strings, numbers and hyphens are allowed/)
    ).toBeNull()
    fireEvent.change(searchField, { target: { value: 'Corona Extra' } })
    expect(
      rendered.queryByText(/Only strings, numbers and hyphens are allowed/)
    ).toBeNull()
    fireEvent.change(searchField, { target: { value: '¯_(ツ)_/¯' } })
    expect(
      rendered.getByText(/Only strings, numbers and hyphens are allowed/)
    ).toBeInTheDocument()
  })

  test('Date validation messages', async () => {
    const rendered = renderComponent()
    const searchField = rendered.getByRole('textbox')
    // click on date to set date
    const dateEl = rendered.getByLabelText('By Date') as HTMLInputElement
    fireEvent.click(dateEl)
    expect(rendered.queryByText(/Date should be in YYYY_MM format/)).toBeNull()
    fireEvent.change(searchField, { target: { value: '2020-11' } })
    expect(rendered.queryByText(/Date should be in YYYY_MM format/)).toBeNull()
    fireEvent.change(searchField, { target: { value: '12/2020' } })
    expect(
      rendered.getByText(/Date should be in YYYY_MM format/)
    ).toBeInTheDocument()
    fireEvent.change(searchField, { target: { value: '¯_(ツ)_/¯' } })
    expect(
      rendered.getByText(/Date should be in YYYY_MM format/)
    ).toBeInTheDocument()
  })

  test('Search beers by name', async () => {
    jest.clearAllMocks()
    const rendered = renderComponent()
    const searchField = rendered.getByRole('textbox')
    userEvent.type(searchField, 'Corona Extra')
    const btn = rendered.getByText(/find my beer/i) as HTMLButtonElement
    fireEvent.click(btn)
    await waitFor(() => {
      return expect(btn).toBeDisabled()
    })
    await waitFor(() => {
      return expect(searchField).toBeDisabled()
    })
    await waitFor(() => {
      return expect(btn.disabled).toEqual(false)
    })
    // expect 10 beer cards
    const beerCard = rendered.getAllByRole('listitem')
    expect(beerCard).toHaveLength(10)

    screen.debug()
  })

  test('Search beers by date', async () => {
    const rendered = renderComponent()
    const searchField = rendered.getByRole('textbox')
    const dateEl = rendered.getByLabelText('By Date') as HTMLInputElement
    fireEvent.click(dateEl)
    userEvent.type(searchField, '2015')
    const btn = rendered.getByText(/find my beer/i) as HTMLButtonElement
    fireEvent.click(btn)
    await waitFor(() => {
      return expect(btn).toBeDisabled()
    })
    await waitFor(() => {
      return expect(btn.disabled).toEqual(false)
    })
    // expect 5 beer cards
    const beerCard = await rendered.findAllByRole('listitem')
    expect(beerCard).toHaveLength(5)

    // api should have been called with beer name
    expect(witness).toHaveBeenCalledTimes(1) // results are small
    expect(witness).toHaveBeenCalledWith(
      'brewed_before=1-2015&page=1&per_page=80'
    )

    screen.debug()
  })
})
