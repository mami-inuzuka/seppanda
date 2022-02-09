import { useContext, VFC } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { ControlBar } from 'components/molecules/ControlBar'
import { Calculator } from 'components/organisms/Calculators/Calculator'
import { PaymentContext } from 'context/PaymentContext'
import { postPayment } from 'lib/api/postPayment'
import { useToast } from 'lib/toast'

import type { PostPaymentParams } from 'types/postPaymentParams'

type Props = {
  onClickClose: () => void
}

export const PaymentDataEntry: VFC<Props> = (props) => {
  const { onClickClose } = props
  const { inputNumber, setInputNumber, paymentList, setPaymentList } = useContext(PaymentContext)
  const { errorToast, successToast } = useToast()

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
      <ControlBar onClickClose={onClickClose} onClickBarButton={handleSubmitAmount} disabled={inputNumber === '0'} />
    </Flex>
  )
}
