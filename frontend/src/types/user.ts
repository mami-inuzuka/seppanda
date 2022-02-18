import { Avatar } from 'types/avatar'

export type User = {
  id: number
  name: string
  email: string
  uid: string
  teamId: number
  allowPasswordChange: false
  createdAt: string
  updatedAt: string
  avatar: Avatar
  color: string
  isDebt: boolean
}
