import { VFC } from 'react'

import { CloseIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

type Props = {
  onClick: () => void
}

export const CloseButton: VFC<Props> = (props) => {
  const { onClick } = props
  return (
    <Button w="64px" h="100%" borderRadius="0" backgroundColor="gray.100" onClick={onClick}>
      <CloseIcon />
    </Button>
  )
}
