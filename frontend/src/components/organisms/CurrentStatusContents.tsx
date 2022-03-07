import { useContext, VFC } from 'react'

import { Box, Text, useDisclosure } from '@chakra-ui/react'

import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { CardText } from 'components/molcules/CardText'
import { RefundAmount } from 'components/molcules/RefundAmount'
import { SettelementModal } from 'components/organisms/modal/SettlementModal'
import { PaymentContext } from 'context/PaymentContext'

export const CurrentStatusContents: VFC = () => {
  const { teamStatus } = useContext(PaymentContext)
  const { isOpen: isOpenSettleModal, onOpen: onOpenSettleModal, onClose: onCloseSettleModal } = useDisclosure()
  return (
    <>
      <SettelementModal isOpen={isOpenSettleModal} onClose={onCloseSettleModal} size="xl" />
      <Box>
        {teamStatus.isTeamCapacityReached ? (
          <>
            <CardText />
            <RefundAmount />
            {teamStatus.refundAmount !== 0 && (
              <Box textAlign="center">
                <SecondaryButton size="sm" isFullWidth={false} onClick={onOpenSettleModal}>
                  精算する
                </SecondaryButton>
              </Box>
            )}
          </>
        ) : (
          <Box p={8} textAlign="center">
            <Text fontSize="sm" fontWeight="bold" mb={2}>
              おあいての登録が完了すると
              <br />
              表示されます
            </Text>
            <Text as="p" fontWeight="normal" fontSize="0.7rem">
              おあいての登録が完了したら
              <br />
              画面を再読み込みしてください
            </Text>
          </Box>
        )}
      </Box>
    </>
  )
}
