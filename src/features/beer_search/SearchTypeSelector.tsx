import React, { useState } from 'react'
import { SearchTypeContainer } from './styled'

export function SearchTypeSelector({
  onChangeValue,
  isLoading,
}: {
  onChangeValue: (value: string) => void
  isLoading: boolean
}) {
  const [value, setValue] = useState('name')

  // component is small, no need for caching
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value !== e.target.value) {
      setValue(e.target.value)
      onChangeValue(e.target.value)
    }
  }

  return (
    <SearchTypeContainer 
      role="radiogroup"
      onChange={onChange}
      >
      <label>
        <input
          defaultChecked
          disabled={isLoading}
          type="radio"
          className="form-radio"
          name="searchType"
          value="name"
        />
        <span>By Name</span>
      </label>
      <label>
        <input
          disabled={isLoading}
          type="radio"
          className="form-radio"
          name="searchType"
          value="date"
        />
        <span>By Date</span>
      </label>
    </SearchTypeContainer>
  )
}
