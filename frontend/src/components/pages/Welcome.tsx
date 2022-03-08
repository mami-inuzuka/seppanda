import { VFC } from 'react'

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'

import googleIcon from 'assets/images/google_icon.svg'
import VerticalLogo from 'assets/images/logo-vertical-black.svg'
import { FullWindowSpinner } from 'components/organisms/FullWindowSpinner'
import { useSignInWithGoogle } from 'hooks/useSignInWithGoogle'

export const Welcome: VFC = () => {
  const { signInWithGoogle, isLoading } = useSignInWithGoogle()

  return (
    <>
      {isLoading && <FullWindowSpinner />}
      <Flex h="100vh" justify="center" align="center" p={6}>
        <Box>
          <Box mb="14">
            <Image src={VerticalLogo} margin="0 auto" mb={4} />
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
