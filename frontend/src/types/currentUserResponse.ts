import type { Avatar } from './avatar'
import type { User } from 'types/user'

export type CurrentUserResponse = {
  user: User
  isLogin: boolean
  avatar: Avatar
}
