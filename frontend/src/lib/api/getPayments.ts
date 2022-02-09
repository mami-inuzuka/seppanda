import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'

import client from 'lib/api/client'

import type { Payment } from 'types/payment'

export const getPayments = (): AxiosPromise<Payment[] | null> =>
  client.get('/payments', {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
