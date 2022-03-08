import { VFC } from 'react'
import { Link } from 'react-router-dom'

import { Box, Flex, Image, Text } from '@chakra-ui/react'

import VerticalLogo from 'assets/images/logo-vertical-black.svg'
import { GoogleLoginButton } from 'components/atoms/button/GoogleLoginButton'
import { FullWindowSpinner } from 'components/organisms/FullWindowSpinner'
import { useSignInWithGoogle } from 'hooks/useSignInWithGoogle'

export const Welcome: VFC = () => {
  const { signInWithGoogle, isLoading } = useSignInWithGoogle()

  return (
    <>
      {isLoading && <FullWindowSpinner />}
      <Flex h="100vh" justify="center" align="center" p={6}>
        <Box>
          <Box mb="10">
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
          <GoogleLoginButton onClick={signInWithGoogle} disabled={isLoading} />
          <Text fontSize="xs" align="center" color="gray.400" lineHeight="1.8">
            上記のボタンをクリックすることで、
            <Text as="span" textDecoration="underline">
              <Link to="/terms">利用規約</Link>
            </Text>
            および
            <Text as="span" textDecoration="underline">
              <Link to="/policy">プライバシーポリシー</Link>
            </Text>
            に同意するものとします。
          </Text>
        </Box>
      </Flex>
    </>
  )
}
