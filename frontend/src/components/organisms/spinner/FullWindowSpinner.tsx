import { VFC } from 'react'

import { Flex, Spinner } from '@chakra-ui/react'

export const FullWindowSpinner: VFC = () => (
  <Flex
    w="100%"
    h="100vh"
    direction="column"
    justify="center"
    align="center"
    p={6}
    position="fixed"
    top="0"
    left="0"
    bg="rgba(255,255,255,0.7)"
    zIndex="1"
  >
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
  </Flex>
)
