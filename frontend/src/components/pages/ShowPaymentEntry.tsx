import { useContext, useEffect, VFC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, CloseButton, Flex } from '@chakra-ui/react'

import { BarButton } from 'components/atoms/button/BarButton'
import { Calculator } from 'components/organisms/Calculators/Calculator'
import { PaymentContext } from 'context/PaymentContext'
import { deletePayment, updatePayment } from 'lib/api/payment'
import { useToast } from 'lib/toast'

import type { Payment } from 'types/payment'
import type { PostPaymentParams } from 'types/postPaymentParams'

type stateType = {
  payment: Payment
}

export const ShowPaymentEntry: VFC = () => {
  const { inputNumber, setInputNumber, paymentList, setPaymentList } = useContext(PaymentContext)
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
      amount: Number(inputNumber),
    }

    try {
      const res = await updatePayment(params, payment.id)
      if (res.status === 200) {
        setPaymentList(paymentList)
        onClickClose()
        successToast('支払い情報を更新しました')
        setInputNumber('0')
      } else {
        errorToast('更新に失敗しました')
      }
    } catch {
      errorToast('更新に失敗しました')
    }
  }

  useEffect(() => {
    setInputNumber(String(payment.amount))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex flexDirection="column" h="100vh">
      <Box flex="1">
        <Calculator />
      </Box>
      <Flex h="64px">
        <CloseButton onClick={() => onClickClose()} />
        <BarButton onClickButton={handleDeletePayment} disabled={false} bg="red.500">
          削除する
        </BarButton>
        <BarButton onClickButton={handleUpdateAmount} disabled={inputNumber === '0'} bg="green.500">
          更新する
        </BarButton>
      </Flex>
    </Flex>
  )
}
