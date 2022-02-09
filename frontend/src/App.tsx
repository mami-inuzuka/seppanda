import { useEffect, useState, VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { Home } from 'components/pages/Home'
import { Invitation } from 'components/pages/Invitation'
import { NewPaymentEntry } from 'components/pages/NewPaymentEntry'
import { ShowPaymentEntry } from 'components/pages/ShowPaymentEntry'
import { SignIn } from 'components/pages/SignIn'
import { SignUp } from 'components/pages/SignUp'
import { PrivateRoute } from 'components/router/PrivateRoute'
import { HeaderLayout } from 'components/templates/HeaderLayout'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { getCurrentUser } from 'lib/api/auth'
import { theme } from 'theme'

import type { Payment } from 'types/payment'
import type { User } from 'types/user'

const App: VFC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [inputNumber, setInputNumber] = useState<string>('0')
  const [paymentList, setPaymentList] = useState<Payment[] | null>(null)
  const [isPaymentsLoaded, setIsPaymentsLoaded] = useState<boolean>(false)

  // サインイン状態をチェック
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
      } else {
        console.log('No current user')
      }
    } catch (err) {
      console.log(err)
    }
    setIsLoaded(true)
  }

  useEffect(() => {
    handleGetCurrentUser().catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
        <AuthContext.Provider value={{ isLoaded, setIsLoaded, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
          <HeaderLayout>
            <Switch>
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/invitation" component={Invitation} />

              <PaymentContext.Provider
                // eslint-disable-next-line react/jsx-no-constructed-context-values
                value={{
                  inputNumber,
                  setInputNumber,
                  paymentList,
                  setPaymentList,
                  isPaymentsLoaded,
                  setIsPaymentsLoaded,
                }}
              >
                <PrivateRoute>
                  <Route
                    path="/"
                    render={({ match: { url } }) => (
                      <Switch>
                        <Route exact path={url} component={Home} />
                        <Route path="/payments/new" component={NewPaymentEntry} />
                        <Route path="/payments/:id" component={ShowPaymentEntry} />
                      </Switch>
                    )}
                  />
                </PrivateRoute>
              </PaymentContext.Provider>
            </Switch>
          </HeaderLayout>
        </AuthContext.Provider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
