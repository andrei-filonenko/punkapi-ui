import React from 'react'
import Button from '../../app/components/Button'
import { SearchBarContainer, ErrorMessage } from './styled'

interface Props {
  onChange: (txt: string) => void
  errorMessage?: string
  placeholder: string
  isLoading: boolean
}

export function SearchBar({
  onChange,
  errorMessage,
  placeholder,
  isLoading,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    onChange(e.target.value)
  }

  return (
    <SearchBarContainer className={errorMessage ? 'error' : ''}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <input
        disabled={isLoading}
        onChange={handleChange}
        type="text"
        placeholder={placeholder}
      />
      <Button
        primary
        disabled={!!errorMessage}
        loading={isLoading}
        className="px-2"
      >
        Find my beer
      </Button>
    </SearchBarContainer>
  )
}
