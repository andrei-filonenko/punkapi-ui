import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import { beer, loadBeerActionDone } from './test-utils/fixtures'


describe('<App />', () => {
  test('Renders loading initially', () => {
    const rendered = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(rendered.getByText(/Loading.../i)).toBeInTheDocument()
  })

  test('Displays UI after random beer is loaded initially', () => {
    const rendered = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    store.dispatch(loadBeerActionDone())
    expect(rendered.getByText(beer.name)).toBeInTheDocument()
    expect(rendered.getByText(beer.description)).toBeInTheDocument()
    expect(rendered.getByText(/Find my beer/)).toBeInTheDocument()
    expect(rendered.getByText(/Find awesome beer recepies/)).toBeInTheDocument()
  })
})
