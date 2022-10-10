/* eslint-disable @typescript-eslint/no-floating-promises */
import { memo, useContext, VFC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

import { UserIcon } from 'components/atoms/icon/UserIcon'
import { PaymentContext } from 'context/PaymentContext'

import type { Payment } from 'types/api/payment'

type Props = {
  paymentList: Payment[]
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { paymentList } = props
  const navigation = useNavigate()
  const handleRowClick = (payment: Payment) => navigation(`/payments/${payment.id}`, { state: { payment } })
  const { handleFetchNextPage, currentPage } = useContext(PaymentContext)

  return (
    <Box data-testid="payment-list">
      {paymentList.map((payment) => (
        <Box key={payment.id} data-testid="payment-list-item">
          <Flex
            justify="space-between"
            align="center"
            onClick={() => handleRowClick(payment)}
            p={4}
            borderBottom="1px"
            borderBottomColor="gray.100"
          >
            <Box mr={4}>
              <UserIcon user={payment.user} size="28px" />
            </Box>
            <Text flex="1" fontSize="sm" mr={2}>
              {payment.detail}
            </Text>
            <Flex display="flex" align="baseline" _after={{ content: `"円"`, fontSize: 'xs' }}>
              <Text fontSize="md" fontWeight="bold" mr="2px">
                {payment.amount.toLocaleString()}
              </Text>
            </Flex>
          </Flex>
        </Box>
      ))}
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
