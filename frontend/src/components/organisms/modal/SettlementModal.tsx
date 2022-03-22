import { memo, useContext, useState, VFC } from 'react'

import { Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay, Text, Grid, Box } from '@chakra-ui/react'
import axios from 'axios'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { PaymentContext } from 'context/PaymentContext'
import { settleTeamPayments } from 'lib/api/payment'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { ErrorResponse } from 'types/errorResponse'

type Props = {
  isOpen: boolean
  onClose: () => void
  size: string
  isDebt: boolean
  refundAmount: number
  teamId: number
}

export const SettelementModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, size, isDebt, refundAmount, teamId } = props
  const { setPaymentList } = useContext(PaymentContext)
  const { errorToast, successToast } = useToast()
  const [processing, setProcessing] = useState<boolean>(false)

  const handleSettleTeamPayments = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProcessing(true)
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      await settleTeamPayments(teamId, idToken)
      successToast('清算が完了しました')
      setPaymentList([])
    } catch (err) {
      if (axios.isAxiosError(err) && (err.response?.data as ErrorResponse).message) {
        errorToast((err.response?.data as ErrorResponse).message)
      } else {
        errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
      }
    } finally {
      onClose()
      setProcessing(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      <ModalOverlay />
      <ModalContent m={6} py={14} px={6} data-testid="settlement-modal">
        <ModalHeader align="center" mb={4} data-testid="settlement-modal-header">
          精算
        </ModalHeader>
        <ModalBody p={0} data-testid="settlement-modal-body">
          <Box mb={12}>
            <Text fontWeight="bold" align="center" mb={6}>
              おあいてに下記の金額を
              <br />
              {isDebt ? '返しましたか？' : '返してもらいましたか？'}
            </Text>
            <Text
              align="center"
              fontSize="5xl"
              lineHeight="1"
              fontWeight="bold"
              color={isDebt ? 'red.500' : 'green.500'}
              _after={{ content: `"円"`, fontSize: '3xl' }}
            >
              {refundAmount.toLocaleString()}
            </Text>
          </Box>
          <Grid gap={4}>
            <PrimaryButton isLoading={processing} onClick={handleSettleTeamPayments} disabled={processing}>
              {isDebt ? '返した' : '返してもらった'}ので清算する
            </PrimaryButton>
            <SecondaryButton onClick={onClose} size="xl" isFullWidth testId="settlement-modal-close-button">
              キャンセル
            </SecondaryButton>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
