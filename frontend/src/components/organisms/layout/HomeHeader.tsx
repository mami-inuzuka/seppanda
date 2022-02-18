import { memo, VFC } from 'react'
import { Link } from 'react-router-dom'

import { SettingsIcon } from '@chakra-ui/icons'
import { Box, Flex, Img } from '@chakra-ui/react'

import logo from 'assets/images/logo-horizon-white.svg'

export const HomeHeader: VFC = memo(() => (
  <Flex as="header" align="center" h="56px" p={4}>
    <Box flex="1" textAlign="center">
      <Img src={logo} />
    </Box>
    <Link to="/setting">
      <SettingsIcon w="24px" h="24px" color="white" />
    </Link>
  </Flex>
))
