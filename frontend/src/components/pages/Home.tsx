import { memo, VFC } from 'react'

import { Box, Table, Tbody } from '@chakra-ui/react'
import { Payment } from '../../types/payment'
import { PaymentList } from '../organisms/PaymentList'

export const Home: VFC = memo(() => {
  const paymentsData: Array<Payment> = [
    {
      amount: 600,
      user: 'hanako',
      created_at: '2022-01-15',
    },
    {
      amount: 1000,
      user: 'hanako',
      created_at: '2022-01-15',
    },
    {
      amount: 950,
      user: 'taro',
      created_at: '2022-01-15',
    },
    {
      amount: 1280,
      user: 'hanako',
      created_at: '2022-01-13',
    },
  ]
  return (
    <>
      <div>せっぱんだ</div>
      <div>32,670</div>
      <Box bgColor="gray.100">支払い履歴</Box>
      {paymentsData.map((data) => (
        <Table variant="simple">
          <Tbody>
            <PaymentList amount={data.amount} user={data.user} date={data.created_at} />
          </Tbody>
        </Table>
      ))}
    </>
  )
})
