import { useState } from 'react'

import { PaymentContext } from 'context/PaymentContext'

import type { TeamStatus } from 'types/api/team'
import type { PaymentListGroupByPaidAt } from 'types/paymentListGroupByPaidAt'

export const PaymentProvider = ({ children }: { children: React.ReactElement }) => {
  const [paymentList, setPaymentList] = useState<PaymentListGroupByPaidAt[]>([])
  const [updatePaymentList, setUpdatePaymentList] = useState<boolean>(false)
  const [teamStatus, setTeamStatus] = useState<TeamStatus>({
    refundAmount: 0,
    largestPaymentUser: null,
    smallestPaymentUser: null,
    isTeamCapacityReached: false,
    invitationToken: '',
  })
  const [isPaymentListLoaded, setIsPaymentListLoaded] = useState<boolean>(false)
  const [isTeamStatusLoaded, setIsTeamStatusLoaded] = useState<boolean>(false)

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    paymentList,
    setPaymentList,
    isPaymentListLoaded,
    setIsPaymentListLoaded,
    teamStatus,
    setTeamStatus,
    isTeamStatusLoaded,
    setIsTeamStatusLoaded,
    updatePaymentList,
    setUpdatePaymentList,
  }

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
}
