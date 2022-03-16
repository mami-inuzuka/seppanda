import { useContext, VFC } from 'react'

import { Box, Text, useDisclosure } from '@chakra-ui/react'

import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { CardText } from 'components/molecules/CardText'
import { RefundAmount } from 'components/molecules/RefundAmount'
import { SettelementModal } from 'components/organisms/modal/SettlementModal'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'

export const CurrentStatusContents: VFC = () => {
  const { teamStatus } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)
  const { isOpen: isOpenSettleModal, onOpen: onOpenSettleModal, onClose: onCloseSettleModal } = useDisclosure()
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser && (
        <>
          <SettelementModal
            isOpen={isOpenSettleModal}
            onClose={onCloseSettleModal}
            size="xl"
            isDebt={currentUser?.isDebt}
            refundAmount={teamStatus.refundAmount}
            teamId={currentUser?.teamId}
          />
          <Box>
            {currentUser && teamStatus.isTeamCapacityReached ? (
              <>
                <CardText isDebt={currentUser.isDebt} refundAmount={teamStatus.refundAmount} />
                <RefundAmount isDebt={currentUser.isDebt} refundAmount={teamStatus.refundAmount} />
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
      )}
    </>
  )
}
