import type { User } from 'types/user'

export type PostPaymentParams = {
  amount: string
  detail: string
  paidAt: string
}

export type PaymentListGroupByPaidAt = {
  date: string
  payments: Payment[]
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
