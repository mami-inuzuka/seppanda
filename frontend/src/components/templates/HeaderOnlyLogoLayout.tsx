import { memo, ReactNode, VFC } from 'react'

import { HeaderOnlyLogo } from 'components/organisms/layout/HeaderOnlyLogo'

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
