import { VFC } from 'react'

import { AddIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

export const CircleAddButton: VFC = () => (
  <Button
    bgColor="green.500"
    w="60px"
    h="60px"
    borderRadius="60px"
    _active={{ bg: 'green.600' }}
    _hover={{ bg: 'green.400' }}
    data-testid="circle-add-button"
  >
    <AddIcon color="white" />
  </Button>
)
