import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'

import { PostPaymentParams } from '../../types/postPaymentParams'
import { PostPaymentResponse } from '../../types/postPaymentResponse'
import client from './client'

export const postPayment = (params: PostPaymentParams): AxiosPromise<PostPaymentResponse> =>
  client.post('/payments', params, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
