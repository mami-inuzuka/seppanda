import { VFC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Box, Flex, Image, Text, useDisclosure } from '@chakra-ui/react'

import VerticalLogo from 'assets/images/logo-vertical-black.svg'
import { GoogleLoginButton } from 'components/atoms/button/GoogleLoginButton'
import { Footer } from 'components/organisms/footer/Footer'
import { BrowserCautionModal } from 'components/organisms/modal/BrowserCautionModal'
import { detectInAppBrowser } from 'lib/detectInAppBrowser'

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
        <Flex h="100%" justify="center" align="center" direction="column" p={6} flex="1" my={28}>
          <Box>
            <Box mb="10">
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
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}
