import { useContext, VFC } from 'react'

import { Center, Text } from '@chakra-ui/react'

import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'

export const RefundAmount: VFC = () => {
  const { currentUser } = useContext(AuthContext)
  const { teamStatus } = useContext(PaymentContext)
  return (
    <Center mb={4}>
      <Text
        fontSize="5xl"
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
