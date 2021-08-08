import { configureStore } from '@reduxjs/toolkit'
import {
  render as rtlRender,
  RenderResult as RtlRenderResult,
} from '@testing-library/react'
import queries from '@testing-library/dom/types/queries'
import { Provider } from 'react-redux'
import beerReducer from '../app/beerSlice'

export type RenderResult = RtlRenderResult<typeof queries, HTMLElement>

export function getImages() {
  return document.querySelectorAll('img') as NodeListOf<HTMLImageElement>
}

function render(comp: JSX.Element, renderOptions = {}) {
  const store = configureStore({
    reducer: { beers: beerReducer },
  })
  const ui = <Provider store={store}>{comp}</Provider>
  return rtlRender(ui, renderOptions)
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
