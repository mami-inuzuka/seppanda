import { VFC } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

export const CloseButton: VFC = () => (
  <Button w="64px" h="100%" borderRadius="0" backgroundColor="gray.100">
    <CloseIcon />
  </Button>
)
