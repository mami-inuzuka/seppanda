import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { screen } from '@testing-library/react'

import { PaymentList } from 'components/organisms/PaymentList'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

import type { PaymentListGroupByPaidAt } from 'types/api/payment'
import type { User } from 'types/user'

const user: User = {
  id: 234,
  name: 'Taro',
  uid: 'XTE9hVBnutQAlbTX4HDmLyiyVIH3',
  teamId: 203,
  createdAt: '2022-03-15T10:43:25.863+09:00',
  updatedAt: '2022-03-15T10:43:25.935+09:00',
  color: 'blue',
  isDebt: false,
  avatar: {
    data: 'https://placekitten.com/200/300',
    dataSmall: 'https://placekitten.com/200/300',
    name: 'default-user-icon.png',
  },
}
const paymentList: PaymentListGroupByPaidAt[] = [
  {
    date: '2022-03-15',
    payments: [
      {
        id: 160,
        amount: 333,
        detail: 'コンビニ',
        paidAt: '2022-03-15',
        settled: false,
        settledAt: null,
        user,
      },
    ],
  },
  {
    date: '2022-03-14',
    payments: [
      {
        id: 162,
        amount: 200,
        detail: '',
        paidAt: '2022-03-14',
        settled: false,
        settledAt: null,
        user,
      },
      {
        id: 161,
        amount: 500,
        detail: '',
        paidAt: '2022-03-14',
        settled: false,
        settledAt: null,
        user,
      },
    ],
  },
]

describe('PaymentList', () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  it('can render correctly', async () => {
    renderWithChakraProvider(
      <BrowserRouter>
        <PaymentList paymentList={paymentList} />
      </BrowserRouter>
    )
    // 日付単位の要素数
    const groups = await screen.findAllByTestId('payment-list-group')
    expect(groups).toHaveLength(paymentList.length)

    // 支払い情報単位の要素数
    const items = await screen.findAllByTestId('payment-list-item')
    const payments = paymentList.map((item) => item.payments).flat()
    expect(items.length).toBe(payments.length)
  })
})
