import { FC } from 'react'

import { CopyIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/react'

type Props = {
  invitationToken: string
}

export const InvitationAlert: FC<Props> = (props) => {
  const { invitationToken } = props
  return (
    <Box bg="brand.blue" p={4} color="white">
      <Text fontSize="xs" fontWeight="bold" align="center" mb={3}>
        お相手の登録がまだのようです
        <br />
        下記のURLを共有して登録をしてもらおう
      </Text>
      <Flex bg="cyan.500" p={3}>
        <Text fontSize="xs">{`${window.location.protocol}//${window.location.host}/signup?token=${invitationToken}`}</Text>
        <Box>
          <CopyIcon />
        </Box>
      </Flex>
    </Box>
  )
}
