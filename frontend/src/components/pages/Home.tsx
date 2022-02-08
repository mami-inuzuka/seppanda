import { memo, useEffect, useState, VFC } from 'react'

import { Box, Center, Flex, Spacer, useDisclosure } from '@chakra-ui/react'

import { BasicAlert } from 'components/atoms/alert/BasicAlert'
import { CircleAddButton } from 'components/atoms/button/CircleAddButton'
import { DangerButton } from 'components/atoms/button/DangerButton'
import { BasicModal } from 'components/organisms/BasicModal'
import { CurrentStatusArea } from 'components/organisms/CurrentStatusArea'
import { NoCloseButtonFullModal } from 'components/organisms/NoCloseButtonFullModal'
import { PaymentList } from 'components/organisms/PaymentList'
import { PaymentDataEntry } from 'components/pages/PaymentDataEntry'
import { PaymentContext } from 'context/PaymentContext'
import { getPayments } from 'lib/api/getPayments'
import { useToast } from 'lib/toast'

import type { Payment } from 'types/payment'

export const Home: VFC = memo(() => {
  const [paymentList, setPaymentList] = useState<Payment[] | null>(null)
  const [isPaymentsLoaded, setIsPaymentsLoaded] = useState<boolean>(false)
  const [inputNumber, setInputNumber] = useState<string>('0')
  const { errorToast } = useToast()
  const { isOpen: isOpenSettleModal, onOpen: onOpenSettleModal, onClose: onCloseSettleModal } = useDisclosure()
  const { isOpen: isOpenEntryModal, onOpen: onOpenEntryModal, onClose: onCloseEntryModal } = useDisclosure()

  const handleGetPayments = async () => {
    try {
      const res = await getPayments()
      if (res?.status === 200) {
        setPaymentList(res?.data)
      } else {
        errorToast('取得に失敗しました')
      }
    } catch {
      errorToast('取得に失敗しました')
    }
    setIsPaymentsLoaded(true)
  }

  useEffect(() => {
    handleGetPayments().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PaymentContext.Provider value={{ inputNumber, setInputNumber, paymentList, setPaymentList }}>
      <BasicModal isOpen={isOpenSettleModal} onClose={onCloseSettleModal} size="xl" />
      <NoCloseButtonFullModal isOpen={isOpenEntryModal} onClose={onCloseEntryModal}>
        <PaymentDataEntry onClickClose={onCloseEntryModal} />
      </NoCloseButtonFullModal>
      <BasicAlert />
      <CurrentStatusArea />
      <Flex bgColor="gray.50" p={2} align="center">
        支払い履歴
        <Spacer />
        <Box onClick={onOpenSettleModal}>
          <DangerButton>精算する</DangerButton>
        </Box>
      </Flex>
      {isPaymentsLoaded && paymentList != null ? <PaymentList payments={paymentList} /> : ''}
      <Box position="fixed" bottom="24px" w="100%">
        <Center w="100%" onClick={onOpenEntryModal}>
          <CircleAddButton />
        </Center>
      </Box>
    </PaymentContext.Provider>
  )
})
