import { Provider } from 'react-redux'
import { store } from '../../app/store'
import {
  beer,
  beer2,
  loadBeerActionDone,
  nonAlcoholic,
} from '../../test-utils/fixtures'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import BeerSearch from './BeerSearch'
import userEvent from '@testing-library/user-event';
import { renderIntoDocument } from 'react-dom/test-utils'

const server = setupServer(
  rest.get('https://api.punkapi.com/v2/beers', (req, res, ctx) => {
    debugger
    const query = req.url.searchParams
    return res(ctx.status(500))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderComponent() {
  const rendered = render(
    <Provider store={store}>
      <BeerSearch />
    </Provider>
  )
  return rendered
}

describe('<BeerSearch />', () => {
  // initial state of the component
  test('Renders search bar renders searchbar with radio for name and date', () => {
    const rendered = renderComponent()
    const searchForm = rendered.getByRole('search')

    expect(searchForm).toBeInTheDocument()

    const button = rendered.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button.textContent).toMatch(/find my beer/i)

    const searchInput = rendered.getByPlaceholderText(/Search By Beer Name/i)
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
  })

  test('loading state', async () => {
    const rendered = renderComponent()
    const searchField = rendered.getByRole('textbox')
    userEvent.type(searchField, 'n')
    // loading indicator should appear on a button
    const btn = rendered.getByText(/find my beer/i) as HTMLButtonElement
    userEvent.click(btn)
    // const spinner = await rendered.findAllByTestId('spinner')
    const nameEl = rendered.getByLabelText('By Name') as HTMLInputElement
    const dateEl = rendered.getByLabelText('By Date') as HTMLInputElement
    await waitFor(() => {
        return expect(btn).toBeDisabled()
    })
    expect(searchField).toBeDisabled()
    expect(nameEl).toBeDisabled()
    expect(dateEl).toBeDisabled()
  })

})
