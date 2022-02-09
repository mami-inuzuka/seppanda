import { FC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  onClickButton: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | (() => void)
  disabled: boolean
}

export const BarButton: FC<Props> = (props) => {
  const { children, onClickButton, disabled = false } = props
  return (
    <Button
      type="submit"
      onClick={onClickButton}
      disabled={disabled}
      bg="green.500"
      color="white"
      borderRadius="0"
      flex="1"
      h="100%"
    >
      {children}
    </Button>
  )
}
