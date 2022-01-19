import { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

/* eslint import/no-cycle: 0 */
import { SignIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'
import { HeaderLayout } from './components/templates/HeaderLayout'
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

export default function App() {
  // サインインしているかどうかをtrue/falseで判別する
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        {/* eslint react/jsx-no-constructed-context-values: 0 */}
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
          <HeaderLayout>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signout" element={<SignUp />} />
            </Routes>
          </HeaderLayout>
        </AuthContext.Provider>
      </ChakraProvider>
    </BrowserRouter>
  )
}
