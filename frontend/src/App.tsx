import { VFC } from 'react'

import { Box } from '@chakra-ui/react'

import { RouterConfig } from 'components/router/RouterConfig'
import { Providers } from 'providers/Providers'

const App: VFC = () => (
  <Providers>
    <Box w="100%" minH="100vh" bg="gray.50">
      <Box w="100%" m="0 auto" bg="white" maxW={{ base: 'auto', sm: '400px' }} minW="320px" minH="100vh">
        <RouterConfig />
      </Box>
    </Box>
  </Providers>
)

export default App
