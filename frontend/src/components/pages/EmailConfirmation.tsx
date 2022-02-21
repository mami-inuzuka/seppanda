import { VFC } from 'react'

import { Box, Heading } from '@chakra-ui/react'

import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'

export const EmailConfirmation: VFC = () => (
  <HeaderOnlyLogoLayout>
    <Box p={6}>
      <Heading size="lg" textAlign="center" my={10}>
        確認メールを
        <br />
        送信しました
      </Heading>
      <Box mb={6}>
        <p>下記のメールアドレスに確認メールを送信しました</p>
      </Box>
      <Box bg="gray.50" p={4}>
        <p>{}</p>
      </Box>
    </Box>
  </HeaderOnlyLogoLayout>
)
