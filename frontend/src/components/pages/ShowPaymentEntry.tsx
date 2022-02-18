import { useContext, useEffect, VFC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Flex, FormControl, FormLabel, Grid, Input } from '@chakra-ui/react'

import { DangerButton } from 'components/atoms/button/DangerButton'
import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderWithTitleLayout } from 'components/templates/HeaderWithTitleLayout'
import { PaymentContext } from 'context/PaymentContext'
import { deletePayment, updatePayment } from 'lib/api/payment'
import { useToast } from 'lib/toast'

import type { Payment } from 'types/payment'
import type { PostPaymentParams } from 'types/postPaymentParams'

type stateType = {
  payment: Payment
}

export const ShowPaymentEntry: VFC = () => {
  const {
    inputAmount,
    setInputAmount,
    inputDetail,
    setInputDetail,
    inputPaidAt,
    setInputPaidAt,
    paymentList,
    setPaymentList,
  } = useContext(PaymentContext)
  const { errorToast, successToast } = useToast()
  const history = useHistory()
  const location = useLocation()
  const state = location.state as stateType
  const { payment } = state

  const onClickClose = () => {
    history.push('/')
  }

  const handleDeletePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const res = await deletePayment(payment.id)
      if (res.status === 200) {
        setPaymentList(paymentList)
        onClickClose()
        successToast('支払い情報を削除しました')
      } else {
        errorToast('削除に失敗しました')
      }
    } catch {
      errorToast('削除に失敗しました')
    }
  }

  const handleUpdateAmount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: PostPaymentParams = {
      amount: inputAmount,
      detail: inputDetail,
      paid_at: inputPaidAt,
    }

    try {
      const res = await updatePayment(params, payment.id)
      if (res.status === 200) {
        setPaymentList(paymentList)
        onClickClose()
        successToast('支払い情報を更新しました')
      } else {
        errorToast('更新に失敗しました')
      }
    } catch {
      errorToast('更新に失敗しました')
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
            <FormControl>
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
            </FormControl>
            <FormControl>
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
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date">支払日</FormLabel>
              <Input
                value={inputPaidAt}
                onChange={(event) => setInputPaidAt(event.target.value)}
                id="date"
                type="date"
                size="lg"
                name="paid_at"
              />
            </FormControl>
            <Grid gap={4}>
              <PrimaryButton onClickButton={handleUpdateAmount} disabled={inputAmount === '' || inputAmount === '0'}>
                更新する
              </PrimaryButton>
              <DangerButton size="xl" isFullWidth onClick={handleDeletePayment}>
                削除する
              </DangerButton>
            </Grid>
          </Grid>
        </form>
      </Flex>
    </HeaderWithTitleLayout>
  )
}
