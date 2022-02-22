import { AxiosPromise } from 'axios'

import client from 'lib/api/client'
import { TeamStatus } from 'types/teamStatus'

import type { FirebaseIdToken } from 'types/firebaseIdToken'

export const getTeamStatus = (id: number, idToken: FirebaseIdToken): AxiosPromise<TeamStatus> =>
  client.get(`/teams/${id}`, { headers: { Authorization: idToken || '' } })
