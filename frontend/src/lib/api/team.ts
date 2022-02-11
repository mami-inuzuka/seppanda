import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'

import client from 'lib/api/client'
import { TeamStatusResponse } from 'types/teamStatusResponse'

export const getTeamStatus = (id: number): AxiosPromise<TeamStatusResponse[] | null> =>
  client.get(`/teams/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  })
