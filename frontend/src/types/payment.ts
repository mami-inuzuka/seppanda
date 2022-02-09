import { User } from './user'

export type Payment = {
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
