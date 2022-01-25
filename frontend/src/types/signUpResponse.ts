import { User } from './user'

export type SignUpResponse = {
  data: User
  paringToken: string
  status: string
}
