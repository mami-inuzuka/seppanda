import { useContext, useState, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'

import { Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input } from '@chakra-ui/react'
import axios from 'axios'

import { DangerButton } from 'components/atoms/button/DangerButton'
import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderWithTitleLayout } from 'components/templates/HeaderWithTitleLayout'
import { PaymentContext } from 'context/PaymentContext'
import { deletePayment, updatePayment } from 'lib/api/payment'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { Payment, PostPaymentParams } from 'types/api/payment'
import type { MultipleErrorResponse } from 'types/multipleErrorResponses'

type stateType = {
  payment: Payment
}

export const ShowPaymentEntry: VFC = () => {
  const { isUpdatedPaymentList, setIsUpdatedPaymentList } = useContext(PaymentContext)
  const { errorToast, successToast } = useToast()
  const [processingDelete, setProcessingDelete] = useState<boolean>(false)
  const navigation = useNavigate()
  const location = useLocation()
  const state = location.state as stateType
  const { payment } = state
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<PostPaymentParams>({
    mode: 'all',
    defaultValues: {
      amount: String(payment.amount),
      detail: payment.detail,
      paidAt: payment.paidAt,
    },
  })

  const handleDeletePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProcessingDelete(true)
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      await deletePayment(payment.id, idToken)
      setIsUpdatedPaymentList(!isUpdatedPaymentList)
      navigation('/home')
      successToast('支払い情報を削除しました')
    } catch {
      errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
    } finally {
      setProcessingDelete(false)
    }
  }

  const handleUpdateAmount = async (params: PostPaymentParams) => {
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      await updatePayment(params, payment.id, idToken)
      setIsUpdatedPaymentList(!isUpdatedPaymentList)
      navigation('/home')
      successToast('支払い情報を更新しました')
    } catch (err) {
      if (axios.isAxiosError(err) && (err.response?.data as MultipleErrorResponse).messages) {
        ;(err.response?.data as MultipleErrorResponse).messages.forEach((message) => {
          errorToast(message)
        })
      } else {
        errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
      }
    }
  }

  return (
    <HeaderWithTitleLayout title="支払い情報の編集">
      <Flex flexDirection="column" p={6}>
        <form>
          <Grid gap={6}>
            <FormControl isInvalid={!!errors?.amount} errortext={errors?.amount?.message}>
              <FormLabel htmlFor="amount">金額</FormLabel>
              <Input
                id="amount"
                type="tel"
                size="lg"
                placeholder="金額を入力"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('amount', {
                  required: '金額を入力してください',
                  min: {
                    value: 1,
                    message: '0円以上で入力してください',
                  },
                  max: {
                    value: 999999,
                    message: '999,999円以下で入力してください',
                  },
                })}
              />
              <FormErrorMessage>{errors.amount && errors.amount?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.detail} errortext={errors?.detail?.message}>
              <FormLabel htmlFor="detail">内容</FormLabel>
              <Input
                id="detail"
                type="text"
                size="lg"
                placeholder="例）スーパー"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('detail', {
                  maxLength: {
                    value: 28,
                    message: '28文字以下で入力してください',
                  },
                })}
              />
              <FormErrorMessage>{errors.detail && errors.detail?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.paidAt} errortext={errors?.paidAt?.message}>
              <FormLabel htmlFor="paid_at">支払日</FormLabel>
              <Input
                id="paid_at"
                type="date"
                size="lg"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('paidAt', {
                  required: '支払日を入力してください',
                })}
              />
              <FormErrorMessage>{errors.paidAt && errors.paidAt?.message}</FormErrorMessage>
            </FormControl>
            <Grid gap={4}>
              <PrimaryButton
                onClick={handleSubmit(handleUpdateAmount)}
                isLoading={formState.isSubmitting}
                disabled={!formState.isValid || formState.isSubmitting}
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
