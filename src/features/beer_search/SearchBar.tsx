import React from 'react';
import Button from '../../app/components/Button';
import { SearchBarContainer, ErrorMessage } from "./styled";

export function SearchBar({
  onChange, errorMessage,
}: {
  onChange: (txt: string) => void;
  errorMessage?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <SearchBarContainer className={errorMessage ? 'error' : ''}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <input
        onChange={handleChange}
        type="text"
        placeholder="type the name to start a search" />
      <Button
        primary
        disabled={!!errorMessage}
        className="px-2"
      >
        Find my beer
      </Button>
    </SearchBarContainer>
  );
}
