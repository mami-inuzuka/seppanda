import { FC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  onClickButton: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | (() => void)
  disabled: boolean
}

export const PrimaryButton: FC<Props> = (props) => {
  const { children, onClickButton, disabled } = props
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
    >
      {children}
    </Button>
  )
}
