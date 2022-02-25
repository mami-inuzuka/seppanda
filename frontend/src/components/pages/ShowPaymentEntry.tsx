import { useContext, useEffect, useState, VFC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input } from '@chakra-ui/react'

import { DangerButton } from 'components/atoms/button/DangerButton'
import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderWithTitleLayout } from 'components/templates/HeaderWithTitleLayout'
import { PaymentContext } from 'context/PaymentContext'
import { deletePayment, updatePayment } from 'lib/api/payment'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { Payment } from 'types/payment'
import type { PostPaymentParams } from 'types/postPaymentParams'

type stateType = {
  payment: Payment
}

export const ShowPaymentEntry: VFC = () => {
  const { paymentList, setPaymentList } = useContext(PaymentContext)
  const [inputAmount, setInputAmount] = useState<string>('')
  const [inputDetail, setInputDetail] = useState<string>('')
  const [inputPaidAt, setInputPaidAt] = useState<string>('')
  const [processingUpdate, setProcessingUpdate] = useState<boolean>(false)
  const [processingDelete, setProcessingDelete] = useState<boolean>(false)
  const { errorToast, successToast } = useToast()
  const history = useHistory()
  const location = useLocation()
  const state = location.state as stateType
  const { payment } = state
  const onClickClose = () => {
    history.push('/')
  }
  const inputAmoutError = inputAmount === '' || inputAmount === '0'
  const inputPaidAtError = inputPaidAt === ''
  const inputDetailError = inputDetail.length > 29

  const handleDeletePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProcessingDelete(true)
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      const res = await deletePayment(payment.id, idToken)
      if (res.status === 200) {
        setPaymentList(paymentList)
        onClickClose()
        successToast('支払い情報を削除しました')
      } else {
        errorToast('削除に失敗しました')
      }
    } catch {
      errorToast('削除に失敗しました')
    } finally {
      setProcessingDelete(false)
    }
  }

  const handleUpdateAmount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProcessingUpdate(true)
    const params: PostPaymentParams = {
      amount: inputAmount,
      detail: inputDetail,
      paid_at: inputPaidAt,
    }
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      const res = await updatePayment(params, payment.id, idToken)
      if (res.status === 200) {
        setPaymentList(paymentList)
        setInputAmount('')
        setInputDetail('')
        onClickClose()
        successToast('支払い情報を更新しました')
      } else {
        errorToast('更新に失敗しました')
      }
    } catch {
      errorToast('更新に失敗しました')
    } finally {
      setProcessingUpdate(false)
    }
  }

  useEffect(() => {
    setInputAmount(String(payment.amount))
    setInputDetail(payment.detail)
    setInputPaidAt(payment.paidAt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HeaderWithTitleLayout title="支払い情報の編集">
      <Flex flexDirection="column" p={6}>
        <form>
          <Grid gap={6}>
            <FormControl isInvalid={inputAmoutError}>
              <FormLabel htmlFor="amount">金額</FormLabel>
              <Input
                value={inputAmount}
                onChange={(event) => setInputAmount(event.target.value)}
                id="amount"
                name="amount"
                type="number"
                size="lg"
                placeholder="金額を入力"
              />
              {inputAmoutError ? <FormErrorMessage>金額を入力してください</FormErrorMessage> : ''}
            </FormControl>
            <FormControl isInvalid={inputDetailError}>
              <FormLabel htmlFor="detail">内容</FormLabel>
              <Input
                value={inputDetail}
                onChange={(event) => setInputDetail(event.target.value)}
                id="detail"
                name="detail"
                type="text"
                size="lg"
                placeholder="例）スーパー"
              />
              {inputDetailError && <FormErrorMessage>内容は28文字以下で入力してください</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={inputPaidAtError}>
              <FormLabel htmlFor="date">支払日</FormLabel>
              <Input
                value={inputPaidAt}
                onChange={(event) => setInputPaidAt(event.target.value)}
                id="date"
                type="date"
                size="lg"
                name="paid_at"
              />
              {inputPaidAtError ? <FormErrorMessage>金額を入力してください</FormErrorMessage> : ''}
            </FormControl>
            <Grid gap={4}>
              <PrimaryButton
                isLoading={processingUpdate}
                onClickButton={handleUpdateAmount}
                disabled={inputAmoutError || inputPaidAtError || inputDetailError || processingUpdate}
              >
                更新する
              </PrimaryButton>
              <DangerButton
                size="xl"
                isFullWidth
                onClick={handleDeletePayment}
                disabled={processingDelete}
                isLoading={processingDelete}
              >
                削除する
              </DangerButton>
            </Grid>
          </Grid>
        </form>
      </Flex>
    </HeaderWithTitleLayout>
  )
}
