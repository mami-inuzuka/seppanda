import { VFC } from 'react'
import { useLocation } from 'react-router-dom'

import { Box, Heading } from '@chakra-ui/react'

import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'

type LocationState = {
  email: string
}

export const EmailConfirmation: VFC = () => {
  const location = useLocation<LocationState>()
  return (
    <HeaderOnlyLogoLayout>
      <Box p={6}>
        <Heading size="lg" textAlign="center" my={10}>
          確認メールを
          <br />
          送信しました
        </Heading>
        <Box mb={6}>
          <p>
            下記のアドレスに確認メールを送信しました。24時間以内にメールに記載のリンクにアクセスして登録を完了させてください。
          </p>
        </Box>
        <Box bg="gray.50" p={4} align="center">
          <p>{location.state.email}</p>
        </Box>
      </Box>
    </HeaderOnlyLogoLayout>
  )
}
