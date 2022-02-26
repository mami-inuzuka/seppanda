import { AxiosPromise } from 'axios'

import client from 'lib/api/client'

import type { CreateUserParams } from 'types/createUserParams'
import type { createUserResponse } from 'types/createUserResponse'
import type { FirebaseIdToken } from 'types/firebaseIdToken'
import type { UpdateUserParams } from 'types/updateUserParams'
import type { UpdateUserResponse } from 'types/updateUserResponse'

export const createUser = (params: CreateUserParams, idToken: FirebaseIdToken): AxiosPromise<createUserResponse> =>
  client.post('/users', params, {
    headers: {
      Authorization: idToken || '',
      InvitationToken: params.invitationToken || '',
    },
  })

export const updateUser = (
  params: UpdateUserParams,
  userId: number | undefined,
  idToken: FirebaseIdToken
): AxiosPromise<UpdateUserResponse> =>
  client.patch(`/users/${userId}`, params, { headers: { Authorization: idToken || '' } })
