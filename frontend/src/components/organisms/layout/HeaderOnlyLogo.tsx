import { VFC } from 'react'

import { Flex, Img } from '@chakra-ui/react'

import logo from 'assets/images/logo-horizon-black.svg'

export const HeaderOnlyLogo: VFC = () => (
  <Flex as="header" align="center" h="56px" borderBottom="1px" borderColor="gray.100" p={4}>
    <Img m="0 auto" h="100%" src={logo} />
  </Flex>
)
