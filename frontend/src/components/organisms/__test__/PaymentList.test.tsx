import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { screen } from '@testing-library/react'

import { PaymentList } from 'components/organisms/PaymentList'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

import { payments } from './payments'

describe('PaymentList', () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  it('can render correctly', async () => {
    renderWithChakraProvider(
      <BrowserRouter>
        <PaymentList paymentList={payments.payments} />
      </BrowserRouter>
    )
    // 10個の支払い情報が表示される
    const items = await screen.findAllByTestId('payment-list-item')
    expect(items.length).toBe(payments.payments.length)

    // 日付表示のバナーが6個表示される（テストデータでは最初に表示される10個のデータのうち日付は6種類あるため）
    const dateBanner = await screen.findAllByTestId('date-banner')
    expect(dateBanner.length).toBe(6)
  })
})
