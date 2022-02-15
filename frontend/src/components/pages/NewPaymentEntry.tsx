import { useContext, VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'

import { BarButton } from 'components/atoms/button/BarButton'
import { PaymentContext } from 'context/PaymentContext'
import { postPayment } from 'lib/api/payment'
import { useToast } from 'lib/toast'

import type { PostPaymentParams } from 'types/postPaymentParams'

export const NewPaymentEntry: VFC = () => {
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

  const onClickClose = () => {
    history.push('/')
  }

  const handleSubmitAmount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: PostPaymentParams = {
      amount: inputAmount,
      detail: inputDetail,
      paid_at: inputPaidAt,
    }

    try {
      const res = await postPayment(params)
      if (res.status === 200) {
        const newPaymentList = paymentList != null ? [res.data, ...paymentList] : [res.data]
        setPaymentList(newPaymentList)
        setInputAmount('')
        setInputDetail('')
        onClickClose()
        successToast('支払い情報を登録しました')
      } else {
        errorToast('登録に失敗しました')
      }
    } catch {
      errorToast('登録に失敗しました')
    }
  }

  return (
    <Flex flexDirection="column" p={6}>
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
      <BarButton onClickButton={handleSubmitAmount} disabled={inputAmount === '' || inputAmount === '0'} bg="green.500">
        登録する
      </BarButton>
    </Flex>
  )
}
