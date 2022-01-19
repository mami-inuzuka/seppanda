import { Table, Tbody, Td, Tr } from '@chakra-ui/react'
import { memo, VFC } from 'react'
import { Payment } from '../../types/payment'

type Props = {
  payments: Array<Payment>
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { payments } = props

  return (
    <Table variant="simple">
      <Tbody>
        {payments.map((payment) => (
          <Tr key={payment.id}>
            <Td>{payment.created_at}</Td>
            <Td>{payment.user}</Td>
            <Td isNumeric>{payment.amount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
})
