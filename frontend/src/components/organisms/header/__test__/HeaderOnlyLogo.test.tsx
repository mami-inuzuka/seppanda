import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { screen } from '@testing-library/react'

import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

import { HeaderOnlyLogo } from '../HeaderOnlyLogo'

describe('HeaderOnlyLogo', () => {
  it('can display itself', () => {
    renderWithChakraProvider(
      <BrowserRouter>
        <HeaderOnlyLogo />
      </BrowserRouter>
    )
    expect(screen.getByTestId('header-only-logo')).toBeInTheDocument()
  })
})
