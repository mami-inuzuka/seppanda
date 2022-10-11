import { AxiosPromise } from 'axios'

import client from 'lib/api/client'

import type { Payment, PostPaymentParams, GetPaymentParams, PaymentResponse } from 'types/api/payment'
import type { FirebaseIdToken } from 'types/firebaseIdToken'

export const getPayments = (params: GetPaymentParams, idToken: FirebaseIdToken): AxiosPromise<PaymentResponse> =>
  client.get('/payments', { headers: { Authorization: idToken || '' }, params })

export const postPayment = (params: PostPaymentParams, idToken: FirebaseIdToken): AxiosPromise<Payment> =>
  client.post('/payments', params, { headers: { Authorization: idToken || '' } })

export const updatePayment = (params: PostPaymentParams, id: number, idToken: FirebaseIdToken): AxiosPromise<Payment> =>
  client.patch(`/payments/${id}`, params, { headers: { Authorization: idToken || '' } })

export const deletePayment = (id: number, idToken: FirebaseIdToken) =>
  client.delete(`/payments/${id}`, { headers: { Authorization: idToken || '' } })

export const settleTeamPayments = (teamId: number, idToken: FirebaseIdToken) =>
  client.patch(`teams/${teamId}/payments`, '', { headers: { Authorization: idToken || '' } })
