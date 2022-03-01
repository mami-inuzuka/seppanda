import { VFC, memo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, Button, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import googleIcon from 'assets/images/google_icon.svg'
import LogoWithCopy from 'assets/images/logo-with-copy.svg'
import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'

export const Welcome: VFC = memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')

  const handleGetCurrentUser = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const res = await getCurrentUser(token)
    return res
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(() => {
        setIsLoading(true)
      })
      .then(handleGetCurrentUser)
      .then((res) => {
        if (res?.data.isExisted) {
          history.push('/')
        } else {
          history.push({
            pathname: '/onboarding',
            state: { invitationToken },
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading && (
        <Flex
          w="100%"
          h="100vh"
          direction="column"
          justify="center"
          align="center"
          p={6}
          position="fixed"
          top="0"
          left="0"
          bg="rgba(255,255,255,0.7)"
          zIndex="1"
        >
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
        </Flex>
      )}
      <Flex h="100vh" justify="center" align="center" p={6}>
        <Box>
          <Image src={LogoWithCopy} margin="0 auto" mb="14" />
          <Button onClick={signInWithGoogle} bg="gray.100" size="xl" mb={6} isFullWidth disabled={isLoading}>
            <Image src={googleIcon} mr={2} />
            Googleでログインする
          </Button>
          <Text fontSize="xs" align="center" color="gray.400">
            上記のボタンをクリックすることで、利用規約およびプライバシーポリシーに同意するものとします。
          </Text>
        </Box>
      </Flex>
    </>
  )
})
