import React, { ReactNode } from 'react'
import tw, { styled } from 'twin.macro'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  subject?: ReactNode
}

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

export default function EmptyState({ children, subject, ...rest }: Props) {
  return (
    <EmptyStateStyled {...rest}>
      <div className="icon">∅</div>
      <div className="subject">{subject || 'No items loaded'}</div>
      <div className="description">{children}</div>
    </EmptyStateStyled>
  )
}
