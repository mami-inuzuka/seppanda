import { VFC, memo, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import googleIcon from 'assets/images/google_icon.svg'
import LogoWithCopy from 'assets/images/logo-with-copy.svg'
import { AuthContext } from 'context/AuthContext'
import { signUp } from 'lib/api/auth'

export const Welcome: VFC = memo(() => {
  const { setCurrentUser } = useContext(AuthContext)
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('token')

  const handleCreateUser = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const data = { token }
    const res = await signUp(data, invitationToken)
    if (res.status === 200) {
      setCurrentUser(res.data?.user)
    }
    return res.data
  }

  const auth = getAuth()
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(handleCreateUser)
      .then((res) => {
        if (res.isTeamCapacityReached) {
          history.push('/')
        } else {
          history.push({
            pathname: '/invitation',
            state: { token: res.invitationToken },
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Flex h="100vh" justify="center" align="center" p={6}>
      <Box>
        <Image src={LogoWithCopy} margin="0 auto" mb="14" />
        <Button onClick={signInWithGoogle} bg="gray.100" size="xl" mb={6} isFullWidth>
          <Image src={googleIcon} mr={2} />
          Googleでログインする
        </Button>
        <Text fontSize="xs" align="center" color="gray.400">
          上記のボタンをクリックすることで、利用規約およびプライバシーポリシーに同意するものとします。
        </Text>
      </Box>
    </Flex>
  )
})