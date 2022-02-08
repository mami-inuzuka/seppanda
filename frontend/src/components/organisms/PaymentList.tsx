import { memo, VFC } from 'react'

import { Table, Tbody, Td, Tr } from '@chakra-ui/react'

import type { Payment } from 'types/payment'

type Props = {
  payments: Payment[] | undefined
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { payments } = props
  return (
    <Table variant="simple">
      <Tbody>
        {payments?.map((payment) => (
          <Tr key={payment.id}>
            <Td>{payment.createdAt}</Td>
            <Td>{payment.user}</Td>
            <Td isNumeric>{payment.amount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
})
