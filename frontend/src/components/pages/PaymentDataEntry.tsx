import { VFC } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { ControlBar } from '../molecules/ControlBar'
import { Calculator } from '../organisms/Calculator/Calculator'

type Props = {
  onClickClose: () => void
}

export const PaymentDataEntry: VFC<Props> = (props) => {
  const { onClickClose } = props
  return (
    <Flex flexDirection="column" h="100vh">
      <Box flex="1">
        <Calculator />
      </Box>
      <ControlBar onClickClose={onClickClose} />
    </Flex>
  )
}
