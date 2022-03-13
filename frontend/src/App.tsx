import { VFC } from 'react'

import { Box, ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from 'providers/AuthProvider'
import { PaymentProvider } from 'providers/PaymentProvider'
import { RouterConfig } from 'router/RouterConfig'
import { theme } from 'theme/index'

const App: VFC = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <PaymentProvider>
        <Box w="100%" minH="100vh" bg="gray.50">
          <Box w="100%" m="0 auto" bg="white" maxW={{ base: 'auto', sm: '400px' }} minW="320px" minH="100vh">
            <RouterConfig />
          </Box>
        </Box>
      </PaymentProvider>
    </AuthProvider>
  </ChakraProvider>
)

export default App
