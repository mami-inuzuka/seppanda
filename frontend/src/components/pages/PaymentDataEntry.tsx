import { Box, Flex } from '@chakra-ui/react'
import { VFC } from 'react'
import { ControlBar } from '../molecules/ControlBar'
import { Calculator } from '../organisms/Calculator/Calculator'

export const PaymentDataEntry: VFC = () => (
  <Flex flexDirection="column" h="100vh">
    <Box flex="1">
      <Calculator />
    </Box>
    <ControlBar />
  </Flex>
)
