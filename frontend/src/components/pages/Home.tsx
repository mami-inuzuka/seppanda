import { memo, useContext, useEffect, VFC } from 'react'
import { Link } from 'react-router-dom'

import { Box, Center, useDisclosure } from '@chakra-ui/react'

import bgBlue from 'assets/images/home-bg-blue.svg'
import bgOrange from 'assets/images/home-bg-orange.svg'
import { CircleAddButton } from 'components/atoms/button/CircleAddButton'
import { CurrentStatusCard } from 'components/organisms/CurrentStatusCard'
import { InvitationAlert } from 'components/organisms/InvitationAlert'
import { Loading } from 'components/organisms/Loading'
import { InvitationUrlModal } from 'components/organisms/modal/InvitationUrlModal'
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
    updatePaymentList,
  } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const { errorToast } = useToast()

  const handleGetPayments = async () => {
    setIsPaymentListLoaded(false)
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      const res = await getPayments(idToken)
      setPaymentList(res?.data)
    } catch {
      errorToast('支払情報の取得ができませんでした', '時間をおいてから再読み込みをしてください')
    } finally {
      setIsPaymentListLoaded(true)
    }
  }

  const handleGetTeamStatus = async () => {
    setIsTeamStatusLoaded(false)
    const idToken = await auth.currentUser?.getIdToken(true)
    if (currentUser) {
      try {
        const res = await getTeamStatus(currentUser.teamId, idToken)
        setTeamStatus(res?.data)
      } catch {
        errorToast('情報の取得に失敗しました', '時間をおいてから再読み込みをしてください')
      } finally {
        setIsTeamStatusLoaded(true)
      }
    }
  }

  useEffect(() => {
    handleGetPayments().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePaymentList, currentUser])

  useEffect(() => {
    handleGetTeamStatus().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentList])
  return (
    <>
      {!localStorage.getItem('invitationUrlClosed') && isTeamStatusLoaded && !teamStatus.isTeamCapacityReached && (
        <InvitationUrlModal isOpen={isOpen} onClose={onClose} size="xl" invitationToken={teamStatus.invitationToken} />
      )}
      {isTeamStatusLoaded && !teamStatus.isTeamCapacityReached && (
        <InvitationAlert invitationToken={teamStatus.invitationToken} />
      )}
      <Box
        backgroundImage={currentUser?.color === 'blue' ? bgBlue : bgOrange}
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        minH="100%"
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
          <Box position="fixed" right="0" left="0" bottom="24px" margin="auto" w="100%">
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
