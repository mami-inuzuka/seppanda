import { VFC, memo, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import googleIcon from 'assets/images/google_icon.svg'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { getInviter } from 'lib/api/invitation'
import { getCurrentUser } from 'lib/api/session'
import { useToast } from 'lib/toast'

export const WelcomeWithInvitationToken: VFC = memo(() => {
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')
  const { errorToast } = useToast()
  const [inviterName, setInviterName] = useState('')
  const [inviterAvatar, setInviterAvatar] = useState({ data: '', name: '' })
  const [isLoaded, setIsLoaded] = useState(false)

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

  const handleGetInviter = async () => {
    if (invitationToken) {
      try {
        const res = await getInviter(invitationToken)
        if (res?.status === 200) {
          setInviterName(res.data.name)
          setInviterAvatar(res.data.avatar)
          setIsLoaded(true)
        }
      } catch {
        history.push('/')
        errorToast('不正な招待URLです')
      }
    }
  }

  useEffect(() => {
    if (invitationToken) {
      handleGetInviter().catch((err) => {
        console.log(err)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box>
      {isLoaded && (
        <HeaderOnlyLogoLayout>
          <Box h="100vh" p={6}>
            <Box mb={20}>
              <Heading size="lg" textAlign="center" my={4}>
                seppandaに参加する
              </Heading>
            </Box>
            <Box bg="gray.100" position="relative" p={6} pt="56px">
              <Box
                position="absolute"
                w="64px"
                h="64px"
                top="-32px"
                left="0"
                right="0"
                m="auto"
                border="2px"
                borderColor="blue.500"
                borderRadius="9999px"
                overflow="hidden"
              >
                <Image src={inviterAvatar.data} />
              </Box>
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

              <Button
                onClick={signInWithGoogle}
                bg="white"
                size="xl"
                mb={6}
                border="1px solid rgba(46, 47, 46, 0.1)"
                boxShadow="0px 1px 0px #D7D7D7"
                isFullWidth
              >
                <Image src={googleIcon} mr="24px" />
                Googleでログインする
              </Button>
              <Text fontSize="xs" align="center" color="gray.400">
                上記のボタンをクリックすることで、利用規約およびプライバシーポリシーに同意するものとします。
              </Text>
            </Box>
          </Box>
        </HeaderOnlyLogoLayout>
      )}
    </Box>
  )
})
