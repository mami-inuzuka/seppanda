import { memo, useContext, useEffect, VFC } from 'react'
import { Link } from 'react-router-dom'

import { Box, Center } from '@chakra-ui/react'

import bgBlue from 'assets/images/bg_blue.png'
import bgOrange from 'assets/images/bg_orange.png'
import { CircleAddButton } from 'components/atoms/button/CircleAddButton'
import { CurrentStatusCard } from 'components/organisms/CurrentStatusCard'
import { InvitationAlert } from 'components/organisms/InvitationAlert'
import { Loading } from 'components/organisms/Loading'
import { PaymentListArea } from 'components/organisms/PaymentListArea'
import { HomeHeaderLayout } from 'components/templates/HomeHeaderLayout'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { getPayments } from 'lib/api/payment'
import { getTeamStatus } from 'lib/api/team'
import { auth } from 'lib/firebase'
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
    const idToken = await auth.currentUser?.getIdToken(true)
    if (currentUser) {
      try {
        const res = await getPayments(idToken)
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
  }

  const handleGetTeamStatus = async () => {
    const idToken = await auth.currentUser?.getIdToken(true)
    if (currentUser) {
      try {
        const res = await getTeamStatus(currentUser.teamId, idToken)
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
  }

  useEffect(() => {
    handleGetPayments().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleGetTeamStatus().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentList])

  return (
    <>
      {isTeamStatusLoaded && !teamStatus.isTeamCapacityReached && (
        <InvitationAlert invitationToken={teamStatus.invitationToken} />
      )}
      <Box
        backgroundImage={currentUser?.color === 'blue' ? bgBlue : bgOrange}
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        minH="100vh"
      >
        <HomeHeaderLayout>
          <CurrentStatusCard />
          <Box borderTopColor="gray.200" borderTopWidth="1px" flex="1">
            {isPaymentListLoaded ? (
              <PaymentListArea />
            ) : (
              <Box pt={12} textAlign="center">
                <Loading />
              </Box>
            )}
          </Box>
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
