import { memo, useContext, VFC } from 'react'

import { Box, Text, useDisclosure } from '@chakra-ui/react'

import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { CardText } from 'components/molcules/CardText'
import { RefundAmount } from 'components/molcules/RefundAmount'
import { SettelementModal } from 'components/organisms/modal/SettlementModal'
import { PaymentContext } from 'context/PaymentContext'

export const CurrentStatusContents: VFC = memo(() => {
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
          <Text>おあいての登録が完了すると表示されます</Text>
        )}
      </Box>
    </>
  )
})
