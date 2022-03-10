import { useContext, VFC } from 'react'

import { Center, Text } from '@chakra-ui/react'

import { PaymentContext } from 'context/PaymentContext'
import { UserContext } from 'context/UserContext'

export const RefundAmount: VFC = () => {
  const { currentUser } = useContext(UserContext)
  const { teamStatus } = useContext(PaymentContext)
  return (
    <Center mb={4}>
      <Text
        fontSize="2.6rem"
        lineHeight="1"
        fontWeight="bold"
        color={currentUser?.isDebt ? 'red.500' : 'green.500'}
        _after={{ content: `"円"`, fontSize: '3xl' }}
      >
        {teamStatus.refundAmount === 0 ? '-' : teamStatus.refundAmount.toLocaleString()}
      </Text>
    </Center>
  )
}
