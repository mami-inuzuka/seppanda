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
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
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
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(1)
  const { errorToast } = useToast()
  const { currentUser } = useContext(AuthContext)

  const handleFetchNextPage = async () => {
    const idToken = await auth.currentUser?.getIdToken(true)
    const requestPage = currentPage + 1
    try {
      const res = await getPayments({ page: requestPage }, idToken)
      setPaymentList([...paymentList, ...res.data.payments])
      setCurrentPage(currentPage + 1)
      setIsLastPage(res?.data?.isLastPage)
      setIsFirstLoad(false)
    } catch {
      errorToast('支払情報の取得ができませんでした', '時間をおいてから再読み込みをしてください')
    } finally {
      setIsPaymentListLoaded(true)
    }
    return null
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isFirstLoad,
    setIsFirstLoad,
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
    isLastPage,
    setIsLastPage,
    totalPages,
    setTotalPages,
  }

  const handleGetFirstPage = async () => {
    setIsPaymentListLoaded(false)
    const idToken = await auth.currentUser?.getIdToken(true)
    try {
      const res = await getPayments({ page: 1 }, idToken)
      setPaymentList(res?.data.payments)
      setIsLastPage(res?.data?.isLastPage)
      setTotalPages(res?.data?.totalPages)
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
      handleGetFirstPage().catch((err) => {
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
