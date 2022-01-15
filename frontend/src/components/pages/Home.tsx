import { memo, VFC } from 'react'

import { Box, Center, Flex, Spacer, Table, Tbody } from '@chakra-ui/react'
import { Payment } from '../../types/payment'
import { PaymentList } from '../organisms/PaymentList'
import { CircleAddButton } from '../../atoms/button/CircleAddButton'
import { Header } from '../organisms/layout/Header'
import { CurrentStatusArea } from '../organisms/CurrentStatusArea'
import { DangerButton } from '../../atoms/button/DangerButton'

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
      <Header />
      <CurrentStatusArea />
      <Flex bgColor="gray.50" p={2} align="center">
        支払い履歴
        <Spacer />
        <DangerButton>精算する</DangerButton>
      </Flex>
      {paymentsData.map((data) => (
        <Table variant="simple">
          <Tbody>
            <PaymentList amount={data.amount} user={data.user} date={data.created_at} />
          </Tbody>
        </Table>
      ))}
      <Box position="fixed" bottom="24px" w="100%">
        <Center w="100%">
          <CircleAddButton />
        </Center>
      </Box>
    </>
  )
})
