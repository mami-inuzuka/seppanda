import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './components/pages/Home'
import { HeaderLayout } from './components/templates/HeaderLayout'
import { theme } from './theme'

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <HeaderLayout>
        <Home />
      </HeaderLayout>
    </ChakraProvider>
  )
}
