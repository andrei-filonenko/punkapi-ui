import React, { useState } from 'react'
import { SearchTypeContainer } from './styled'

export function SearchTypeSelector({
  onChangeValue,
}: {
  onChangeValue: (value: string) => void
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
    <SearchTypeContainer onChange={onChange}>
      <label>
        <input
          defaultChecked
          type="radio"
          className="form-radio"
          name="accountType"
          value="name"
        />
        <span>By Name</span>
      </label>
      <label>
        <input
          type="radio"
          className="form-radio"
          name="accountType"
          value="date"
        />
        <span>By Date</span>
      </label>
    </SearchTypeContainer>
  )
}
