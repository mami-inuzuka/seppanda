import { useLocation } from 'react-router-dom'

import { Welcome } from '../pages/Welcome'
import { WelcomeWithInvitationToken } from '../pages/WelcomeWithInvitationToken'

export const WelcomeWrapper = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')
  if (invitationToken) {
    return <WelcomeWithInvitationToken />
  }
  return <Welcome />
}
