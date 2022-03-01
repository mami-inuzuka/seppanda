import { useHistory } from 'react-router-dom'

import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'

export const useSignOut = () => {
  const history = useHistory()
  const { errorToast, successToast } = useToast()

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      history.push('/welcome')
      successToast('ログアウトしました')
    } catch {
      errorToast('エラーが発生しました')
    }
  }

  return { handleSignOut }
}
