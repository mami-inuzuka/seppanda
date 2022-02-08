import type { User } from 'types/user'

export type CurrentUserResponse = {
  data: User
  isLogin: boolean
}
