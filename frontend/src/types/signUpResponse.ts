import type { User } from 'types/user'

export type SignUpResponse = {
  data: User
  invitationToken: string
  isTeamCapacityReached: boolean
}
