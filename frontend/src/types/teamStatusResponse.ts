import type { User } from './user'

export type TeamStatusResponse = {
  refundAmount: number
  largestPaymentUser: User
  smallestPaymentUser: User
}
