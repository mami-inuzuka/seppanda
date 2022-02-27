import { AxiosPromise } from 'axios'

import client from 'lib/api/client'

import type { GetInviterResponse } from 'types/getInviterResponse'

export const getInviter = (invitationToken: string): AxiosPromise<GetInviterResponse> =>
  client.get('/invitations', { headers: { invitationToken } })
