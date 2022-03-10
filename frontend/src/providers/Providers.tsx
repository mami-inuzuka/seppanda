import { VFC } from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import { PaymentProvider } from 'providers/PaymentProvider'
import { UserProvider } from 'providers/UserProvider'
import { theme } from 'theme/index'

type Props = {
  children: React.ReactElement
}

export const Providers: VFC<Props> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <UserProvider>
      <PaymentProvider>{children}</PaymentProvider>
    </UserProvider>
  </ChakraProvider>
)
