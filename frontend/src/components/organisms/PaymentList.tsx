import { memo, VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { Table, Tbody, Td, Tr } from '@chakra-ui/react'
import { DateTime } from 'luxon'

import type { Payment } from 'types/payment'

type Props = {
  payments: Payment[]
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { payments } = props
  const history = useHistory()
  const handleRowClick = (payment: Payment) =>
    history.push({
      pathname: `/payments/${payment.id}`,
      state: { payment },
    })
  return (
    <Table variant="simple">
      <Tbody>
        {payments.map((payment) => (
          <Tr key={payment.id} onClick={() => handleRowClick(payment)}>
            <Td>{DateTime.fromISO(payment.createdAt).toISODate()}</Td>
            <Td>{payment.user.name}</Td>
            <Td isNumeric>{payment.amount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
})
