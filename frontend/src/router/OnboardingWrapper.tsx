import { useLocation } from 'react-router-dom'

import { NotFound } from '../pages/NotFound'
import { Onboarding } from '../pages/Onboarding'

type LocationState = {
  referrer: string
}

export const OnboardingWrapper = () => {
  const location = useLocation()
  if ((location.state as LocationState).referrer === 'welcome') {
    return <Onboarding />
  }
  return <NotFound />
}
