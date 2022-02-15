import { memo, useContext, VFC } from 'react'

import { Box, Center, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { DangerButton } from 'components/atoms/button/DangerButton'
import { UserIcon } from 'components/atoms/icon/UserIcon'
import { BasicModal } from 'components/organisms/BasicModal'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'

export const CurrentStatusArea: VFC = memo(() => {
  const { teamStatus } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)
  const { isOpen: isOpenSettleModal, onOpen: onOpenSettleModal, onClose: onCloseSettleModal } = useDisclosure()

  return (
    <>
      <BasicModal isOpen={isOpenSettleModal} onClose={onCloseSettleModal} size="xl" />
      <Box p={12}>
        {teamStatus.refundAmount === 0 && '現在貸し借りはありません'}
        {teamStatus.refundAmount !== 0 && currentUser?.id === teamStatus.largestPaymentUser?.id && (
          <Flex justify="center" align="center">
            <Box mr={2}>
              <UserIcon user={teamStatus.smallestPaymentUser} size="32px" />
            </Box>
            に返してもらう金額
          </Flex>
        )}
        {teamStatus.refundAmount !== 0 && currentUser?.id !== teamStatus.largestPaymentUser?.id && (
          <Flex justify="center" align="center">
            <Box mr={2}>
              <UserIcon user={teamStatus.largestPaymentUser} size="32px" />
            </Box>
            に返す金額
          </Flex>
        )}
        <Center>
          <Text fontSize="56px" fontWeight="bold" _after={{ content: `"円"`, fontSize: '3xl' }}>
            {teamStatus.refundAmount !== 0 && teamStatus.refundAmount.toLocaleString()}
          </Text>
        </Center>
        <Center onClick={onOpenSettleModal}>
          <DangerButton>精算する</DangerButton>
        </Center>
      </Box>
    </>
  )
})
