import type { User } from 'types/user'

export type SignUpResponse = {
  user: User
  invitationToken: string
  isTeamCapacityReached: boolean
}
