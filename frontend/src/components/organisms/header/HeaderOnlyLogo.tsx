import { VFC } from 'react'
import { Link } from 'react-router-dom'

import { Box, Flex, Image } from '@chakra-ui/react'

import logo from 'assets/images/logo-horizon-black.svg'

export const HeaderOnlyLogo: VFC = () => (
  <Flex as="header" justify="center" align="center" h="56px" borderBottom="1px" borderColor="gray.100" p={4}>
    <Box h="100%">
      <Link to="/welcome">
        <Image m="0 auto" h="100%" src={logo} />
      </Link>
    </Box>
  </Flex>
)
