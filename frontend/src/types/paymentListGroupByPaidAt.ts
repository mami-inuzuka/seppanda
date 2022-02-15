import type { Payment } from 'types/payment'

export type PaymentListGroupByPaidAt = {
  date: string
  payments: Payment[]
}
