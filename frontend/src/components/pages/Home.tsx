import { memo, useContext, useEffect, VFC } from 'react'
import { Link } from 'react-router-dom'

import { Box, Center, Flex, Spacer, useDisclosure } from '@chakra-ui/react'

import { BasicAlert } from 'components/atoms/alert/BasicAlert'
import { CircleAddButton } from 'components/atoms/button/CircleAddButton'
import { DangerButton } from 'components/atoms/button/DangerButton'
import { BasicModal } from 'components/organisms/BasicModal'
import { CurrentStatusArea } from 'components/organisms/CurrentStatusArea'
import { PaymentList } from 'components/organisms/PaymentList'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { getPayments } from 'lib/api/payment'
import { getTeamStatus } from 'lib/api/team'
import { useToast } from 'lib/toast'

export const Home: VFC = memo(() => {
  const { paymentList, setPaymentList, isPaymentsLoaded, setIsPaymentsLoaded, setTeamStatus } =
    useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)
  const { errorToast } = useToast()
  const { isOpen: isOpenSettleModal, onOpen: onOpenSettleModal, onClose: onCloseSettleModal } = useDisclosure()

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

  const handleGetTeamStatus = async () => {
    try {
      const res = await getTeamStatus(currentUser!.teamId)
      if (res?.status === 200) {
        setTeamStatus(res?.data)
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
    handleGetTeamStatus().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BasicModal isOpen={isOpenSettleModal} onClose={onCloseSettleModal} size="xl" />
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
        <Center w="100%">
          <Link to="/payments/new">
            <CircleAddButton />
          </Link>
        </Center>
      </Box>
    </>
  )
})
