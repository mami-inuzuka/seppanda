import { VFC, memo, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, Button, Heading, Image } from '@chakra-ui/react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import googleIcon from 'assets/images/google_icon.svg'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { AuthContext } from 'context/AuthContext'
import { signUp } from 'lib/api/auth'

export const SignIn: VFC = memo(() => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
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
      setIsSignedIn(true)
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
    <HeaderOnlyLogoLayout>
      <Box p={6}>
        <Heading size="lg" textAlign="center" my={10}>
          はじめる
        </Heading>
        <Button onClick={signInWithGoogle} bg="gray.100" size="xl" isFullWidth>
          <Image src={googleIcon} mr={2} />
          Googleアカウントではじめる
        </Button>
      </Box>
    </HeaderOnlyLogoLayout>
  )
})
