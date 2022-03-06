import { FC } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { CopyIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/react'

import { useToast } from 'lib/toast'

type Props = {
  invitationToken: string
}

export const InvitationAlert: FC<Props> = (props) => {
  const { invitationToken } = props
  const { successToast } = useToast()
  const invitationUrl = `${window.location.protocol}//${window.location.host}/welcome?invitation_token=${invitationToken}&openExternalBrowser=1`
  const handleFeedback = () => {
    successToast('コピーしました')
  }
  return (
    <Box bg="gray.100" p={4}>
      <Text fontSize="xs" fontWeight="bold" align="center" mb={3}>
        お相手の登録がまだのようです
        <br />
        下記のURLを共有して登録をしてもらおう
      </Text>
      <Flex bg="gray.200" p={3}>
        <Text fontSize="xs">{invitationUrl}</Text>
        <CopyToClipboard text={invitationUrl}>
          <Box onClick={handleFeedback}>
            <CopyIcon />
          </Box>
        </CopyToClipboard>
      </Flex>
    </Box>
  )
}
