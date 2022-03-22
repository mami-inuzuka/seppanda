import { memo, VFC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Flex, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'

import { UserIcon } from 'components/atoms/icon/UserIcon'

import type { Payment, PaymentListGroupByPaidAt } from 'types/api/payment'

type Props = {
  paymentList: PaymentListGroupByPaidAt[]
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { paymentList } = props
  const navigation = useNavigate()
  const handleRowClick = (payment: Payment) => navigation(`/payments/${payment.id}`, { state: { payment } })

  return (
    <Box data-testid="payment-list">
      {paymentList.map((paymentListItem) => (
        <Box key={paymentListItem.date} data-testid="payment-list-group">
          <Box bg="gray.100" fontSize="xs" color="gray.500" p={1}>
            {DateTime.fromISO(paymentListItem.date).toFormat('yyyy.MM.dd')}
          </Box>
          {paymentListItem.payments.map((payment) => (
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
        </Box>
      ))}
    </Box>
  )
})
