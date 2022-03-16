import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { RefundAmount } from 'components/molecules/RefundAmount'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('RefundAmount', () => {
  it('can display correctly when refundAmount equal 0', () => {
    renderWithChakraProvider(<RefundAmount isDebt={false} refundAmount={0} />)
    expect(screen.getByTestId('refund-amount')).toHaveTextContent('-')
  })

  it('can display correctly when refundAmount is greater than 0', () => {
    renderWithChakraProvider(<RefundAmount isDebt refundAmount={1000} />)
    expect(screen.getByTestId('refund-amount')).toHaveTextContent('1,000')
  })
})
