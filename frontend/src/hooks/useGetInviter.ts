import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import axios from 'axios'

import { getInviter } from 'lib/api/invitation'
import { useToast } from 'lib/toast'

import type { ErrorResponse } from 'types/errorResponse'

export const useGetInviter = () => {
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('invitation_token')
  const { errorToast } = useToast()
  const [inviterName, setInviterName] = useState('')
  const [inviterAvatar, setInviterAvatar] = useState({ data: '', name: '' })
  const [isInviterLoaded, setIsInviterLoaded] = useState(false)

  const handleGetInviter = async () => {
    if (invitationToken) {
      try {
        const res = await getInviter(invitationToken)
        if (res?.status === 200) {
          setInviterName(res.data.name)
          setInviterAvatar(res.data.avatar)
          setIsInviterLoaded(true)
        }
      } catch (err) {
        if (axios.isAxiosError(err) && (err.response?.data as ErrorResponse).message) {
          errorToast((err.response?.data as ErrorResponse).message)
        } else {
          errorToast('エラーが発生しました')
        }
        history.push('/welcome')
      }
    }
  }

  return { handleGetInviter, inviterName, inviterAvatar, isInviterLoaded }
}
