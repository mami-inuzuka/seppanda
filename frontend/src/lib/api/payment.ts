import { AxiosPromise } from 'axios'

import client from 'lib/api/client'
import { PostPaymentParams } from 'types/postPaymentParams'

import type { FirebaseIdToken } from 'types/firebaseIdToken'
import type { Payment } from 'types/payment'
import type { PaymentListGroupByPaidAt } from 'types/paymentListGroupByPaidAt'

export const getPayments = (idToken: FirebaseIdToken): AxiosPromise<PaymentListGroupByPaidAt[]> =>
  client.get('/payments', { headers: { Authorization: idToken || '' } })

export const postPayment = (params: PostPaymentParams, idToken: FirebaseIdToken): AxiosPromise<Payment> =>
  client.post('/payments', params, { headers: { Authorization: idToken || '' } })

export const updatePayment = (params: PostPaymentParams, id: number, idToken: FirebaseIdToken): AxiosPromise<Payment> =>
  client.patch(`/payments/${id}`, params, { headers: { Authorization: idToken || '' } })

export const deletePayment = (id: number, idToken: FirebaseIdToken) =>
  client.delete(`/payments/${id}`, { headers: { Authorization: idToken || '' } })

export const settleTeamPayments = (teamId: number, idToken: FirebaseIdToken) =>
  client.patch(`teams/${teamId}/payments`, '', { headers: { Authorization: idToken || '' } })
