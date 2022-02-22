import { useEffect, useState, VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import firebase from 'firebase/compat/app'
import { DateTime } from 'luxon'

import { EmailConfirmation } from 'components/pages/EmailConfirmation'
import { Home } from 'components/pages/Home'
import { Invitation } from 'components/pages/Invitation'
import { NewPaymentEntry } from 'components/pages/NewPaymentEntry'
import { Setting } from 'components/pages/Setting'
import { ShowPaymentEntry } from 'components/pages/ShowPaymentEntry'
import { SignIn } from 'components/pages/SignIn'
import { SignUp } from 'components/pages/SignUp'
import { PrivateRoute } from 'components/router/PrivateRoute'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'
import { getCurrentUser } from 'lib/api/auth'
import { auth } from 'lib/firebase'
import { theme } from 'theme/index'
import { GetCurrentUserParams } from 'types/getCurrentUserParams'

import type { PaymentListGroupByPaidAt } from 'types/paymentListGroupByPaidAt'
import type { TeamStatus } from 'types/teamStatus'
import type { User } from 'types/user'

const App: VFC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentFirebaseUser, setCurrentFirebaseUser] = useState<firebase.User | null>(null)
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

  const handleGetCurrentUser = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const params: GetCurrentUserParams = {
      uid: auth.currentUser?.uid,
    }
    try {
      const res = await getCurrentUser(params, token)
      if (res?.status === 200) {
        setCurrentUser(res.data.user)
        setIsLoaded(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setCurrentFirebaseUser(user)
    })
    return () => {
      unsubscribed()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleGetCurrentUser().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFirebaseUser])

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContext.Provider
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          value={{
            isLoaded,
            setIsLoaded,
            isSignedIn,
            setIsSignedIn,
            currentUser,
            setCurrentUser,
            currentFirebaseUser,
          }}
        >
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/invitation" component={Invitation} />
            <Route path="/confirmation" component={EmailConfirmation} />
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
          </Switch>
        </AuthContext.Provider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
