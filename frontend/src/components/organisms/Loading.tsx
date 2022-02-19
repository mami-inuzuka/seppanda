import { VFC } from 'react'

import { Spinner } from '@chakra-ui/react'

export const Loading: VFC = () => (
  <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
)
