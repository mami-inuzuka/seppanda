import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { UserContext } from 'context/UserContext'
import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

export const useSignInWithGoogle = () => {
  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()
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
          setCurrentUser(res.data.user)
          navigate('/home')
        } else {
          navigate('/onboarding', { state: { invitationToken, referrer: 'welcome' } })
        }
      })
      .catch(() => {
        errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return { signInWithGoogle, isLoading }
}
