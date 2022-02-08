import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'

import { GetPaymentsResponse } from '../../types/getPaymentsResponse'
import client from './client'

export const getPayments = (): AxiosPromise<GetPaymentsResponse[] | undefined> =>
  client.get('/payments', {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
