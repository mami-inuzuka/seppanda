import { VFC, memo, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import googleIcon from 'assets/images/google_icon.svg'
import LogoWithCopy from 'assets/images/logo-with-copy.svg'
import { getInviterName } from 'lib/api/invitation'
import { getCurrentUser } from 'lib/api/session'
import { useToast } from 'lib/toast'

export const WelcomeWithInvitationToken: VFC = memo(() => {
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')
  const { errorToast } = useToast()
  const [inviterName, setInviterName] = useState('')

  const handleGetCurrentUser = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const res = await getCurrentUser(token)
    return res
  }

  const auth = getAuth()
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(handleGetCurrentUser)
      .then((res) => {
        if (res?.status === 200) {
          if (res?.data.isExisted) {
            history.push('/')
          } else {
            history.push({
              pathname: '/onboarding',
              state: { invitationToken },
            })
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleGetInviterName = async () => {
    if (invitationToken) {
      try {
        const res = await getInviterName(invitationToken)
        if (res?.status === 200) {
          setInviterName(res.data.name)
        } else {
          errorToast('不正な招待URLです')
        }
      } catch {
        errorToast('アクセスに失敗しました')
      }
    }
  }

  useEffect(() => {
    if (invitationToken) {
      handleGetInviterName().catch((err) => {
        console.log(err)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex h="100vh" justify="center" align="center" p={6}>
      <Box>
        <Image src={LogoWithCopy} margin="0 auto" mb="14" />

        <Text align="center">
          下記のボタンをタップして
          <br />
          <Text as="span" fontWeight="bold">
            {inviterName}
          </Text>
          さんと
          <br />
          seppandaの利用をはじめましょう！
        </Text>

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
