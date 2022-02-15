import type { Payment } from 'types/payment'

export type GetPaymentsResponse = {
  date: string
  payments: Payment[]
}
