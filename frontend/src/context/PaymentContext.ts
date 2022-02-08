import { createContext } from 'react'

import { Payment } from '../types/payment'

export type PaymentContextType = {
  inputNumber: string
  setInputNumber: React.Dispatch<React.SetStateAction<string>>
  paymentList: Payment[] | null
  setPaymentList: React.Dispatch<React.SetStateAction<Payment[] | null>>
}

export const PaymentContext = createContext<PaymentContextType>({
  inputNumber: '0',
  setInputNumber: () => {
    throw new Error('PaymentContext not avaliable')
  },
  paymentList: null,
  setPaymentList: () => {
    throw new Error('PaymentContext not avaliable')
  },
})
