/* eslint-disable @typescript-eslint/no-floating-promises */
import { memo, useContext, VFC } from 'react'

import { Box, Button } from '@chakra-ui/react'

import { PaymentContext } from 'context/PaymentContext'

import { PaymentListItem } from './PaymentListItem'

import type { Payment } from 'types/api/payment'

type Props = {
  paymentList: Payment[]
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { paymentList } = props
  const { handleFetchNextPage, currentPage } = useContext(PaymentContext)

  return (
    <Box data-testid="payment-list" paddingBottom="160px">
      {paymentList.map((payment, index) => {
        const isLastItem = paymentList.length === index + 1
        return <PaymentListItem payment={payment} isLastItem={isLastItem} />
      })}
      <Button
        onClick={() => {
          handleFetchNextPage()
        }}
      >
        {currentPage + 1}ページ目を読み込む
      </Button>
    </Box>
  )
})
