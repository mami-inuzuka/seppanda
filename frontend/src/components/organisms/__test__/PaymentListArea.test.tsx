import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { screen } from '@testing-library/react'

import { PaymentListArea } from 'components/organisms/PaymentListArea'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

import { payments } from './payments'

describe('PaymentListArea', () => {
  it('display NoPaymentMessage when paymentList is empty array', () => {
    renderWithChakraProvider(
      <BrowserRouter>
        <PaymentListArea paymentList={[]} />
      </BrowserRouter>
    )
    expect(screen.getByTestId('no-payment-message')).toBeInTheDocument()
    expect(screen.queryByTestId('payment-list')).toBeNull()
  })

  it('display CurrentStatusContents when isLoaded is true', () => {
    renderWithChakraProvider(
      <BrowserRouter>
        <PaymentListArea paymentList={payments.payments} />
      </BrowserRouter>
    )
    expect(screen.getByTestId('payment-list')).toBeInTheDocument()
    expect(screen.queryByTestId('no-payment-message')).toBeNull()
  })
})
