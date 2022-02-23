import { VFC } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useLocation } from 'react-router-dom'

import { CopyIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { useToast } from 'lib/toast'

type LocationState = {
  invitationToken: string
}

export const Invitation: VFC = () => {
  const { successToast } = useToast()
  const location = useLocation<LocationState>()

  const invitationUrl = `${window.location.protocol}//${window.location.host}/welcome?invitation_token=${location.state.invitationToken}`
  const handleFeedback = () => {
    successToast('コピーしました')
  }
  return (
    <HeaderOnlyLogoLayout>
      <Box p={6}>
        <Heading size="lg" textAlign="center" my={10}>
          一緒に使う相手を
          <br />
          招待しましょう
        </Heading>
        <Box mb={6}>
          <p>
            会員登録が完了しました！アプリを一緒に使いたい相手とのペアリング設定を行います。下記のURLを招待したい相手に共有してください
          </p>
        </Box>

        <Flex bg="gray.100" p={4} align="center">
          <Text>{invitationUrl}</Text>
          <CopyToClipboard text={invitationUrl}>
            <Box onClick={handleFeedback}>
              <CopyIcon />
            </Box>
          </CopyToClipboard>
        </Flex>
      </Box>
    </HeaderOnlyLogoLayout>
  )
}
