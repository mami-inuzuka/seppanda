import MockAdapter from 'axios-mock-adapter'

import client from 'lib/api/client'
import { getTeamStatus } from 'lib/api/team'

import teamStatus from '../__mocks__/teamStatus.json'

describe('team API', () => {
  const mock = new MockAdapter(client)

  afterEach(() => {
    mock.reset()
  })

  describe('Getting current team status', () => {
    it('should succeed', async () => {
      const id = 1
      mock.onGet(`/teams/${id}`).reply(200, teamStatus)
      const idToken = 'dummyIdToken'
      const res = await getTeamStatus(id, idToken)
      expect(res.data).toEqual(teamStatus)
    })
  })
})
