import { useContext, useEffect, useState } from 'react'

import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { useToast } from 'hooks/useToast'
import { getPayments } from 'lib/api/payment'
import { getTeamStatus } from 'lib/api/team'
import { auth } from 'lib/firebase'

import type { Payment } from 'types/api/payment'
import type { TeamStatus } from 'types/api/team'

export const PaymentProvider = ({ children }: { children: React.ReactElement }) => {
  const [paymentList, setPaymentList] = useState<Payment[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isUpdatedPaymentList, setIsUpdatedPaymentList] = useState<boolean>(false)
  const [teamStatus, setTeamStatus] = useState<TeamStatus>({
    refundAmount: 0,
    largestPaymentUser: null,
    smallestPaymentUser: null,
    isTeamCapacityReached: false,
    invitationToken: '',
  })
  const [isPaymentListLoaded, setIsPaymentListLoaded] = useState<boolean>(false)
  const [isTeamStatusLoaded, setIsTeamStatusLoaded] = useState<boolean>(false)
  const { errorToast } = useToast()
  const { currentUser } = useContext(AuthContext)

  const handleFetchNextPage = async () => {
    const idToken = await auth.currentUser?.getIdToken(true)
    const requestPage = currentPage + 1
    try {
      const res = await getPayments({ page: requestPage }, idToken)
      setPaymentList([...paymentList, ...res.data])
      console.log([...paymentList, ...res.data])
      setCurrentPage(currentPage + 1)
    } catch {
      errorToast('支払情報の取得ができませんでした', '時間をおいてから再読み込みをしてください')
    } finally {
      setIsPaymentListLoaded(true)
    }
    return null
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    paymentList,
    setPaymentList,
    currentPage,
    setCurrentPage,
    isPaymentListLoaded,
    setIsPaymentListLoaded,
    teamStatus,
    setTeamStatus,
    isTeamStatusLoaded,
    setIsTeamStatusLoaded,
    isUpdatedPaymentList,
    setIsUpdatedPaymentList,
    handleFetchNextPage,
  }

  const handleGetPayments = async () => {
    setIsPaymentListLoaded(false)
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      const res = await getPayments({ page: 1 }, idToken)
      setPaymentList(res?.data)
    } catch {
      errorToast('支払情報の取得ができませんでした', '時間をおいてから再読み込みをしてください')
    } finally {
      setIsPaymentListLoaded(true)
    }
  }

  const handleGetTeamStatus = async () => {
    setIsTeamStatusLoaded(false)
    const idToken = await auth.currentUser?.getIdToken(true)
    if (currentUser) {
      try {
        const res = await getTeamStatus(currentUser.teamId, idToken)
        setTeamStatus(res?.data)
      } catch {
        errorToast('情報の取得に失敗しました', '時間をおいてから再読み込みをしてください')
      } finally {
        setIsTeamStatusLoaded(true)
      }
    }
  }

  useEffect(() => {
    if (currentUser) {
      handleGetPayments().catch((err) => {
        console.log(err)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdatedPaymentList])

  useEffect(() => {
    if (currentUser) {
      handleGetTeamStatus().catch((err) => {
        console.log(err)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentList])

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
}
