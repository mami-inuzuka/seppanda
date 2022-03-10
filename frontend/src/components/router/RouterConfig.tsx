import { VFC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { OnboardingWrapper } from 'components/pages/OnboardingWrapper'
import { Policy } from 'components/pages/Policy'
import { Terms } from 'components/pages/Terms'
import { WelcomeWrapper } from 'components/pages/WelcomeWrapper'

export const RouterConfig: VFC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomeWrapper />} />
      <Route path="/welcome" element={<WelcomeWrapper />} />
      <Route path="/onboarding" element={<OnboardingWrapper />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/policy" element={<Policy />} />
    </Routes>
  </BrowserRouter>
)
