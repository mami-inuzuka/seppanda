import { memo, ReactNode, VFC } from 'react'

import { HeaderWithTitle } from 'components/organisms/header/HeaderWithTitle'

type Props = {
  children: ReactNode
  title: string
}

export const HeaderWithTitleLayout: VFC<Props> = memo((props) => {
  const { children, title } = props
  return (
    <>
      <HeaderWithTitle>{title}</HeaderWithTitle>
      {children}
    </>
  )
})
