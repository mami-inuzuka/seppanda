import { memo, VFC } from 'react'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export const CircleAddButton: VFC = memo(() => (
  <Button bgColor="green.500" w="60px" h="60px" borderRadius="60px">
    <AddIcon color="white" />
  </Button>
))
