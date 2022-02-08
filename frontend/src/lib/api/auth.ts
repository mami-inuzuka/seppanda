import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'

import client from 'lib/api/client'

import type { CurrentUserResponse } from 'types/currentUserResponse'
import type { SignInParams } from 'types/signInParams'
import type { SignInResponse } from 'types/signInResponse'
import type { SignUpParams } from 'types/signUpParams'
import type { SignUpResponse } from 'types/signUpResponse'

export const signUp = (params: SignUpParams, token?: string | null): AxiosPromise<SignUpResponse> =>
  client.post('/auth', params, { headers: { InvitationToken: token || '' } })

export const signIn = (params: SignInParams): AxiosPromise<SignInResponse> => client.post('/auth/sign_in', params)

// 認証済みのユーザーを取得
export const getCurrentUser = (): AxiosPromise<CurrentUserResponse> | undefined => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return undefined
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
}
