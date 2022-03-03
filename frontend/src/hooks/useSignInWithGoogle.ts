import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

export const useSignInWithGoogle = () => {
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')
  const [isLoading, setIsLoading] = useState(false)
  const { errorToast } = useToast()

  const handleGetCurrentUser = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const res = await getCurrentUser(token)
    return res
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(() => {
        setIsLoading(true)
      })
      .then(handleGetCurrentUser)
      .then((res) => {
        if (res?.data.isExisted) {
          history.push('/')
        } else {
          history.push({
            pathname: '/onboarding',
            state: { invitationToken, referrer: 'welcome' },
          })
        }
      })
      .catch((error) => {
        errorToast('エラーが発生しました')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return { signInWithGoogle, isLoading }
}
