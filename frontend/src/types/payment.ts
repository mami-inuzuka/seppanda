import type { User } from 'types/user'

export type Payment = {
  amount: number
  paidAt: string
  detail: string
  id: number
  settled: boolean
  settledAt: null
  user: User
}
