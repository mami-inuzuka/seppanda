import { VFC } from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from 'providers/AuthProvider'
import { PaymentProvider } from 'providers/PaymentProvider'
import { theme } from 'theme/index'

type Props = {
  children: React.ReactElement
}

export const Providers: VFC<Props> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <PaymentProvider>{children}</PaymentProvider>
    </AuthProvider>
  </ChakraProvider>
)
