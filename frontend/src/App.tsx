import { useState, VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import { DateTime } from 'luxon'

import { EmailConfirmation } from 'components/pages/EmailConfirmation'
import { Home } from 'components/pages/Home'
import { Invitation } from 'components/pages/Invitation'
import { NewPaymentEntry } from 'components/pages/NewPaymentEntry'
import { Setting } from 'components/pages/Setting'
import { ShowPaymentEntry } from 'components/pages/ShowPaymentEntry'
import { SignIn } from 'components/pages/SignIn'
import { PrivateRoute } from 'components/router/PrivateRoute'
import { PaymentContext } from 'context/PaymentContext'
import { AuthProvider } from 'provider/AuthProvider'
import { theme } from 'theme/index'

import type { PaymentListGroupByPaidAt } from 'types/paymentListGroupByPaidAt'
import type { TeamStatus } from 'types/teamStatus'

const App: VFC = () => {
  const [paymentList, setPaymentList] = useState<PaymentListGroupByPaidAt[]>([])
  const [teamStatus, setTeamStatus] = useState<TeamStatus>({
    refundAmount: 0,
    largestPaymentUser: null,
    smallestPaymentUser: null,
    isTeamCapacityReached: false,
    invitationToken: '',
  })
  const [isPaymentListLoaded, setIsPaymentListLoaded] = useState<boolean>(false)
  const [isTeamStatusLoaded, setIsTeamStatusLoaded] = useState<boolean>(false)
  const [inputAmount, setInputAmount] = useState<string>('')
  const [inputDetail, setInputDetail] = useState<string>('')
  const [inputPaidAt, setInputPaidAt] = useState<string>(DateTime.local().toFormat('yyyy-MM-dd'))

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/invitation" component={Invitation} />
          <Route path="/confirmation" component={EmailConfirmation} />
          <AuthProvider>
            <PaymentContext.Provider
              // eslint-disable-next-line react/jsx-no-constructed-context-values
              value={{
                inputAmount,
                setInputAmount,
                inputDetail,
                setInputDetail,
                inputPaidAt,
                setInputPaidAt,
                paymentList,
                setPaymentList,
                isPaymentListLoaded,
                setIsPaymentListLoaded,
                teamStatus,
                setTeamStatus,
                isTeamStatusLoaded,
                setIsTeamStatusLoaded,
              }}
            >
              <PrivateRoute>
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
              </PrivateRoute>
            </PaymentContext.Provider>
          </AuthProvider>
        </Switch>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
