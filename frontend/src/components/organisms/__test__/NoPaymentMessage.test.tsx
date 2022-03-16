import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { NoPaymentMessage } from 'components/organisms/NoPaymentMessage'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('NoPaymentMessage', () => {
  it('can display itself', () => {
    renderWithChakraProvider(<NoPaymentMessage />)
    expect(screen.getByTestId('no-payment-message')).toHaveTextContent('支払い情報はまだありません')
  })
})
