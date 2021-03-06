import type { User } from 'types/user'

export type TeamStatus = {
  refundAmount: number
  largestPaymentUser: User | null
  smallestPaymentUser: User | null
  isTeamCapacityReached: boolean
  invitationToken: string
}
