import { VFC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  size: string
  isFullWidth: boolean
  onClick: () => void
  testId?: string
}

export const SecondaryButton: VFC<Props> = (props) => {
  const { children, size, isFullWidth, onClick, testId } = props

  return (
    <Button
      bg="gray.50"
      color="gray.900"
      borderRadius="base"
      flex="1"
      size={size}
      isFullWidth={isFullWidth}
      border="1px solid rgba(46, 47, 46, 0.1)"
      boxShadow="0px 1px 0px #D7D7D7"
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </Button>
  )
}
