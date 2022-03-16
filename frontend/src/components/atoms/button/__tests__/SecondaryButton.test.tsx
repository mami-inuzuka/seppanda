import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

import { SecondaryButton } from '../SecondaryButton'

describe('SecondaryButton', () => {
  it('can display children', () => {
    const onClick = jest.fn()
    const children = 'test'
    renderWithChakraProvider(
      <SecondaryButton onClick={onClick} size="xl" isFullWidth>
        {children}
      </SecondaryButton>
    )
    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
