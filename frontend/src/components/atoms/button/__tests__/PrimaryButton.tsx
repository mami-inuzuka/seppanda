import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('PrimaryButton', () => {
  it('can display children', () => {
    const onClick = jest.fn()
    const children = 'test'
    renderWithChakraProvider(
      <PrimaryButton onClick={onClick} size="xl" isFullWidth disabled isLoading>
        {children}
      </PrimaryButton>
    )
    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
