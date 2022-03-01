import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

import { PaymentContext } from 'context/PaymentContext'
import { postPayment } from 'lib/api/payment'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'
import { MultipleErrorResponse } from 'types/multipleErrorResponses'

import type { PostPaymentParams } from 'types/postPaymentParams'

export const useSubmitAmount = () => {
  const { updatePaymentList, setUpdatePaymentList } = useContext(PaymentContext)
  const { errorToast, successToast } = useToast()
  const history = useHistory()

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
        errorToast('エラーが発生しました')
      }
    }
  }
  return { handleSubmitAmount }
}
