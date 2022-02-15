import { memo, VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'

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
    <Box>
      {paymentList.map((paymentListItem) =>
        paymentListItem.payments.map((payment, index) => (
          <>
            {index === 0 && (
              <Box bg="gray.50" fontSize="xs" color="gray.400" p={1}>
                <p>{DateTime.fromISO(payment.paidAt).toFormat('yyyy.MM.dd')}</p>
              </Box>
            )}
            <Flex
              justify="space-between"
              align="center"
              key={payment.id}
              onClick={() => handleRowClick(payment)}
              p={4}
              borderBottom="1px"
              borderBottomColor="gray.50"
            >
              <Image
                src={payment.avatar?.data}
                w="28px"
                h="28px"
                mr={3}
                border="2px"
                borderColor="brand.primary"
                borderRadius="100px"
                overflow="hidden"
              />
              <Text flex="1" fontSize="sm">
                {payment.detail}
              </Text>
              <Flex display="flex" align="baseline" _after={{ content: `"円"`, fontSize: 'xs' }}>
                <Text fontSize="md" fontWeight="bold" mr="2px">
                  {payment.amount.toLocaleString()}
                </Text>
              </Flex>
            </Flex>
          </>
        ))
      )}
    </Box>
  )
})
