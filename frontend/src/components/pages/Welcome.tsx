import { VFC } from 'react'

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'

import googleIcon from 'assets/images/google_icon.svg'
import LogoWithCopy from 'assets/images/logo-with-copy.svg'
import { FullWindowSpinner } from 'components/organisms/FullWindowSpinner'
import { useSignInWithGoogle } from 'hooks/useSignInWithGoogle'

export const Welcome: VFC = () => {
  const { signInWithGoogle, isLoading } = useSignInWithGoogle()

  return (
    <>
      {isLoading && <FullWindowSpinner />}
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
}
