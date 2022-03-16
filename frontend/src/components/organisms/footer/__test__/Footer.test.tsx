import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { screen } from '@testing-library/react'

import { Footer } from 'components/organisms/footer/Footer'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('Footer', () => {
  it('can display itself', () => {
    renderWithChakraProvider(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
