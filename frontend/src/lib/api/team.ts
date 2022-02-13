import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'

import client from 'lib/api/client'
import { TeamStatus } from 'types/teamStatus'

export const getTeamStatus = (id: number): AxiosPromise<TeamStatus> =>
  client.get(`/teams/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
