import { AxiosPromise } from 'axios'

import client from 'lib/api/client'

import type { CurrentUserResponse } from 'types/api/session'
import type { FirebaseIdToken } from 'types/firebaseIdToken'

// idTokenをもとにusersテーブル内の該当ユーザーを取得する
export const getCurrentUser = (idToken: FirebaseIdToken): AxiosPromise<CurrentUserResponse> =>
  client.get(`/sessions`, { headers: { Authorization: idToken || '' } })
