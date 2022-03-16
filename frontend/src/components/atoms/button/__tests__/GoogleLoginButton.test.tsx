import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

import { GoogleLoginButton } from '../GoogleLoginButton'

describe('GoogleLoginButton', () => {
  it('can display itself', () => {
    const onClick = jest.fn()
    renderWithChakraProvider(<GoogleLoginButton onClick={onClick} />)
    expect(screen.getByTestId('google-login-button')).toBeInTheDocument()
  })
})
