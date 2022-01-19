import { createContext, useState, VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { Home } from './components/pages/Home'
/* eslint import/no-cycle: 0 */
import { SignIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'
import { HeaderLayout } from './components/templates/HeaderLayout'
import { Private } from './router/PrivateRoute'
import { theme } from './theme'
import { User } from './types/user'

export const AuthContext = createContext(
  {} as {
    isSignedIn: boolean | undefined
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: User | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  }
)

// ユーザーが認証済みかどうかでルーティングを決定
// 未認証だった場合は「/signin」ページに促す

/* eslint react/function-component-definition: 0 */
const App: VFC = () => {
  // サインインしているかどうかをtrue/falseで判別する
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        {/* eslint react/jsx-no-constructed-context-values: 0 */}
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
          <HeaderLayout>
            <Switch>
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Private>
                <Route exact path="/" component={Home} />
              </Private>
            </Switch>
          </HeaderLayout>
        </AuthContext.Provider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
