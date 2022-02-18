import { memo, useContext, useEffect, VFC } from 'react'
import { Link } from 'react-router-dom'

import { Box, Center } from '@chakra-ui/react'

import bgBlue from 'assets/images/bg_blue.png'
import bgOrange from 'assets/images/bg_orange.png'
import { CircleAddButton } from 'components/atoms/button/CircleAddButton'
import { CurrentStatusCard } from 'components/organisms/CurrentStatusCard'
import { InvitationAlert } from 'components/organisms/InvitationAlert'
import { NoPaymentList } from 'components/organisms/NoPaymentList'
import { PaymentList } from 'components/organisms/PaymentList'
import { HomeHeaderLayout } from 'components/templates/HomeHeaderLayout'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { getPayments } from 'lib/api/payment'
import { getTeamStatus } from 'lib/api/team'
import { useToast } from 'lib/toast'

export const Home: VFC = memo(() => {
  const {
    paymentList,
    setPaymentList,
    isPaymentListLoaded,
    setIsPaymentListLoaded,
    teamStatus,
    setTeamStatus,
    isTeamStatusLoaded,
    setIsTeamStatusLoaded,
  } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)
  const { errorToast } = useToast()

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
    setIsPaymentListLoaded(true)
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
    setIsTeamStatusLoaded(true)
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
      {isTeamStatusLoaded && !teamStatus.isTeamCapacityReached && (
        <InvitationAlert invitationToken={teamStatus.invitationToken} />
      )}
      <Box
        backgroundImage={currentUser?.color === 'blue' ? `url(${bgBlue})` : `url(${bgOrange})`}
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        minH="100vh"
      >
        <HomeHeaderLayout>
          <CurrentStatusCard />
          {isPaymentListLoaded && paymentList.length ? <PaymentList paymentList={paymentList} /> : <NoPaymentList />}
          <Box position="fixed" bottom="24px" w="100%">
            <Center w="100%">
              <Link to="/payments/new">
                <CircleAddButton />
              </Link>
            </Center>
          </Box>
        </HomeHeaderLayout>
      </Box>
    </>
  )
})
