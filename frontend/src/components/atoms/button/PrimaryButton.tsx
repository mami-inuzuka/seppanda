import { FC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  onClickButton: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | (() => void)
  disabled: boolean
  isLoading: boolean
}

export const PrimaryButton: FC<Props> = (props) => {
  const { children, onClickButton, disabled, isLoading } = props
  return (
    <Button
      bg="green.500"
      color="white"
      borderRadius="base"
      flex="1"
      h="64px"
      w="100%"
      border="1px solid rgba(46, 47, 46, 0.1)"
      boxShadow="0px 1px 0px #D7D7D7"
      onClick={onClickButton}
      disabled={disabled}
      isLoading={isLoading}
      _active={{ bg: 'green.600' }}
      _hover={{ bg: 'green.400' }}
    >
      {children}
    </Button>
  )
}
