import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { screen } from '@testing-library/react'

import { HomeHeader } from 'components/organisms/header/HomeHeader'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('HomeHeader', () => {
  it('can display itself', () => {
    renderWithChakraProvider(
      <BrowserRouter>
        <HomeHeader />
      </BrowserRouter>
    )
    expect(screen.getByTestId('home-header')).toBeInTheDocument()
  })
})
