import "./App.css"
import RandomBeer from "./features/random_beer/RandomBeer"
import BeerSearch from "./features/beer_search/BeerSearch"
import BeerList from "./features/beer_search/BeerList"

function App() {
  return (
    <div className="App">
      <RandomBeer />
      <BeerSearch />
      <BeerList />
    </div>
   
  )
}

export default App
