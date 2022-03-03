import { useLocation } from 'react-router-dom'

import { NotFound } from './NotFound'
import { Onboarding } from './Onboarding'

type LocationState = {
  referrer: string
}

export const OnboardingWrapper = () => {
  const location = useLocation<LocationState>()
  if (location.state?.referrer === 'welcome') {
    return <Onboarding />
  }
  return <NotFound />
}
