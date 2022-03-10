import { createContext } from 'react'

import type { User } from 'types/user'

export type UserContextType = {
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
})
