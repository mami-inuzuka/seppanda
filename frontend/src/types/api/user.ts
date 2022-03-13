import type { User } from 'types/user'

export type CreateUserParams = {
  name: string | null
  avatar?: { data: string; name: string }
  invitationToken: string | null
}

export type CreateUserResponse = {
  user: User
  invitationToken: string
  isTeamCapacityReached: boolean
}

export type UpdateUserParams = {
  name: string
  avatar?: { data: string; name: string }
}

export type UpdateUserResponse = {
  user: User
}
