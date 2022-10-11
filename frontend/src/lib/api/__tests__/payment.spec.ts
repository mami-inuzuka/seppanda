import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import payment from 'lib/api/__mocks__/payment.json'
import paymentList from 'lib/api/__mocks__/paymentList.json'
import client from 'lib/api/client'
import { getPayments, postPayment, updatePayment, deletePayment, settleTeamPayments } from 'lib/api/payment'

import type { PostPaymentParams } from 'types/api/payment'

describe('payment API', () => {
  const mock = new MockAdapter(client)

  afterEach(() => {
    mock.reset()
  })

  describe('Getting current payment list', () => {
    it('should succeed', async () => {
      mock.onGet('/payments').reply(200, paymentList)
      const idToken = 'dummyIdToken'
      const res = await getPayments({ page: 1 }, idToken)
      expect(res.data).toEqual(paymentList)
    })
  })

  describe('Post payment', () => {
    it('should succeed', async () => {
      mock.onPost('/payments').reply(200, payment)
      const idToken = 'dummyIdToken'
      const params: PostPaymentParams = {
        amount: '1000',
        detail: '外食',
        paidAt: '2022-03-22',
      }
      const res = await postPayment(params, idToken)
      expect(res.data).toEqual(payment)
    })

    it('should fail with invalid params', async () => {
      mock.onPost('/payments').reply(422, { messages: ['金額は数値で入力してください'] })
      const idToken = 'dummyIdToken'
      const params: PostPaymentParams = {
        amount: 'あああ',
        detail: '外食',
        paidAt: '2022-03-22',
      }
      try {
        await postPayment(params, idToken)
      } catch (error) {
        expect(axios.isAxiosError(error)).toBe(true)
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(422)
        }
      }
    })
  })

  describe('Update payment', () => {
    it('should succeed', async () => {
      const id = 1
      mock.onPatch(`/payments/${id}`).reply(200, payment)
      const idToken = 'dummyIdToken'
      const params: PostPaymentParams = {
        amount: '1200',
        detail: '外食',
        paidAt: '2022-03-22',
      }
      const res = await updatePayment(params, id, idToken)
      expect(res.data).toEqual(payment)
    })

    it('should fail with invalid params', async () => {
      const id = 1
      mock.onPatch(`/payments/${id}`).reply(422, { messages: ['金額は数値で入力してください'] })
      const idToken = 'dummyIdToken'
      const params: PostPaymentParams = {
        amount: 'あああ',
        detail: '外食',
        paidAt: '2022-03-22',
      }
      try {
        await updatePayment(params, id, idToken)
      } catch (error) {
        expect(axios.isAxiosError(error)).toBe(true)
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(422)
        }
      }
    })
  })

  describe('Delete payment', () => {
    it('should succeed', async () => {
      const id = 1
      mock.onDelete(`/payments/${id}`).reply(200, { status: 'ok' })
      const idToken = 'dummyIdToken'
      const res = await deletePayment(id, idToken)
      expect(res.data).toEqual({ status: 'ok' })
    })
  })

  describe('Settle team payments', () => {
    it('should succeed', async () => {
      const teamId = 1
      mock.onPatch(`teams/${teamId}/payments`).reply(200, { status: 'ok' })
      const idToken = 'dummyIdToken'
      const res = await settleTeamPayments(teamId, idToken)
      expect(res.data).toEqual({ status: 'ok' })
    })
  })
})
