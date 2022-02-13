import { createContext } from 'react'

import type { Payment } from 'types/payment'
import type { TeamStatus } from 'types/teamStatus'

export type PaymentContextType = {
  inputNumber: string
  setInputNumber: React.Dispatch<React.SetStateAction<string>>
  paymentList: Payment[] | null
  setPaymentList: React.Dispatch<React.SetStateAction<Payment[] | null>>
  isPaymentsLoaded: boolean
  setIsPaymentsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  teamStatus: TeamStatus
  setTeamStatus: React.Dispatch<React.SetStateAction<TeamStatus>>
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
  isPaymentsLoaded: false,
  setIsPaymentsLoaded: () => {
    throw new Error('PaymentContext not avaliable')
  },
  teamStatus: {
    refundAmount: 0,
    largestPaymentUser: null,
    smallestPaymentUser: null,
    isTeamCapacityReached: false,
  },
  setTeamStatus: () => {
    throw new Error('PaymentContext not avaliable')
  },
})
