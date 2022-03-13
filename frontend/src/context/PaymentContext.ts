import { createContext } from 'react'

import type { PaymentListGroupByPaidAt } from 'types/api/payment'
import type { TeamStatus } from 'types/api/team'

export type PaymentContextType = {
  paymentList: PaymentListGroupByPaidAt[]
  setPaymentList: React.Dispatch<React.SetStateAction<PaymentListGroupByPaidAt[]>>
  isPaymentListLoaded: boolean
  setIsPaymentListLoaded: React.Dispatch<React.SetStateAction<boolean>>
  teamStatus: TeamStatus
  setTeamStatus: React.Dispatch<React.SetStateAction<TeamStatus>>
  isTeamStatusLoaded: boolean
  setIsTeamStatusLoaded: React.Dispatch<React.SetStateAction<boolean>>
  updatePaymentList: boolean
  setUpdatePaymentList: React.Dispatch<React.SetStateAction<boolean>>
}

export const PaymentContext = createContext<PaymentContextType>({
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
  isTeamStatusLoaded: false,
  setIsTeamStatusLoaded: () => {
    throw new Error('PaymentContext not avaliable')
  },
  updatePaymentList: false,
  setUpdatePaymentList: () => {
    throw new Error('PaymentContext not avaliable')
  },
})
