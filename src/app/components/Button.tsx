import React, { ReactNode } from "react"
import tw, { styled } from "twin.macro"
import Spinner from './Spinner'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode 
    primary?: boolean
    loading?: boolean
} 

const ButtonContainer = styled.button<Props>`
  ${({ primary }) =>
    primary
      ? tw`
        bg-black text-white 
         hover:bg-gray-700
      `
      : tw`
        border border-gray-300 
        hover:(text-black border-black)
    `}
  ${tw`
     active:shadow-inner
     tracking-widest uppercase font-bold
     transition-colors duration-200
     flex 
     flex-auto
     items-center 
     justify-center 
     py-2
  `}
  :disabled {
    ${tw`opacity-75`}
  }
`

export default function Button({ primary, loading, disabled, children, ...rest}: Props) {
  return (
    <ButtonContainer {...{disabled: disabled || loading, primary}} {...rest}>
      {loading && <Spinner />}
      {children}
    </ButtonContainer>
  )
}