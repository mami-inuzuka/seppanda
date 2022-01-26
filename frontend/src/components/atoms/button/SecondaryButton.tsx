import { FC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const SecondaryButton: FC<Props> = (props) => {
  const { children } = props
  return (
    <Button
      bg="gray.50"
      color="gray.900"
      borderRadius="base"
      flex="1"
      h="64px"
      w="100%"
      border="1px solid rgba(46, 47, 46, 0.1)"
      boxShadow="0px 1px 0px #D7D7D7"
    >
      {children}
    </Button>
  )
}
