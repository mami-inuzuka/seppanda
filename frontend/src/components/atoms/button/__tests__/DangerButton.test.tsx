import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { DangerButton } from 'components/atoms/button/DangerButton'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('DangerButton', () => {
  it('can display children', () => {
    const onClick = jest.fn()
    const children = 'test'
    renderWithChakraProvider(
      <DangerButton onClick={onClick} size="xl" isFullWidth disabled isLoading>
        {children}
      </DangerButton>
    )
    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
