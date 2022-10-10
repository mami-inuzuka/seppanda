/* eslint-disable @typescript-eslint/no-floating-promises */
import { memo, useContext, VFC } from 'react'

import { Box } from '@chakra-ui/react'

import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { PaymentContext } from 'context/PaymentContext'

import { PaymentListItem } from './PaymentListItem'

import type { Payment } from 'types/api/payment'

type Props = {
  paymentList: Payment[]
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { paymentList } = props
  const { handleFetchNextPage, isLastPage, totalPages } = useContext(PaymentContext)
  return (
    <Box data-testid="payment-list" paddingBottom="160px">
      {paymentList.map((payment, index) => {
        const isLastItem = paymentList.length === index + 1
        return <PaymentListItem payment={payment} isLastItem={isLastItem} />
      })}
      <Box textAlign="center" margin="40px 0">
        {totalPages !== 1 && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {isLastPage ? (
              <Box color="gray.500">最後まで読み込みました</Box>
            ) : (
              <SecondaryButton size="sm" onClick={handleFetchNextPage} isFullWidth={false}>
                続きを読み込む
              </SecondaryButton>
            )}
          </>
        )}
      </Box>
    </Box>
  )
})
