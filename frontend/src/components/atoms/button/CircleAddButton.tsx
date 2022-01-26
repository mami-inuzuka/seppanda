import { memo, VFC } from 'react'

import { AddIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

export const CircleAddButton: VFC = memo(() => (
  <Button bgColor="green.500" w="60px" h="60px" borderRadius="60px">
    <AddIcon color="white" />
  </Button>
))
