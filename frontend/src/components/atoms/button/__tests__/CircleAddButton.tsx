import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

import { CircleAddButton } from '../CircleAddButton'

describe('CircleAddButton', () => {
  it('can display itself', () => {
    renderWithChakraProvider(<CircleAddButton />)
    expect(screen.getByTestId('circle-add-button')).toBeInTheDocument()
  })
})
