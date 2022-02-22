import { AxiosPromise } from 'axios'

import client from 'lib/api/client'
import { GetCurrentUserParams } from 'types/getCurrentUserParams'

import type { CurrentUserResponse } from 'types/currentUserResponse'
import type { FirebaseIdToken } from 'types/firebaseIdToken'
import type { SignInParams } from 'types/signInParams'
import type { SignInResponse } from 'types/signInResponse'
import type { SignUpParams } from 'types/signUpParams'
import type { SignUpResponse } from 'types/signUpResponse'
import type { UpdateUserParams } from 'types/updateUserParams'
import type { UpdateUserResponse } from 'types/updateUserResponse'

export const signUp = (params: SignUpParams, invitationToken?: string | null): AxiosPromise<SignUpResponse> =>
  client.post('/auth/registrations', params, {
    headers: {
      Authorization: params.token || '',
      InvitationToken: invitationToken || '',
    },
  })

export const signIn = (params: SignInParams): AxiosPromise<SignInResponse> => client.post('/auth/sign_in', params)

export const updateUser = (params: UpdateUserParams, idToken: FirebaseIdToken): AxiosPromise<UpdateUserResponse> =>
  client.patch('/auth', params, { headers: { Authorization: idToken || '' } })

// idTokenをもとにusersテーブル内の該当ユーザーを取得する
export const getCurrentUser = (
  params: GetCurrentUserParams,
  idToken: FirebaseIdToken
): AxiosPromise<CurrentUserResponse> | undefined =>
  client.get(`/auth/sessions?uid=${params.uid}`, { headers: { Authorization: idToken || '' } })
