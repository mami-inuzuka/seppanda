import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { screen } from '@testing-library/react'

import { HeaderWithTitle } from 'components/organisms/header/HeaderWithTitle'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('HeaderWithTitle', () => {
  it('can display children', () => {
    const children = 'test'
    renderWithChakraProvider(
      <BrowserRouter>
        <HeaderWithTitle>{children}</HeaderWithTitle>
      </BrowserRouter>
    )
    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
