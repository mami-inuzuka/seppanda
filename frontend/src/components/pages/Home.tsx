import { memo, VFC } from 'react'

import { Box, Center, Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import { Payment } from '../../types/payment'
import { PaymentList } from '../organisms/PaymentList'
import { CircleAddButton } from '../atoms/button/CircleAddButton'
import { Header } from '../organisms/layout/Header'
import { CurrentStatusArea } from '../organisms/CurrentStatusArea'
import { DangerButton } from '../atoms/button/DangerButton'
import { BasicModal } from '../organisms/BasicModal'
import { BasicAlert } from '../atoms/alert/BasicAlert'

export const Home: VFC = memo(() => {
  const payments: Array<Payment> = [
    {
      id: 1,
      amount: 600,
      user: 'hanako',
      created_at: '2022-01-15',
    },
    {
      id: 2,
      amount: 1000,
      user: 'hanako',
      created_at: '2022-01-15',
    },
    {
      id: 3,
      amount: 950,
      user: 'taro',
      created_at: '2022-01-15',
    },
    {
      id: 4,
      amount: 1280,
      user: 'hanako',
      created_at: '2022-01-13',
    },
  ]
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BasicModal isOpen={isOpen} onClose={onClose} size="xl" />
      <Header />
      <BasicAlert />
      <CurrentStatusArea />
      <Flex bgColor="gray.50" p={2} align="center">
        支払い履歴
        <Spacer />
        <Box onClick={onOpen}>
          <DangerButton>精算する</DangerButton>
        </Box>
      </Flex>
      <PaymentList payments={payments} />
      <Box position="fixed" bottom="24px" w="100%">
        <Center w="100%">
          <CircleAddButton />
        </Center>
      </Box>
    </>
  )
})
