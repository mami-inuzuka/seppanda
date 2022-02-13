import { memo, VFC } from 'react'

import { Box, Center } from '@chakra-ui/react'

export const UnavailableStatusArea: VFC = memo(() => (
  <Box p={16} _before={{ content: `"相手が登録を完了すると表示されます"`, position: 'absolute' }}>
    <Box opacity={0.2}>
      <Center>タロウに返す金額</Center>
      <Center>2000</Center>
    </Box>
  </Box>
))
