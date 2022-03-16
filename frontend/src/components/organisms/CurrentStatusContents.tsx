import { VFC } from 'react'

import { Box, Text, useDisclosure } from '@chakra-ui/react'

import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { CardText } from 'components/molecules/CardText'
import { RefundAmount } from 'components/molecules/RefundAmount'
import { SettelementModal } from 'components/organisms/modal/SettlementModal'

type Props = {
  isDebt: boolean
  refundAmount: number
  teamId: number
  isTeamCapacityReached: boolean
}

export const CurrentStatusContents: VFC<Props> = (props) => {
  const { isDebt, refundAmount, teamId, isTeamCapacityReached } = props
  const { isOpen: isOpenSettleModal, onOpen: onOpenSettleModal, onClose: onCloseSettleModal } = useDisclosure()
  return (
    <Box data-testid="current-status-contents">
      <SettelementModal
        isOpen={isOpenSettleModal}
        onClose={onCloseSettleModal}
        size="xl"
        isDebt={isDebt}
        refundAmount={refundAmount}
        teamId={teamId}
      />
      <Box>
        {isTeamCapacityReached ? (
          <>
            <CardText isDebt={isDebt} refundAmount={refundAmount} />
            <RefundAmount isDebt={isDebt} refundAmount={refundAmount} />
            {refundAmount !== 0 && (
              <Box textAlign="center">
                <SecondaryButton
                  size="sm"
                  isFullWidth={false}
                  onClick={onOpenSettleModal}
                  testId="current-status-contents-settlement-button"
                >
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
    </Box>
  )
}
