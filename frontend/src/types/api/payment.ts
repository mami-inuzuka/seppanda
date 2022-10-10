import type { User } from 'types/user'

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
  user: User
}
export type PaymentResponse = {
  payments: Payment[]
  isLastPage: boolean
}
