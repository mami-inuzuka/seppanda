import { Td, Tr } from '@chakra-ui/react'
import { memo, VFC } from 'react'

type Props = {
  amount: number
  user: string
  date: string
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { amount, user, date } = props

  return (
    <Tr>
      <Td>{date}</Td>
      <Td>{user}</Td>
      <Td isNumeric>{amount}</Td>
    </Tr>
  )
})
