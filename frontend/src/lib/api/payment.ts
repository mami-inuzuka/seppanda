import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'

import client from 'lib/api/client'
import { PostPaymentParams } from 'types/postPaymentParams'

import type { GetPaymentsResponse } from 'types/getPaymentsResponse'
import type { Payment } from 'types/payment'

export const getPayments = (): AxiosPromise<GetPaymentsResponse[] | null> =>
  client.get('/payments', {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })

export const postPayment = (params: PostPaymentParams): AxiosPromise<Payment> =>
  client.post('/payments', params, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })

export const updatePayment = (params: PostPaymentParams, id: number): AxiosPromise<Payment> =>
  client.patch(`/payments/${id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })

export const deletePayment = (id: number) =>
  client.delete(`/payments/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
