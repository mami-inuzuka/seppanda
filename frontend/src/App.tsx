import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './components/pages/Home'

export default function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  )
}
