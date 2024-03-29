import { createContext } from 'react'

import type { Payment } from 'types/api/payment'
import type { TeamStatus } from 'types/api/team'

export type PaymentContextType = {
  paymentList: Payment[]
  currentPage: number
  isFirstLoad: boolean
  setIsFirstLoad: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setPaymentList: React.Dispatch<React.SetStateAction<Payment[]>>
  isPaymentListLoaded: boolean
  setIsPaymentListLoaded: React.Dispatch<React.SetStateAction<boolean>>
  teamStatus: TeamStatus
  setTeamStatus: React.Dispatch<React.SetStateAction<TeamStatus>>
  isTeamStatusLoaded: boolean
  setIsTeamStatusLoaded: React.Dispatch<React.SetStateAction<boolean>>
  isUpdatedPaymentList: boolean
  setIsUpdatedPaymentList: React.Dispatch<React.SetStateAction<boolean>>
  isLastPage: boolean
  setIsLastPage: React.Dispatch<React.SetStateAction<boolean>>
  totalPages: number
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
  handleFetchNextPage: () => Promise<Payment[] | null>
}

export const PaymentContext = createContext<PaymentContextType>({
  paymentList: [],
  isFirstLoad: true,
  setIsFirstLoad: () => {
    throw new Error('PaymentContext not available')
  },
  currentPage: 1,
  setCurrentPage: () => {
    throw new Error('PaymentContext not available')
  },
  setPaymentList: () => {
    throw new Error('PaymentContext not available')
  },
  isPaymentListLoaded: false,
  setIsPaymentListLoaded: () => {
    throw new Error('PaymentContext not available')
  },
  teamStatus: {
    refundAmount: 0,
    largestPaymentUser: null,
    smallestPaymentUser: null,
    isTeamCapacityReached: false,
    invitationToken: '',
  },
  setTeamStatus: () => {
    throw new Error('PaymentContext not available')
  },
  isTeamStatusLoaded: false,
  setIsTeamStatusLoaded: () => {
    throw new Error('PaymentContext not available')
  },
  isUpdatedPaymentList: false,
  setIsUpdatedPaymentList: () => {
    throw new Error('PaymentContext not available')
  },
  isLastPage: false,
  setIsLastPage: () => {
    throw new Error('PaymentContext not available')
  },
  totalPages: 1,
  setTotalPages: () => {
    throw new Error('PaymentContext not available')
  },
  handleFetchNextPage: () => {
    throw new Error('PaymentContext not available')
  },
})
