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
  })
})
