import { memo, useContext, VFC } from 'react'

import { Box, Center, Text } from '@chakra-ui/react'

import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'

export const CurrentStatusArea: VFC = memo(() => {
  const { teamStatus } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)

  return (
    <Box p={12}>
      {teamStatus.refundAmount === 0 && '現在貸し借りはありません'}
      {teamStatus.refundAmount !== 0 && currentUser?.id === teamStatus.largestPaymentUser?.id && (
        <Center>{teamStatus.smallestPaymentUser?.name}に返してもらう金額</Center>
      )}
      {teamStatus.refundAmount !== 0 && currentUser?.id !== teamStatus.largestPaymentUser?.id && (
        <Center>{teamStatus.largestPaymentUser?.name}に返す金額</Center>
      )}
      <Center>
        <Text fontSize="56px" fontWeight="bold" _after={{ content: `"円"`, fontSize: '3xl' }}>
          {teamStatus.refundAmount !== 0 && teamStatus.refundAmount.toLocaleString()}
        </Text>
      </Center>
    </Box>
  )
})
