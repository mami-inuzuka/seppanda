import { createContext } from 'react'

export type PaymentContextType = {
  inputNumber: string
  setInputNumber: React.Dispatch<React.SetStateAction<string>>
}

export const PaymentContext = createContext<PaymentContextType>({
  inputNumber: '0',
  setInputNumber: () => {
    throw new Error('PaymentContext not avaliable')
  },
})
