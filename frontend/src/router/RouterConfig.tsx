import { VFC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from 'pages/Home'
import { NewPaymentEntry } from 'pages/NewPaymentEntry'
import { NotFound } from 'pages/NotFound'
import { Policy } from 'pages/Policy'
import { Setting } from 'pages/Setting'
import { ShowPaymentEntry } from 'pages/ShowPaymentEntry'
import { SignInWithFirebase } from 'pages/SignInWithFirebase'
import { Terms } from 'pages/Terms'
import { OnboardingWrapper } from 'router/OnboardingWrapper'
import { PrivateRoute } from 'router/PrivateRoute'
import { WelcomeWrapper } from 'router/WelcomeWrapper'

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
