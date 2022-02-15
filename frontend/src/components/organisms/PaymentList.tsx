import { memo, VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { Table, Tbody, Td, Text, Tr } from '@chakra-ui/react'
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
      <Tbody fontSize="sm">
        {payments.map((payment) => (
          <Tr key={payment.id} onClick={() => handleRowClick(payment)}>
            <Td>{DateTime.fromISO(payment.createdAt).toFormat('yyyy.MM.dd')}</Td>
            <Td>{payment.user.name}</Td>
            <Td isNumeric display="flex" _after={{ content: `"円"`, fontSize: 'xs' }}>
              <Text fontSize="md" fontWeight="bold">
                {payment.amount.toLocaleString()}
              </Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
})
