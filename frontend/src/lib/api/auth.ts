import Cookies from 'js-cookie'

import { SignInParams } from '../../types/signInParams'
import { SignUpParams } from '../../types/signUpParams'
import client from './client'

export const signUp = (params: SignUpParams) => client.post('auth', params)

export const signIn = (params: SignInParams) => client.post('auth/sign_in', params)

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
