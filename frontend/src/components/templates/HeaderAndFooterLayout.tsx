import { memo, ReactNode, VFC } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { Footer } from 'components/organisms/footer/Footer'
import { HeaderOnlyLogo } from 'components/organisms/header/HeaderOnlyLogo'

type Props = {
  children: ReactNode
}

export const HeaderAndFooterLayout: VFC<Props> = memo((props) => {
  const { children } = props
  return (
    <Flex minH="100vh" direction="column">
      <HeaderOnlyLogo />
      <Box flex="1">{children}</Box>
      <Footer />
    </Flex>
  )
})
