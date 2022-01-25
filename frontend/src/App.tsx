/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useMemo, useState, VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { Home } from './components/pages/Home'
import { SignIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'
import { HeaderLayout } from './components/templates/HeaderLayout'
import { AuthContext } from './context/AuthContext'
import { PrivateRoute } from './router/PrivateRoute'
import { theme } from './theme'
import { Paring } from './components/pages/Paring'
import { getCurrentUser } from './lib/api/auth'
import { User } from './types/user'

// ユーザーが認証済みかどうかでルーティングを決定
// 未認証だった場合は「/signin」ページに促す
const App: VFC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const value = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
    }),
    [isSignedIn]
  )

  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log('getCurrentUserのres ')
      console.log(res?.data)
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
        console.log(isSignedIn)
      } else {
        console.log('No current user')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleGetCurrentUser()
  }, [setCurrentUser])

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContext.Provider value={value}>
          <HeaderLayout>
            <Switch>
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/paring" component={Paring} />
              <PrivateRoute>
                <Route exact path="/" component={Home} />
              </PrivateRoute>
            </Switch>
          </HeaderLayout>
        </AuthContext.Provider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
