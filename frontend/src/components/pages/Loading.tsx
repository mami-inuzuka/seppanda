import { VFC, memo } from 'react'

import { Flex, Spinner } from '@chakra-ui/react'

export const Loading: VFC = memo(() => (
  <Flex h="100vh" direction="column" justify="center" align="center" p={6}>
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
  </Flex>
))
