import { AxiosPromise } from 'axios'

import client from 'lib/api/client'

import type { CreateUserParams } from 'types/createUserParams'
import type { CreateUserResponse } from 'types/createUserResponse'
import type { FirebaseIdToken } from 'types/firebaseIdToken'
import type { UpdateUserParams } from 'types/updateUserParams'
import type { UpdateUserResponse } from 'types/updateUserResponse'

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
