import { memo, useContext, VFC } from 'react'
import { Link } from 'react-router-dom'

import { Alert, AlertIcon, Box, Center, useDisclosure } from '@chakra-ui/react'

import bgBlue from 'assets/images/home-bg-blue.svg'
import bgOrange from 'assets/images/home-bg-orange.svg'
import { CircleAddButton } from 'components/atoms/button/CircleAddButton'
import { SpinnerIcon } from 'components/atoms/spinner/Spinner'
import { CurrentStatusCard } from 'components/organisms/CurrentStatusCard'
import { InvitationAlert } from 'components/organisms/InvitationAlert'
import { InvitationUrlModal } from 'components/organisms/modal/InvitationUrlModal'
import { PaymentListArea } from 'components/organisms/PaymentListArea'
import { HomeHeaderLayout } from 'components/templates/HomeHeaderLayout'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'

export const Home: VFC = memo(() => {
  const { isPaymentListLoaded, paymentList, teamStatus, isTeamStatusLoaded } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  return (
    <>
      <Alert status="error">
        <AlertIcon />
        2023.03.31
        をもちましてサービスを終了いたします。サービス終了後はログインできなくなりますので、それまでの間に割り勘額のメモや精算等のご対応をよろしくお願いいたします。
      </Alert>
      {!localStorage.getItem('invitationUrlClosed') && isTeamStatusLoaded && !teamStatus.isTeamCapacityReached && (
        <InvitationUrlModal isOpen={isOpen} onClose={onClose} size="xl" invitationToken={teamStatus.invitationToken} />
      )}
      {isTeamStatusLoaded && !teamStatus.isTeamCapacityReached && (
        <InvitationAlert invitationToken={teamStatus.invitationToken} />
      )}
      {currentUser && (
        <Box
          backgroundImage={currentUser.color === 'blue' ? bgBlue : bgOrange}
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          minH="100%"
        >
          <HomeHeaderLayout>
            <CurrentStatusCard
              isLoaded={isTeamStatusLoaded}
              isDebt={teamStatus.smallestPaymentUser?.uid === currentUser.uid}
              refundAmount={teamStatus.refundAmount}
              teamId={currentUser.teamId}
              isTeamCapacityReached={teamStatus.isTeamCapacityReached}
            />
            <Box borderTopColor="gray.200" borderTopWidth="1px" flex="1">
              {isPaymentListLoaded ? (
                <PaymentListArea paymentList={paymentList} />
              ) : (
                <Box pt={12} textAlign="center">
                  <SpinnerIcon />
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
      )}
    </>
  )
})
