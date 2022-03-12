import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { GoogleAuthProvider } from 'firebase/auth'

import { FullWindowSpinner } from 'components/organisms/FullWindowSpinner'
import { AuthContext } from 'context/AuthContext'
import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

/**
 * FirebaseAuthenticationで実際にサインインを実行するためのページ
 */

export const SignInWithFirebase = () => {
  const { errorToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser, setCurrentUser, setCurrentFirebaseUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const { search } = useLocation()
  const location = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')
  type LocationStateType = {
    referrer: string
  }
  const locationState = location.state as LocationStateType

  const handleDecideNextPage = async () => {
    try {
      const token = await auth.currentUser?.getIdToken(true)
      const res = await getCurrentUser(token)
      if (res?.data.isExisted) {
        setCurrentUser(res.data.user)
        navigate('/home')
      } else {
        navigate('/onboarding', { state: { invitationToken, referrer: 'welcome' } })
      }
    } catch {
      errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
    }
  }

  // GoogleSignInの処理
  useEffect(() => {
    if (locationState?.referrer === 'signin') {
      const provider = new GoogleAuthProvider()
      auth.signInWithRedirect(provider).catch(() => {
        errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // SignInに成功し、リダイレクトした後の処理
  useEffect(() => {
    if (!locationState) {
      auth
        .getRedirectResult()
        .then((result) => {
          if (result.user) {
            handleDecideNextPage().catch(() => {
              errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
            })
            setCurrentFirebaseUser(result.user)
          } else {
            setCurrentFirebaseUser(null)
            setCurrentUser(null)
          }
        })
        .catch(() => {
          errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGoToHomePage = () => {
    navigate('/home')
  }

  useEffect(() => {
    if (currentUser) {
      // currentUserが最新に書きかわったのを確認して遷移する
      handleGoToHomePage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{isLoading && <FullWindowSpinner />}</>
}
