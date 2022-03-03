import { useContext, useState, VFC } from 'react'

import { Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay, Text, Grid, Box } from '@chakra-ui/react'
import axios from 'axios'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { settleTeamPayments } from 'lib/api/payment'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { ErrorResponse } from 'types/errorResponse'

type Props = {
  isOpen: boolean
  onClose: () => void
  size: string
}

export const SettelementModal: VFC<Props> = (props) => {
  const { isOpen, onClose, size } = props
  const { currentUser } = useContext(AuthContext)
  const { teamStatus, setPaymentList } = useContext(PaymentContext)
  const [processing, setProcessing] = useState<boolean>(false)
  const { errorToast, successToast } = useToast()

  const handleSettleTeamPayments = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProcessing(true)
    const idToken = await auth.currentUser?.getIdToken(true)
    if (currentUser) {
      try {
        await settleTeamPayments(currentUser.teamId, idToken)
        successToast('清算が完了しました')
        setPaymentList([])
      } catch (err) {
        if (axios.isAxiosError(err) && (err.response?.data as ErrorResponse).message) {
          errorToast((err.response?.data as ErrorResponse).message)
        } else {
          errorToast('エラーが発生しました')
        }
      } finally {
        onClose()
        setProcessing(false)
      }
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
              {teamStatus.refundAmount.toLocaleString()}
            </Text>
          </Box>
          <Grid gap={4}>
            <PrimaryButton isLoading={processing} onClickButton={handleSettleTeamPayments} disabled={processing}>
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
