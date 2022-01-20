import { useState, VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { Home } from './components/pages/Home'
import { SignIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'
import { HeaderLayout } from './components/templates/HeaderLayout'
import { AuthContext } from './context/AuthContext'
import { PrivateRoute } from './router/PrivateRoute'
import { theme } from './theme'

// ユーザーが認証済みかどうかでルーティングを決定
// 未認証だった場合は「/signin」ページに促す
const App: VFC = () => {
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
