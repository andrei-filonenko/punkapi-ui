import { useCallback, useState } from 'react'
import { BeerName, FormattedDate } from '../../app/schema'
import { SearchTypeSelector } from './SearchTypeSelector'
import { SearchBar } from './SearchBar'
import { SearchSectionContainer } from './styled'
import { fetchBeersByDate, fetchBeersByName } from '../../app/beerSlice'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppSelector } from '../../app/hooks'

const getLoadingState = (state: RootState) => state.beers.areBeersLoading

export default function BeerSearch() {
  const dispatch = useDispatch()

  const isLoading = useAppSelector(getLoadingState)

  const [searchType, setSearchType] = useState('name')
  const [text, setText] = useState('')
  const [validationMessage, setValidationMessage] = useState<
    string | undefined
  >(undefined)

  const handleTextUpdate = useCallback(
    (text: string) => {
      let success: boolean
      let vm
      if (!text) {
        setText('')
        setValidationMessage(undefined)
        return
      }
      if (searchType === 'name') {
        success = BeerName.validate(text).success
        vm = 'Only strings, numbers and hyphens are allowed'
      } else {
        success = FormattedDate.validate(text).success
        vm = 'Date should be in YYYY_MM format'
      }
      setText(text)
      setValidationMessage(success ? undefined : vm)
    },
    [searchType]
  )

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!text?.length) {
        return
      }
      if (searchType === 'name') {
        dispatch(fetchBeersByName(text))
      } else {
        const date = new Date(Date.parse(text))
        dispatch(fetchBeersByDate(date))
      }
    },
    [text, searchType, dispatch]
  )

  const handleSearchType = useCallback(
    (t) => {
      setSearchType(t)
    },
    [setSearchType]
  )

  return (
    <SearchSectionContainer>
      <form className="filter" role="search" onSubmit={handleSubmit}>
        <SearchBar
          isLoading={isLoading}
          placeholder={
            searchType === 'date'
              ? 'Date the beer brewed before e.g. 2019 or 2018-10'
              : 'Beer name'
          }
          errorMessage={validationMessage}
          onChange={handleTextUpdate}
        />
        <SearchTypeSelector
          isLoading={isLoading}
          onChangeValue={handleSearchType}
        />
      </form>
    </SearchSectionContainer>
  )
}
