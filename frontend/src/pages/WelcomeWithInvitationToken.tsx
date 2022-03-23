import { VFC, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Box, Heading, Image, Text, useDisclosure } from '@chakra-ui/react'

import { GoogleLoginButton } from 'components/atoms/button/GoogleLoginButton'
import { BrowserCautionModal } from 'components/organisms/modal/BrowserCautionModal'
import { HeaderAndFooterLayout } from 'components/templates/HeaderAndFooterLayout'
import { useGetInviter } from 'hooks/useGetInviter'
import { detectInAppBrowser } from 'lib/detectInAppBrowser'
import { Loading } from 'pages/Loading'

export const WelcomeWithInvitationToken: VFC = () => {
  const { handleGetInviter, inviterName, inviterAvatar, isInviterLoaded } = useGetInviter()
  const navigate = useNavigate()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')
  const userAgent = detectInAppBrowser(window.navigator.userAgent)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleGoToSignInPage = () => {
    if (userAgent) {
      if (userAgent.match(/line|instagram|facebook/)) {
        onOpen()
      }
    } else {
      navigate('/signin', { state: { referrer: 'signin', invitationToken } })
    }
  }

  useEffect(() => {
    handleGetInviter().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <BrowserCautionModal isOpen={isOpen} onClose={onClose} size="xl" />
      {isInviterLoaded ? (
        <HeaderAndFooterLayout>
          <Box h="100%" p={6} mb={10}>
            <Box mb={20}>
              <Heading size="lg" textAlign="center" my={4}>
                seppandaに参加する
              </Heading>
            </Box>
            <Box bg="gray.100" position="relative" p={6} pt="56px">
              <Image
                src={inviterAvatar.data}
                alt={inviterAvatar.name}
                boxSize="64px"
                borderRadius="full"
                objectFit="cover"
                border="2px"
                borderColor="blue.500"
                position="absolute"
                top="-32px"
                left="0"
                right="0"
                m="auto"
                bg="gray.50"
              />
              <Text align="center" fontSize="sm" lineHeight="1.8" mb={6}>
                <Text as="span" fontWeight="bold">
                  {inviterName}
                </Text>
                さんが
                <br />
                あなたをseppandaの利用に
                <br />
                招待しています。
                <br />
                下記のボタンから参加しましょう
              </Text>
              <GoogleLoginButton onClick={handleGoToSignInPage} />
              <Text fontSize="xs" align="center" color="gray.400" lineHeight="1.8">
                上記のボタンをクリックすることで、
                <Text as="span" textDecoration="underline">
                  <Link to="/terms">利用規約</Link>
                </Text>
                および
                <Text as="span" textDecoration="underline">
                  <Link to="/policy">プライバシーポリシー</Link>
                </Text>
                に同意するものとします。
              </Text>
            </Box>
          </Box>
        </HeaderAndFooterLayout>
      ) : (
        <Loading />
      )}
    </Box>
  )
}
