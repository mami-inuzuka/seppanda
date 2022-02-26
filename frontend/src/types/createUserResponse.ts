import type { User } from 'types/user'

export type createUserResponse = {
  user: User
  invitationToken: string
  isTeamCapacityReached: boolean
}
