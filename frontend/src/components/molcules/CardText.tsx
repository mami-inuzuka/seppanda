import { useContext, VFC } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { PaymentContext } from 'context/PaymentContext'
import { UserContext } from 'context/UserContext'

export const CardText: VFC = () => {
  const { currentUser } = useContext(UserContext)
  const { teamStatus } = useContext(PaymentContext)
  return (
    <Flex fontSize="sm" fontWeight="bold" justify="center" align="center" mb={2}>
      {teamStatus.refundAmount === 0 ? (
        <Text>現在貸し借りはありません</Text>
      ) : (
        <>
          あいてに
          {currentUser?.isDebt ? (
            <Text bg="rgba(208, 57, 57, 0.1)" color="red.500" py={0.5} px={1.5} mx={1}>
              返す
            </Text>
          ) : (
            <Text bg="rgba(107, 178, 73, 0.1)" color="green.500" py={0.5} px={1.5} mx={1}>
              返してもらう
            </Text>
          )}
          金額
        </>
      )}
    </Flex>
  )
}
