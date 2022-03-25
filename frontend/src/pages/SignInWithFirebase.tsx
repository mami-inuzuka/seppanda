import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth'

import { FullWindowSpinner } from 'components/organisms/spinner/FullWindowSpinner'
import { AuthContext } from 'context/AuthContext'
import { useToast } from 'hooks/useToast'
import { getCurrentUser } from 'lib/api/session'
import { auth } from 'lib/firebase'

/**
 * FirebaseAuthenticationで実際にサインインを実行するためのページ
 */

export const SignInWithFirebase = () => {
  const { errorToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser, setCurrentUser, setCurrentFirebaseUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  type LocationStateType = {
    referrer: string
    invitationToken: string
  }
  const locationState = location.state as LocationStateType
  const invitationTokenFromWelcomePage = locationState?.invitationToken

  const handleDecideNextPage = async () => {
    try {
      const token = await auth.currentUser?.getIdToken(true)
      const res = await getCurrentUser(token)
      if (res?.data.isExisted) {
        setCurrentUser(res.data.user)
        navigate('/home')
      } else {
        navigate('/onboarding', { state: { referrer: 'welcome' } })
      }
    } catch {
      errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
      navigate('/welcome')
    }
  }

  // GoogleSignInの処理
  useEffect(() => {
    if (locationState?.referrer === 'signin') {
      const provider = new GoogleAuthProvider()
      signInWithRedirect(auth, provider).catch(() => {
        errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
        navigate('/welcome')
      })
      if (invitationTokenFromWelcomePage) {
        localStorage.setItem('invitationToken', invitationTokenFromWelcomePage)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // SignInに成功し、リダイレクトした後の処理
  useEffect(() => {
    if (!locationState) {
      getRedirectResult(auth)
        .then((result) => {
          if (result?.user) {
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
