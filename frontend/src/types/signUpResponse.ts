export type SignUpResponse = {
  data: {
    allowPasswordChange: false
    createdAt: string
    email: string
    id: number
    image?: string
    name: string
    nickname?: string
    provider: string
    teamId: number
    uid: string
    updatedAt: string
  }
  paringToken: string
  status: string
}
