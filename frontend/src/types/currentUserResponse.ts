import type { Avatar } from 'types/avatar'
import type { User } from 'types/user'

export type CurrentUserResponse = {
  user: User
  isLogin: boolean
  avatar: Avatar
}
