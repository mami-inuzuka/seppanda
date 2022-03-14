import { useContext, VFC } from 'react'

import { Box } from '@chakra-ui/react'

import { NoPaymentMessage } from 'components/organisms/NoPaymentMessage'
import { PaymentList } from 'components/organisms/PaymentList'
import { PaymentContext } from 'context/PaymentContext'

export const PaymentListArea: VFC = () => {
  const { paymentList } = useContext(PaymentContext)

  return <Box>{paymentList.length ? <PaymentList paymentList={paymentList} /> : <NoPaymentMessage />}</Box>
}
