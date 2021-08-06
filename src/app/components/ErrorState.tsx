import React, { ReactNode } from 'react'
import tw, { styled } from 'twin.macro'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  subject?: ReactNode
}

const ErrorStateStyled = styled.div`
  ${tw`flex flex-col justify-center text-pink-600 my-8 p-4`}

  & > .icon {
    ${tw`mx-auto mb-3 text-5xl text-gray-400`}
  }

  & > .subject {
    ${tw`mx-auto mb-4 font-bold uppercase`}
  }

  & > .message {
    ${tw`text-sm`}
  }
`

export default function ErrorState({ children, subject, ...rest }: Props) {
  return (
    <ErrorStateStyled role="alert" {...rest}>
      <div className="icon">⚠</div>
      <div className="subject">{subject || 'Error'}</div>
      <div className="message">{children}</div>
    </ErrorStateStyled>
  )
}
