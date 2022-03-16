import { memo, VFC } from 'react'

import { Center, Text } from '@chakra-ui/react'

type Props = {
  isDebt: boolean
  refundAmount: number
}

export const RefundAmount: VFC<Props> = memo((props) => {
  const { isDebt, refundAmount } = props
  return (
    <Center mb={4} data-testid="refund-amount">
      <Text
        fontSize="2.6rem"
        lineHeight="1"
        fontWeight="bold"
        color={isDebt ? 'red.500' : 'green.500'}
        _after={{ content: `"円"`, fontSize: '3xl' }}
      >
        {refundAmount === 0 ? '-' : refundAmount.toLocaleString()}
      </Text>
    </Center>
  )
})
