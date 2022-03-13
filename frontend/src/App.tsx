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
        <Box bg={{ base: 'none', sm: 'gray.50' }} minH={{ base: 'none', sm: '100vh' }}>
          <Box
            w="100%"
            m="0 auto"
            bg="white"
            maxW={{ base: 'none', sm: '400px' }}
            minW="320px"
            minH={{ base: 'none', sm: '100vh' }}
          >
            <RouterConfig />
          </Box>
        </Box>
      </PaymentProvider>
    </AuthProvider>
  </ChakraProvider>
)

export default App
