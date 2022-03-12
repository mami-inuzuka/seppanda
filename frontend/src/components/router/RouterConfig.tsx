import { VFC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from 'components/pages/Home'
import { NewPaymentEntry } from 'components/pages/NewPaymentEntry'
import { NotFound } from 'components/pages/NotFound'
import { OnboardingWrapper } from 'components/pages/OnboardingWrapper'
import { Policy } from 'components/pages/Policy'
import { Setting } from 'components/pages/Setting'
import { ShowPaymentEntry } from 'components/pages/ShowPaymentEntry'
import { SignInWithFirebase } from 'components/pages/SignInWithFirebase'
import { Terms } from 'components/pages/Terms'
import { WelcomeWrapper } from 'components/pages/WelcomeWrapper'
import { PrivateRoute } from 'components/router/PrivateRoute'

export const RouterConfig: VFC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomeWrapper />} />
      <Route path="/welcome" element={<WelcomeWrapper />} />
      <Route path="/onboarding" element={<OnboardingWrapper />} />
      <Route path="/signin" element={<SignInWithFirebase />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/policy" element={<Policy />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/payments/new" element={<NewPaymentEntry />} />
        <Route path="/payments/:id" element={<ShowPaymentEntry />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
