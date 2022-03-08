import { VFC, useEffect } from 'react'

import { Box, Heading, Image, Text } from '@chakra-ui/react'

import { GoogleLoginButton } from 'components/atoms/button/GoogleLoginButton'
import { FullWindowSpinner } from 'components/organisms/FullWindowSpinner'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { useGetInviter } from 'hooks/useGetInviter'
import { useSignInWithGoogle } from 'hooks/useSignInWithGoogle'

export const WelcomeWithInvitationToken: VFC = () => {
  const { signInWithGoogle, isLoading } = useSignInWithGoogle()
  const { handleGetInviter, inviterName, inviterAvatar, isInviterLoaded } = useGetInviter()

  useEffect(() => {
    handleGetInviter().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading && <FullWindowSpinner />}
      <Box>
        {isInviterLoaded && (
          <HeaderOnlyLogoLayout>
            <Box h="100%" p={6}>
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
                <GoogleLoginButton onClick={signInWithGoogle} disabled={isLoading} />
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
}
