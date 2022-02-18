import { memo, ReactNode, VFC } from 'react'

import { HomeHeader } from 'components/organisms/layout/HomeHeader'

type Props = {
  children: ReactNode
}

export const HomeHeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props
  return (
    <>
      <HomeHeader />
      {children}
    </>
  )
})
