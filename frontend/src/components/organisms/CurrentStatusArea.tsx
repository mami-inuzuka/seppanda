import { memo, useContext, VFC } from 'react'

import { Box, Center } from '@chakra-ui/react'

import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'

export const CurrentStatusArea: VFC = memo(() => {
  const { teamStatus } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)

  return (
    <Box p={16}>
      {currentUser?.id === teamStatus.largestPaymentUser?.id && (
        <Center>{teamStatus.smallestPaymentUser?.name}に返してもらう金額</Center>
      )}
      {currentUser?.id !== teamStatus.largestPaymentUser?.id && (
        <Center>{teamStatus.largestPaymentUser?.name}に返す金額</Center>
      )}
      <Center>{teamStatus.refundAmount}</Center>
    </Box>
  )
})
