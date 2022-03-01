import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { PaymentContext } from 'context/PaymentContext'
import { deletePayment } from 'lib/api/payment'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'
import { Payment } from 'types/payment'

export const useDeletePayment = (payment: Payment) => {
  const { updatePaymentList, setUpdatePaymentList } = useContext(PaymentContext)
  const [processingDelete, setProcessingDelete] = useState<boolean>(false)
  const { errorToast, successToast } = useToast()
  const history = useHistory()

  const handleDeletePayment = async () => {
    setProcessingDelete(true)
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      const res = await deletePayment(payment.id, idToken)
      if (res.status === 200) {
        setUpdatePaymentList(!updatePaymentList)
        history.push('/')
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
  return { handleDeletePayment, processingDelete }
}
