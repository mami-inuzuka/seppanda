import { useContext, useEffect, useState } from 'react'

import { DateTime } from 'luxon'

import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { getPayments } from 'lib/api/payment'
import { getTeamStatus } from 'lib/api/team'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

import type { PaymentListGroupByPaidAt } from 'types/paymentListGroupByPaidAt'
import type { TeamStatus } from 'types/teamStatus'

export const PaymentProvider = ({ children }: { children: React.ReactElement }) => {
  const { currentUser } = useContext(AuthContext)
  const [paymentList, setPaymentList] = useState<PaymentListGroupByPaidAt[]>([])
  const [teamStatus, setTeamStatus] = useState<TeamStatus>({
    refundAmount: 0,
    largestPaymentUser: null,
    smallestPaymentUser: null,
    isTeamCapacityReached: false,
    invitationToken: '',
  })
  const [isPaymentListLoaded, setIsPaymentListLoaded] = useState<boolean>(false)
  const [isTeamStatusLoaded, setIsTeamStatusLoaded] = useState<boolean>(false)
  const [inputAmount, setInputAmount] = useState<string>('')
  const [inputDetail, setInputDetail] = useState<string>('')
  const [inputPaidAt, setInputPaidAt] = useState<string>(DateTime.local().toFormat('yyyy-MM-dd'))
  const { errorToast } = useToast()
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    inputAmount,
    setInputAmount,
    inputDetail,
    setInputDetail,
    inputPaidAt,
    setInputPaidAt,
    paymentList,
    setPaymentList,
    isPaymentListLoaded,
    setIsPaymentListLoaded,
    teamStatus,
    setTeamStatus,
    isTeamStatusLoaded,
    setIsTeamStatusLoaded,
  }

  const handleGetPayments = async () => {
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      const res = await getPayments(idToken)
      if (res?.status === 200) {
        setPaymentList(res?.data)
      } else {
        errorToast('取得に失敗しました')
      }
    } catch {
      errorToast('取得に失敗しました')
    }
    setIsPaymentListLoaded(true)
  }

  const handleGetTeamStatus = async () => {
    const idToken = await auth.currentUser?.getIdToken(true)
    if (currentUser) {
      try {
        const res = await getTeamStatus(currentUser.teamId, idToken)
        if (res?.status === 200) {
          setTeamStatus(res?.data)
        } else {
          errorToast('取得に失敗しました')
        }
      } catch {
        errorToast('取得に失敗しました')
      }
      setIsTeamStatusLoaded(true)
    }
  }

  useEffect(() => {
    handleGetPayments().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleGetTeamStatus().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentList])

  return (
    <PaymentContext.Provider value={value}>
      {isPaymentListLoaded && isTeamStatusLoaded && children}
    </PaymentContext.Provider>
  )
}