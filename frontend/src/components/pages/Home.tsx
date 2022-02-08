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
import { getPayments } from 'lib/api/getPayments'
import { useToast } from 'lib/toast'

import type { GetPaymentsResponse } from 'types/getPaymentsResponse'

export const Home: VFC = memo(() => {
  const [paymentsList, setPaymentsList] = useState<GetPaymentsResponse[] | undefined>()
  const [isPaymentsLoaded, setIsPaymentsLoaded] = useState<boolean>(false)
  const { errorToast } = useToast()
  const { isOpen: isOpenSettleModal, onOpen: onOpenSettleModal, onClose: onCloseSettleModal } = useDisclosure()
  const { isOpen: isOpenEntryModal, onOpen: onOpenEntryModal, onClose: onCloseEntryModal } = useDisclosure()

  const handleGetPayments = async () => {
    try {
      const res = await getPayments()
      if (res?.status === 200) {
        setPaymentsList(res?.data)
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
  }, [])

  return (
    <>
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
      {isPaymentsLoaded && <PaymentList payments={paymentsList} />}
      <Box position="fixed" bottom="24px" w="100%">
        <Center w="100%" onClick={onOpenEntryModal}>
          <CircleAddButton />
        </Center>
      </Box>
    </>
  )
})
