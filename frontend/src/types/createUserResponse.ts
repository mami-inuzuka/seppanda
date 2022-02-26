import type { User } from 'types/user'

export type CreateUserResponse = {
  user: User
  invitationToken: string
  isTeamCapacityReached: boolean
}
