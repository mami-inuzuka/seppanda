import { VFC } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  label: string
  value: string
}

export const CalculatorButton: VFC<Props> = (props) => {
  const { label, value } = props
  return (
    <Button data-value={value} bg="gray.50" h="100%" fontSize="32px">
      {label}
    </Button>
  )
}
