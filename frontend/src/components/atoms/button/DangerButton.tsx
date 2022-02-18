import { memo, VFC } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  isFullWidth: boolean
  size: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | (() => void)
}

export const DangerButton: VFC<Props> = memo((props) => {
  const { children, size, isFullWidth, onClick } = props
  return (
    <Button
      bgColor="gray.50"
      borderRadius={4}
      border="1px"
      borderColor="gray.200"
      color="red.500"
      onClick={onClick}
      size={size}
      isFullWidth={isFullWidth}
    >
      {children}
    </Button>
  )
})
