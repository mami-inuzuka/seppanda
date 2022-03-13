import { memo, ReactNode, VFC } from 'react'

import { HeaderOnlyLogo } from 'components/organisms/header/HeaderOnlyLogo'

type Props = {
  children: ReactNode
}

export const HeaderOnlyLogoLayout: VFC<Props> = memo((props) => {
  const { children } = props
  return (
    <>
      <HeaderOnlyLogo />
      {children}
    </>
  )
})
