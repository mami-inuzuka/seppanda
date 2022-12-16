import { VFC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Alert, AlertIcon, AlertTitle, Box, Flex, Image, Text, useDisclosure } from '@chakra-ui/react'

import VerticalLogo from 'assets/images/logo-vertical-black.svg'
import { GoogleLoginButton } from 'components/atoms/button/GoogleLoginButton'
import { Footer } from 'components/organisms/footer/Footer'
import { BrowserCautionModal } from 'components/organisms/modal/BrowserCautionModal'
import { detectInAppBrowser } from 'lib/detectInAppBrowser'
import { Cta } from 'pages/Welcome/Cta'
import { TermsAndPolicyLick } from 'pages/Welcome/TermsAndPolicyLink'
import { WelcomeContents } from 'pages/Welcome/WelcomeContents'

export const Welcome: VFC = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const userAgent = detectInAppBrowser(window.navigator.userAgent)

  const handleGoToSignInPage = () => {
    if (userAgent) {
      if (userAgent.match(/line|instagram|facebook/)) {
        onOpen()
      }
    } else {
      navigate('/signin', { state: { referrer: 'signin' } })
    }
  }

  return (
    <>
      <BrowserCautionModal isOpen={isOpen} onClose={onClose} size="xl" />
      <Flex h="100%" direction="column" minH="100vh">
        <Alert status="info">
          <AlertIcon />
          2022.12.16 Seppandaにログインできない不具合を解消済みです。
        </Alert>
        <Flex h="100%" justify="center" align="center" direction="column" p={8} flex="1" mt={28} mb={20}>
          <Box mb={20}>
            <Box mb={10}>
              <Image src={VerticalLogo} margin="0 auto" mb={4} h="140px" />
              <Text fontWeight="bold" textAlign="center" letterSpacing="0.1em">
                毎日の
                <Text as="span" color="green.500">
                  割り勘
                </Text>
                を
                <Text as="span" color="orange.500">
                  まとめて
                </Text>
                計算
              </Text>
            </Box>
            <GoogleLoginButton onClick={handleGoToSignInPage} />
            <TermsAndPolicyLick />
          </Box>
          <WelcomeContents />
          <Cta onClick={handleGoToSignInPage} />
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}
