import tw, { styled } from "twin.macro"

interface Props {
    primary?: boolean
}

const Button = styled.button<Props>`
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
export default Button
