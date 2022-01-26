import { VFC } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  label: string
  value: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const CalculatorButton: VFC<Props> = (props) => {
  const { label, value, onClick } = props
  return (
    <Button data-value={value} bg="gray.50" h="100%" fontSize="32px" onClick={onClick}>
      {label}
    </Button>
  )
}
