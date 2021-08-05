/**
 * Styled components are too small to warant their own files
 */
import tw, { styled } from 'twin.macro'

interface LoadingProps {
  state?: 'idle' | 'loading' | 'failure'
}

export const BeerCardContainer = styled.div<LoadingProps>`
  ${({ state = 'idle' }) => state === 'loading' && tw`opacity-50`}
  ${tw`
    transition-opacity duration-200
    md:rounded-md
    shadow-md my-5
    flex max-w-7xl 
    mx-auto py-6 sm:px-6 lg:px-8 
    h-full`
  }
`
export const ImgContainer = styled.div`
  ${tw`flex-none w-1/5 relative text-center h-80`}
  > img {
    ${tw`absolute mx-auto py-2 inset-0 h-full object-contain`}
  } `

export const BodyContainer = tw.div`flex flex-col flex-1 ml-5 px-3`

export const Header = tw.div`flex flex-col font-bold text-xl md:flex-row`

export const BeerName = tw.h2`tracking-widest uppercase font-bold text-left m-3 text-xl mr-auto`

export const Abv = tw.h3`px-3 italic font-serif oldstyle-nums my-3 text-left`

export const ActionButtons = styled.div`
    ${tw`flex space-x-3 mb-4 mt-auto pr-2 text-sm font-medium flex-col md:flex-row md:ml-3`}
    && > button:nth-child(2) {
      ${tw`md:flex-none md:px-3 m-0`}
    } 
    & > button:nth-child(1) {
      ${tw`md:(mr-2 mb-0) mb-2`}
    }
`

export const Description = styled.div`
    ${tw`flex`}
    > p {
      ${tw`text-sm p-2 m-1 text-left`}
    }
`;
