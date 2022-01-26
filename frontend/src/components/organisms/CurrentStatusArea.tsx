import { memo, VFC } from 'react'

import { Box, Center } from '@chakra-ui/react'

export const CurrentStatusArea: VFC = memo(() => (
  <Box p={16}>
    <Center>taroに返す金額</Center>
    <Center>32600</Center>
  </Box>
))
