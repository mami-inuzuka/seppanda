import { memo, VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'

import type { GetPaymentsResponse } from 'types/getPaymentsResponse'
import type { Payment } from 'types/payment'

type Props = {
  paymentsGroupByPaidAt: GetPaymentsResponse[]
}

export const PaymentList: VFC<Props> = memo((props) => {
  const { paymentsGroupByPaidAt } = props
  const history = useHistory()
  const handleRowClick = (payment: Payment) =>
    history.push({
      pathname: `/payments/${payment.id}`,
      state: { payment },
    })

  return (
    <Box>
      {paymentsGroupByPaidAt.map((paymentsData) =>
        paymentsData.payments.map((payment, index) => (
          <>
            <Box>{index === 0 && <p>{DateTime.fromISO(payment.paidAt).toFormat('yyyy.MM.dd')}</p>}</Box>
            <Flex justify="space-between" key={payment.id} onClick={() => handleRowClick(payment)}>
              <Image
                src={payment.avatar?.data}
                w="28px"
                h="28px"
                border="2px"
                borderColor="brand.primary"
                borderRadius="100px"
                overflow="hidden"
              />
              <Text flex="1">{payment.detail}</Text>
              <Box isNumeric display="flex" _after={{ content: `"円"`, fontSize: 'xs' }}>
                <Text fontSize="md" fontWeight="bold">
                  {payment.amount.toLocaleString()}
                </Text>
              </Box>
            </Flex>
          </>
        ))
      )}
    </Box>
  )
})
