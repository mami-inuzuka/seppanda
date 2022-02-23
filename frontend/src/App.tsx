import { VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { EmailConfirmation } from 'components/pages/EmailConfirmation'
import { Home } from 'components/pages/Home'
import { Invitation } from 'components/pages/Invitation'
import { NewPaymentEntry } from 'components/pages/NewPaymentEntry'
import { Setting } from 'components/pages/Setting'
import { ShowPaymentEntry } from 'components/pages/ShowPaymentEntry'
import { SignIn } from 'components/pages/SignIn'
import { PrivateRoute } from 'components/router/PrivateRoute'
import { AuthProvider } from 'provider/AuthProvider'
import { PaymentProvider } from 'provider/PaymentProvider'
import { theme } from 'theme/index'

const App: VFC = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/invitation" component={Invitation} />
        <Route path="/confirmation" component={EmailConfirmation} />
        <AuthProvider>
          <PrivateRoute>
            <PaymentProvider>
              <Route
                path="/"
                render={() => (
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/payments/new" component={NewPaymentEntry} />
                    <Route path="/payments/:id" component={ShowPaymentEntry} />
                    <Route path="/setting" component={Setting} />
                  </Switch>
                )}
              />
            </PaymentProvider>
          </PrivateRoute>
        </AuthProvider>
      </Switch>
    </ChakraProvider>
  </BrowserRouter>
)

export default App
