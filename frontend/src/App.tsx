import { ChakraProvider } from '@chakra-ui/react'
import { createContext, useState, VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './components/pages/Home'
/* eslint import/no-cycle: 0 */
import { SignIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'
import { HeaderLayout } from './components/templates/HeaderLayout'
import { Private } from './router/PrivateRoute'
import { theme } from './theme'

export const AuthContext = createContext(
  {} as {
    isSignedIn: boolean | undefined
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  }
)

// ユーザーが認証済みかどうかでルーティングを決定
// 未認証だった場合は「/signin」ページに促す

/* eslint react/function-component-definition: 0 */
const App: VFC = () => {
  // サインインしているかどうかをtrue/falseで判別する
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        {/* eslint react/jsx-no-constructed-context-values: 0 */}
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
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
