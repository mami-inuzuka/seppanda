import { createContext } from 'react'

import type { PaymentListGroupByPaidAt } from 'types/paymentListGroupByPaidAt'
import type { TeamStatus } from 'types/teamStatus'

export type PaymentContextType = {
  inputAmount: string
  setInputAmount: React.Dispatch<React.SetStateAction<string>>
  inputDetail: string
  setInputDetail: React.Dispatch<React.SetStateAction<string>>
  inputPaidAt: string
  setInputPaidAt: React.Dispatch<React.SetStateAction<string>>
  paymentList: PaymentListGroupByPaidAt[]
  setPaymentList: React.Dispatch<React.SetStateAction<PaymentListGroupByPaidAt[]>>
  isPaymentListLoaded: boolean
  setIsPaymentListLoaded: React.Dispatch<React.SetStateAction<boolean>>
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
  paymentList: [],
  setPaymentList: () => {
    throw new Error('PaymentContext not avaliable')
  },
  isPaymentListLoaded: false,
  setIsPaymentListLoaded: () => {
    throw new Error('PaymentContext not avaliable')
  },
  teamStatus: {
    refundAmount: 0,
    largestPaymentUser: null,
    smallestPaymentUser: null,
    isTeamCapacityReached: false,
    invitationToken: '',
  },
  setTeamStatus: () => {
    throw new Error('PaymentContext not avaliable')
  },
})
