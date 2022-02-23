export type CreateUserParams = {
  name: string | null
  avatar?: { data: string; name: string }
  invitationToken: string | null
}
