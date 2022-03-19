import { VFC } from 'react'
import { Link } from 'react-router-dom'

import { Box, Flex, Image, Text } from '@chakra-ui/react'

import logo from 'assets/images/logo-horizon-gray-400.svg'

export const Footer: VFC = () => (
  <Box as="footer" color="gray.400" borderTopWidth="1px" borderColor="gray.100" data-testid="footer">
    <Flex w="100%" px={4} py={10} align="center" direction="column" justifyContent="center">
      <Link to="/welcome">
        <Image src={logo} w="130px" m="0 auto" mb={5} />
      </Link>
      <Flex fontSize="xs">
        <Text as="span" textDecoration="underline" px={2}>
          <Link to="/terms">利用規約</Link>
        </Text>
        <Text as="span" textDecoration="underline" px={2}>
          <Link to="/policy">プライバシーポリシー</Link>
        </Text>
      </Flex>
    </Flex>
    <Text fontSize="xs" p={2} align="center">
      ©2022
      <a href="https://twitter.com/mami_inuzuka">mami-inuzuka</a>
    </Text>
  </Box>
)
