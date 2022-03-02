import { VFC, memo, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, Button, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios'

import googleIcon from 'assets/images/google_icon.svg'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { useSignInWithGoogle } from 'hooks/useSignInWithGoogle'
import { getInviter } from 'lib/api/invitation'
import { useToast } from 'lib/toast'
import { ErrorResponse } from 'types/errorResponse'

export const WelcomeWithInvitationToken: VFC = memo(() => {
  const { signInWithGoogle, isLoading } = useSignInWithGoogle()
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')
  const { errorToast } = useToast()
  const [inviterName, setInviterName] = useState('')
  const [inviterAvatar, setInviterAvatar] = useState({ data: '', name: '' })
  const [isLoaded, setIsLoaded] = useState(false)

  const handleGetInviter = async () => {
    if (invitationToken) {
      try {
        const res = await getInviter(invitationToken)
        if (res?.status === 200) {
          setInviterName(res.data.name)
          setInviterAvatar(res.data.avatar)
          setIsLoaded(true)
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          errorToast((err.response?.data as ErrorResponse).message)
        } else {
          errorToast('エラーが発生しました')
        }
        history.push('/welcome')
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
    </>
  )
})
