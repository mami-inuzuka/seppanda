/* eslint-disable @typescript-eslint/no-floating-promises */
import { memo, VFC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Flex, Text } from '@chakra-ui/react'

import { UserIcon } from 'components/atoms/icon/UserIcon'

import type { Payment } from 'types/api/payment'

type Props = {
  payment: Payment
  isLastItem: boolean
}

export const PaymentListItem: VFC<Props> = memo(({ payment, isLastItem }) => {
  const navigation = useNavigate()
  const handleRowClick = () => navigation(`/payments/${payment.id}`, { state: { payment } })

  return (
    <Box key={payment.id} data-testid="payment-list-item" id={isLastItem ? 'last-item' : ''}>
      <Flex
        justify="space-between"
        align="center"
        onClick={() => handleRowClick()}
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
  )
})
