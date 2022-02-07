import { User } from './user'

export type SignUpResponse = {
  data: User
  invitationToken: string
  isTeamCapacityReached: boolean
}
