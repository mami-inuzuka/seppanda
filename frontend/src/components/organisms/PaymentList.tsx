import { memo, VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Flex, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'

import { UserIcon } from 'components/atoms/icon/UserIcon'

import type { Payment } from 'types/payment'
import type { PaymentListGroupByPaidAt } from 'types/paymentListGroupByPaidAt'

type Props = {
  paymentList: PaymentListGroupByPaidAt[]
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { paymentList } = props
  const history = useHistory()
  const handleRowClick = (payment: Payment) =>
    history.push({
      pathname: `/payments/${payment.id}`,
      state: { payment },
    })

  return (
    <>
      {paymentList.map((paymentListItem) => (
        <Box key={paymentListItem.date}>
          <Box bg="gray.100" fontSize="xs" color="gray.500" p={1}>
            {DateTime.fromISO(paymentListItem.date).toFormat('yyyy.MM.dd')}
          </Box>
          {paymentListItem.payments.map((payment) => (
            <Box key={payment.id}>
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
                <Text flex="1" fontSize="sm">
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
    </>
  )
})
