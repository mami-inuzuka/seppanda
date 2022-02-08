import type { User } from './user'

export type GetPaymentsResponse = {
  amount: number
  createdAt: string
  id: number
  settled: boolean
  settledAt: null
  teamId: number
  updatedAt: string
  user: User
  userId: number
}
