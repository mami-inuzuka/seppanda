import { VFC, memo } from 'react'

import { Box, Button, Flex, Image, Spinner, Text } from '@chakra-ui/react'

import googleIcon from 'assets/images/google_icon.svg'
import LogoWithCopy from 'assets/images/logo-with-copy.svg'
import { useSignInWithGoogle } from 'hooks/useSignInWithGoogle'

export const Welcome: VFC = memo(() => {
  const { signInWithGoogle, isLoading } = useSignInWithGoogle()

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
