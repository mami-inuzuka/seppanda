import { VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from 'components/pages/Home'
import { NewPaymentEntry } from 'components/pages/NewPaymentEntry'
import { NotFound } from 'components/pages/NotFound'
import { OnboardingWrapper } from 'components/pages/OnboardingWrapper'
import { Policy } from 'components/pages/Policy'
import { Setting } from 'components/pages/Setting'
import { ShowPaymentEntry } from 'components/pages/ShowPaymentEntry'
import { Terms } from 'components/pages/Terms'
import { WelcomeWrapper } from 'components/pages/WelcomeWrapper'
import { PrivateRoute } from 'components/router/PrivateRoute'

export const RouterConfig: VFC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={WelcomeWrapper} />
      <Route path="/welcome" component={WelcomeWrapper} />
      <Route path="/onboarding" component={OnboardingWrapper} />
      <Route path="/terms" component={Terms} />
      <Route path="/policy" component={Policy} />
      <PrivateRoute>
        <>
          <Route path="/home" component={Home} />
          <Route path="/payments/new" component={NewPaymentEntry} />
          <Route path="/payments/:id" component={ShowPaymentEntry} />
          <Route path="/setting" component={Setting} />
          <Route path="*" component={NotFound} />
        </>
      </PrivateRoute>
    </Switch>
  </BrowserRouter>
)
