import { FC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  onClickButton: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | (() => void)
  disabled: boolean
  bg: string
}

export const BarButton: FC<Props> = (props) => {
  const { children, onClickButton, disabled, bg } = props
  return (
    <Button type="submit" onClick={onClickButton} disabled={disabled} bg={bg} color="white" borderRadius="0" h="64px">
      {children}
    </Button>
  )
}
