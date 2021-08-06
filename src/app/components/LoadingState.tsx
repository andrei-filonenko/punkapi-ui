import React, { ReactNode } from 'react'
import Spinner from './Spinner'
import tw, { styled } from 'twin.macro'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const LoadingStateStyled = styled.div`
  ${tw`flex flex-col justify-center text-gray-600 my-8 p-4`}
  & > .spinner {
    ${tw`mx-auto mb-4`}
  }
`

export default function LoadingState({ children, ...rest }: Props) {
  return (
    <LoadingStateStyled role="alert" aria-busy="true" {...rest}>
      <Spinner className="spinner" />
      <div className="description">{children || 'Loading...'}</div>
    </LoadingStateStyled>
  )
}
