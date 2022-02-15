import { VFC } from 'react'
import { useLocation } from 'react-router-dom'

import { Box, Heading } from '@chakra-ui/react'

type LocationState = {
  token: string
}

export const Invitation: VFC = () => {
  const location = useLocation<LocationState>()
  return (
    <Box p={6}>
      <Heading size="lg" textAlign="center" my={10}>
        一緒に使う相手を
        <br />
        招待しましょう
      </Heading>
      <Box mb={6}>
        <p>
          会員登録が完了しました！アプリを一緒に使いたい相手とのペアリング設定を行います。下記のURLを招待したい相手に渡してください
        </p>
      </Box>
      <Box bg="gray.50" p={4}>
        <p>{`${window.location.protocol}//${window.location.host}/signup?token=${location.state.token}`}</p>
      </Box>
    </Box>
  )
}
