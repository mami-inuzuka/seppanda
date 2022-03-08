import { VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Box, ChakraProvider } from '@chakra-ui/react'

import { Home } from 'components/pages/Home'
import { NewPaymentEntry } from 'components/pages/NewPaymentEntry'
import { NotFound } from 'components/pages/NotFound'
import { OnboardingWrapper } from 'components/pages/OnboardingWrapper'
import { Setting } from 'components/pages/Setting'
import { ShowPaymentEntry } from 'components/pages/ShowPaymentEntry'
import { WelcomeWrapper } from 'components/pages/WelcomeWrapper'
import { PrivateRoute } from 'components/router/PrivateRoute'
import { AuthProvider } from 'provider/AuthProvider'
import { PaymentProvider } from 'provider/PaymentProvider'
import { theme } from 'theme/index'

const App: VFC = () => (
  <ChakraProvider theme={theme}>
    <Box w="100%" bg="gray.50">
      <Box w="100%" m="0 auto" bg="white" maxW={{ base: 'auto', sm: '400px' }} minW="320px">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={WelcomeWrapper} />
            <Route path="/welcome" component={WelcomeWrapper} />
            <Route path="/onboarding" component={OnboardingWrapper} />
            <AuthProvider>
              <PrivateRoute>
                <PaymentProvider>
                  <Route
                    path="/"
                    render={() => (
                      <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/payments/new" component={NewPaymentEntry} />
                        <Route path="/payments/:id" component={ShowPaymentEntry} />
                        <Route path="/setting" component={Setting} />
                        <Route path="*" component={NotFound} />
                      </Switch>
                    )}
                  />
                </PaymentProvider>
              </PrivateRoute>
            </AuthProvider>
          </Switch>
        </BrowserRouter>
      </Box>
    </Box>
  </ChakraProvider>
)

export default App
