import React, { ReactNode } from 'react'
import tw, { styled } from 'twin.macro'

const EmptyStateStyled = styled.div`
  ${tw`flex flex-col justify-center text-gray-600 my-8 p-4`}

  & > .icon {
    ${tw`mx-auto mb-3 text-5xl text-gray-400`}
  }

  & > .subject {
    ${tw`mx-auto mb-4 font-bold uppercase`}
  }

  & > .description {
    ${tw`text-sm`}
  }
`

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  subject?: ReactNode
  icon?:  ReactNode
}

export default function EmptyState({
  children,
  subject,
  icon = '∅',
  ...rest
}: Props) {
  return (
    <EmptyStateStyled role="alert" {...rest}>
      <div className="icon">{icon}</div>
      <div className="subject">{subject || 'No items loaded'}</div>
      <div className="description">{children}</div>
    </EmptyStateStyled>
  )
}
