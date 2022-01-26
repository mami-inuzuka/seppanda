import { memo, VFC } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const DangerButton: VFC<Props> = memo((props) => {
  const { children } = props
  return (
    <Button bgColor="gray.50" borderRadius={4} border="1px" borderColor="gray.200" color="red.500">
      {children}
    </Button>
  )
})
