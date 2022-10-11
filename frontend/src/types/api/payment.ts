import type { SimpleUser } from 'types/user'

export type GetPaymentParams = {
  page: number
}

export type PostPaymentParams = {
  amount: string
  detail: string
  paidAt: string
}

export type Payment = {
  amount: number
  paidAt: string
  detail: string
  id: number
  settled: boolean
  settledAt: null
  user: SimpleUser
}
export type PaymentResponse = {
  payments: Payment[]
  isLastPage: boolean
  totalPages: number
}
