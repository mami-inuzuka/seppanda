import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import { screen } from '@testing-library/react'

import { PaymentListArea } from 'components/organisms/PaymentListArea'
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
]

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
        <PaymentListArea paymentList={paymentList} />
      </BrowserRouter>
    )
    expect(screen.getByTestId('payment-list')).toBeInTheDocument()
    expect(screen.queryByTestId('no-payment-message')).toBeNull()
  })
})
