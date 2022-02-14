import { createContext } from 'react'

import type { Payment } from 'types/payment'
import type { TeamStatus } from 'types/teamStatus'

export type PaymentContextType = {
  inputAmount: string
  setInputAmount: React.Dispatch<React.SetStateAction<string>>
  inputDetail: string
  setInputDetail: React.Dispatch<React.SetStateAction<string>>
  inputPaidAt: string
  setInputPaidAt: React.Dispatch<React.SetStateAction<string>>
  paymentList: Payment[] | null
  setPaymentList: React.Dispatch<React.SetStateAction<Payment[] | null>>
  isPaymentsLoaded: boolean
  setIsPaymentsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  teamStatus: TeamStatus
  setTeamStatus: React.Dispatch<React.SetStateAction<TeamStatus>>
}

export const PaymentContext = createContext<PaymentContextType>({
  inputAmount: '',
  setInputAmount: () => {
    throw new Error('PaymentContext not avaliable')
  },
  inputDetail: '',
  setInputDetail: () => {
    throw new Error('PaymentContext not avaliable')
  },
  inputPaidAt: '',
  setInputPaidAt: () => {
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
