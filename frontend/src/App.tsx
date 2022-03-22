import { VFC } from 'react'

import { Box, ChakraProvider } from '@chakra-ui/react'

import bg from 'assets/images/bg.svg'
import { AuthProvider } from 'providers/AuthProvider'
import { RouterConfig } from 'router/RouterConfig'
import { theme } from 'theme/index'

const App: VFC = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Box
        bg={{ base: 'none', sm: 'gray.50' }}
        minH={{ base: 'none', sm: '100vh' }}
        bgImage={{ base: 'none', sm: `url(${bg})` }}
        bgSize={{ base: 'none', sm: ' 200px' }}
        backgroundAttachment={{ base: 'none', sm: ' fixed' }}
      >
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
    </AuthProvider>
  </ChakraProvider>
)

export default App
