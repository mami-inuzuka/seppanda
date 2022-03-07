import { useContext, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input } from '@chakra-ui/react'
import axios from 'axios'
import { DateTime } from 'luxon'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderWithTitleLayout } from 'components/templates/HeaderWithTitleLayout'
import { PaymentContext } from 'context/PaymentContext'
import { postPayment } from 'lib/api/payment'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'
import { MultipleErrorResponse } from 'types/multipleErrorResponses'

import type { PostPaymentParams } from 'types/postPaymentParams'

export const NewPaymentEntry: VFC = () => {
  const { updatePaymentList, setUpdatePaymentList } = useContext(PaymentContext)
  const { errorToast, successToast } = useToast()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<PostPaymentParams>({
    mode: 'all',
    defaultValues: {
      paidAt: DateTime.local().toFormat('yyyy-MM-dd'),
    },
  })

  const handleSubmitAmount = async (params: PostPaymentParams) => {
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      await postPayment(params, idToken)
      setUpdatePaymentList(!updatePaymentList)
      history.push('/')
      successToast('支払い情報を登録しました')
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
    <HeaderWithTitleLayout title="支払い情報の入力">
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
                placeholder="例）スーパー" // eslint-disable-next-line react/jsx-props-no-spreading
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
                size="lg" // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('paidAt', {
                  required: '支払日を入力してください',
                })}
              />
              <FormErrorMessage>{errors.paidAt && errors.paidAt?.message}</FormErrorMessage>
            </FormControl>
            <PrimaryButton
              onClickButton={handleSubmit(handleSubmitAmount)}
              disabled={!formState.isValid || formState.isSubmitting}
              isLoading={formState.isSubmitting}
            >
              登録する
            </PrimaryButton>
          </Grid>
        </form>
      </Flex>
    </HeaderWithTitleLayout>
  )
}
