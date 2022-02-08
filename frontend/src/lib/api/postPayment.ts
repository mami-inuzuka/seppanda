import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'

import client from './client'

import type { Payment } from '../../types/payment'
import type { PostPaymentParams } from '../../types/postPaymentParams'

export const postPayment = (params: PostPaymentParams): AxiosPromise<Payment> =>
  client.post('/payments', params, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
