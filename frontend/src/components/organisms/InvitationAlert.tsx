import { VFC, memo } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { CopyIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/react'

import { useToast } from 'hooks/useToast'

type Props = {
  invitationToken: string
}

export const InvitationAlert: VFC<Props> = memo((props) => {
  const { invitationToken } = props
  const { successToast } = useToast()
  const invitationUrl = `${window.location.protocol}//${window.location.host}/welcome?invitation_token=${invitationToken}&openExternalBrowser=1`
  const handleFeedback = () => {
    successToast('コピーしました')
  }
  return (
    <Box bg="gray.100" p={4} data-testid="invitation-alert">
      <Text fontSize="xs" fontWeight="bold" align="center" mb={3}>
        おあいての登録がまだのようです
        <br />
        下記のURLを共有して登録をしてもらおう
      </Text>
      <Flex bg="gray.200" p={3}>
        <Text fontSize="xs" wordBreak="break-all" pr={1} data-testid="invitation-alert-invitation-url">
          {invitationUrl}
        </Text>
        <CopyToClipboard text={invitationUrl}>
          <Flex onClick={handleFeedback} justify="center" align="center">
            <CopyIcon />
          </Flex>
        </CopyToClipboard>
      </Flex>
    </Box>
  )
})
