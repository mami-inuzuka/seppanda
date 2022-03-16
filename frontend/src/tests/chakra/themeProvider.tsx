import { ReactNode, VFC } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

import { theme } from 'theme/index'

export const renderWithChakraProvider = (ui: React.ReactElement, options?: RenderOptions): RenderResult => {
  const Wrapper: VFC<{ children: ReactNode }> = ({ children }) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}
