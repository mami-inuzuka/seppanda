import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import client from 'lib/api/client'
import { getInviter } from 'lib/api/invitation'

import inviter from '../__mocks__/inviter.json'

describe('invitations API', () => {
  const mock = new MockAdapter(client)

  afterEach(() => {
    mock.reset()
  })

  describe('Getting inviter', () => {
    it('should succeed', async () => {
      mock.onGet('/invitations').reply(200, inviter)
      const invitationToken = 'dummyInvitationToken'
      const res = await getInviter(invitationToken)
      expect(res.data).toEqual(inviter)
    })

    it('should fail with invalid invitation token', async () => {
      mock.onGet('/invitations').reply(422, { message: '不正な招待URLです' })
      const invitationToken = 'dummyInvitationToken'
      try {
        await getInviter(invitationToken)
      } catch (error) {
        expect(axios.isAxiosError(error)).toBe(true)
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(422)
        }
      }
    })
  })
})
