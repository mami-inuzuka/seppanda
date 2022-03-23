import MockAdapter from 'axios-mock-adapter'

import currentUser from 'lib/api/__mocks__/currentUser.json'
import client from 'lib/api/client'
import { getCurrentUser } from 'lib/api/session'

describe('session API', () => {
  const mock = new MockAdapter(client)

  afterEach(() => {
    mock.reset()
  })

  describe('Getting current user', () => {
    it('should succeed', async () => {
      mock.onGet('/sessions').reply(200, currentUser)
      const idTtoken = 'dummyIdToken'
      const res = await getCurrentUser(idTtoken)
      expect(res.data).toEqual(currentUser)
    })
  })
})
