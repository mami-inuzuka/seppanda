import { AxiosPromise } from 'axios'

import client from 'lib/api/client'

import type { CreateUserParams, CreateUserResponse, UpdateUserParams, UpdateUserResponse } from 'types/api/user'
import type { FirebaseIdToken } from 'types/firebaseIdToken'

export const createUser = (params: CreateUserParams, idToken: FirebaseIdToken): AxiosPromise<CreateUserResponse> =>
  client.post('/users', params, {
    headers: {
      Authorization: idToken || '',
      InvitationToken: params.invitationToken || '',
    },
  })

// TODO: 操作対象のリソースはidTokenから割り出せるため:idの指定は不要だがルーティングに合わせて:idをセットするかどうか決める。1はdummy
export const updateUser = (params: UpdateUserParams, idToken: FirebaseIdToken): AxiosPromise<UpdateUserResponse> =>
  client.patch('/users/1', params, { headers: { Authorization: idToken || '' } })
