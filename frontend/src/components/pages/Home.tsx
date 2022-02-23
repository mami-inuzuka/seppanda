import { memo, useContext, VFC } from 'react'
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

export const Home: VFC = memo(() => {
  const { isPaymentListLoaded, teamStatus, isTeamStatusLoaded } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)

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
