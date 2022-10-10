import { Avatar } from 'types/avatar'

export type User = {
  id: number
  name: string
  uid: string
  teamId: number
  createdAt: string
  updatedAt: string
  avatar: Avatar
  color: string
}

export type SimpleUser = {
  id: number
  color: string
  avatar: {
    data: string
    dataSmall: string
  }
}
