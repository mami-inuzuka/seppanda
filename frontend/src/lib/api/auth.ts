import { AxiosPromise } from 'axios'

import client from 'lib/api/client'

import type { CreateUserParams } from 'types/createUserParams'
import type { CurrentUserResponse } from 'types/currentUserResponse'
import type { FirebaseIdToken } from 'types/firebaseIdToken'
import type { SignInParams } from 'types/signInParams'
import type { SignInResponse } from 'types/signInResponse'
import type { SignUpResponse } from 'types/signUpResponse'
import type { UpdateUserParams } from 'types/updateUserParams'
import type { UpdateUserResponse } from 'types/updateUserResponse'

export const createUser = (params: CreateUserParams, idToken: FirebaseIdToken): AxiosPromise<SignUpResponse> =>
  client.post('/auth/registrations', params, {
    headers: {
      Authorization: idToken || '',
      InvitationToken: params.invitationToken || '',
    },
  })

export const signIn = (params: SignInParams): AxiosPromise<SignInResponse> => client.post('/auth/sign_in', params)

export const updateUser = (
  params: UpdateUserParams,
  userId: number | undefined,
  idToken: FirebaseIdToken
): AxiosPromise<UpdateUserResponse> =>
  client.patch(`/auth/registrations/${userId}`, params, { headers: { Authorization: idToken || '' } })

// idTokenをもとにusersテーブル内の該当ユーザーを取得する
export const getCurrentUser = (idToken: FirebaseIdToken): AxiosPromise<CurrentUserResponse> | undefined =>
  client.get(`/auth/sessions`, { headers: { Authorization: idToken || '' } })
