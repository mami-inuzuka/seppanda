import { AxiosPromise } from 'axios'

import client from 'lib/api/client'

import type { CurrentUserResponse } from 'types/currentUserResponse'
import type { FirebaseIdToken } from 'types/firebaseIdToken'

// idTokenをもとにusersテーブル内の該当ユーザーを取得する
export const getCurrentUser = (idToken: FirebaseIdToken): AxiosPromise<CurrentUserResponse> | undefined =>
  client.get(`/sessions`, { headers: { Authorization: idToken || '' } })
