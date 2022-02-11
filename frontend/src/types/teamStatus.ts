import type { User } from './user'

export type TeamStatus = {
  refundAmount: number
  largestPaymentUser: User
  smallestPaymentUser: User
}
