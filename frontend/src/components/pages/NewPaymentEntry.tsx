import { useContext, VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, CloseButton, Flex } from '@chakra-ui/react'

import { BarButton } from 'components/atoms/button/BarButton'
import { Calculator } from 'components/organisms/Calculators/Calculator'
import { PaymentContext } from 'context/PaymentContext'
import { postPayment } from 'lib/api/payment'
import { useToast } from 'lib/toast'

import type { PostPaymentParams } from 'types/postPaymentParams'

export const NewPaymentEntry: VFC = () => {
  const { inputNumber, setInputNumber, paymentList, setPaymentList } = useContext(PaymentContext)
  const { errorToast, successToast } = useToast()
  const history = useHistory()

  const onClickClose = () => {
    history.push('/')
  }

  const handleSubmitAmount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: PostPaymentParams = {
      amount: Number(inputNumber),
    }

    try {
      const res = await postPayment(params)
      if (res.status === 200) {
        const newPaymentList = paymentList != null ? [res.data, ...paymentList] : [res.data]
        setPaymentList(newPaymentList)
        onClickClose()
        successToast('支払い情報を登録しました')
        setInputNumber('0')
      } else {
        errorToast('登録に失敗しました')
      }
    } catch {
      errorToast('登録に失敗しました')
    }
  }

  return (
    <Flex flexDirection="column" h="100vh">
      <Box flex="1">
        <Calculator />
      </Box>
      <Flex h="64px">
        <CloseButton onClick={() => onClickClose()} />
        <BarButton onClickButton={handleSubmitAmount} disabled={inputNumber === '0'} bg="green.500">
          登録する
        </BarButton>
      </Flex>
    </Flex>
  )
}
