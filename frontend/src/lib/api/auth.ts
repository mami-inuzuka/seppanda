import Cookies from 'js-cookie'
import client from './client'

import { SignUpParams } from '../../types/signUpParams'
import { SignInParams } from '../../types/signInParams'

export const signUp = (params: SignUpParams, token?: string | null) =>
  client.post('auth', params, { headers: { ParingToken: token || '' } })

export const signIn = (params: SignInParams) => client.post('auth/sign_in', params)

export const signOut = () =>
  client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return false
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
}
