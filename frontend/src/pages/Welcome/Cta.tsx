import { VFC } from 'react'

import { Box, Image, Text } from '@chakra-ui/react'

import logo from 'assets/images/logo-horizon-black.svg'
import { GoogleLoginButton } from 'components/atoms/button/GoogleLoginButton'
import { TermsAndPolicyLick } from 'pages/Welcome/TermsAndPolicyLink'

type Props = {
  onClick: () => void
}
export const Cta: VFC<Props> = (props) => {
  const { onClick } = props
  return (
    <>
      <Text mb={6}>＼アプリのご利用はこちらから／</Text>
      <Box mb={8}>
        <Image src={logo} mb={3} />
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
      <GoogleLoginButton onClick={onClick} />
      <TermsAndPolicyLick />
    </>
  )
}
