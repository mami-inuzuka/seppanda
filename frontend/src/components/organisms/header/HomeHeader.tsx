import { VFC } from 'react'
import { Link } from 'react-router-dom'

import { SettingsIcon } from '@chakra-ui/icons'
import { Flex, Image } from '@chakra-ui/react'

import logo from 'assets/images/logo-horizon-white.svg'

export const HomeHeader: VFC = () => (
  <Flex as="header" align="center" justify="space-between" h="56px" p={4} data-testid="home-header">
    <Image src={logo} h="100%" />
    <Link to="/setting">
      <SettingsIcon w="24px" h="24px" color="white" />
    </Link>
  </Flex>
)
