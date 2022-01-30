export type SignUpErrorResponse = {
  success: boolean
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    passwordConfirmation?: string[]
    fullMessages: string[]
  }
}
