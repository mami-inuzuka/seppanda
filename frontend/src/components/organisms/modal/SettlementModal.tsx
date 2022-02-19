import { useContext, VFC } from 'react'

import { Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay, Text, Grid, Box } from '@chakra-ui/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { settleTeamPayments } from 'lib/api/payment'
import { useToast } from 'lib/toast'

type Props = {
  isOpen: boolean
  onClose: () => void
  size: string
}

export const SettelementModal: VFC<Props> = (props) => {
  const { isOpen, onClose, size } = props
  const { currentUser } = useContext(AuthContext)
  const { teamStatus } = useContext(PaymentContext)
  const { errorToast, successToast } = useToast()

  const handleSettleTeamPayments = async () => {
    try {
      const res = await settleTeamPayments(currentUser!.teamId)
      if (res?.status === 200) {
        successToast('清算が完了しました')
        onClose()
      } else {
        errorToast('処理に失敗しました')
      }
    } catch {
      errorToast('処理に失敗しました')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      <ModalOverlay />
      <ModalContent m={6} py={14} px={6}>
        <ModalHeader align="center" mb={4}>
          精算
        </ModalHeader>
        <ModalBody p={0}>
          <Box mb={12}>
            <Text fontWeight="bold" align="center" mb={6}>
              お相手に下記の金額を
              <br />
              {currentUser?.isDebt ? '返しましたか？' : '返してもらいましたか？'}
            </Text>
            <Text
              align="center"
              fontSize="5xl"
              lineHeight="1"
              fontWeight="bold"
              color={currentUser?.isDebt ? 'red.500' : 'green.500'}
              _after={{ content: `"円"`, fontSize: '3xl' }}
            >
              {teamStatus.refundAmount}
            </Text>
          </Box>
          <Grid gap={4}>
            <PrimaryButton onClickButton={handleSettleTeamPayments} disabled={false}>
              {currentUser?.isDebt ? '返した' : '返してもらった'}ので清算する
            </PrimaryButton>
            <SecondaryButton onClick={onClose} size="xl" isFullWidth>
              キャンセル
            </SecondaryButton>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
