import { memo, VFC } from 'react'

import { Box } from '@chakra-ui/react'

import { NoPaymentMessage } from 'components/organisms/NoPaymentMessage'
import { PaymentList } from 'components/organisms/PaymentList'

import type { Payment } from 'types/api/payment'

type Props = {
  paymentList: Payment[]
}

export const PaymentListArea: VFC<Props> = memo((props) => {
  const { paymentList } = props

  return <Box>{paymentList.length ? <PaymentList paymentList={paymentList} /> : <NoPaymentMessage />}</Box>
})
