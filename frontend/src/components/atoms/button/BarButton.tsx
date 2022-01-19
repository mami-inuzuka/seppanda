import { Button } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BarButton: FC<Props> = (props) => {
  const { children } = props
  return (
    <Button bg="green.500" color="white" borderRadius="0" flex="1" h="100%">
      {children}
    </Button>
  )
}
