import { memo, VFC } from 'react'

import { SettingsIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'

export const Header: VFC = memo(() => (
  <Flex as="header" align="center" h="64px" borderBottom="1px" borderColor="gray.100" p={4}>
    <Box flex="1" textAlign="center">
      せっぱんだ
    </Box>
    <SettingsIcon w="24px" h="24px" />
  </Flex>
))
