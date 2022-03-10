import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { getInviter } from 'lib/api/invitation'
import { useToast } from 'lib/toast'

import type { ErrorResponse } from 'types/errorResponse'

export const useGetInviter = () => {
  const navigate = useNavigate()
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
        setInviterName(res.data.name)
        setInviterAvatar(res.data.avatar)
        setIsInviterLoaded(true)
      } catch (err) {
        if (axios.isAxiosError(err) && (err.response?.data as ErrorResponse).message) {
          errorToast(
            (err.response?.data as ErrorResponse).message,
            '時間をおいて再度試すか、招待URLが正しいことを確認してください'
          )
        } else {
          errorToast('エラーが発生しました', '時間をおいてから再度お試しください')
        }
        navigate('/')
      }
    }
  }

  return { handleGetInviter, inviterName, inviterAvatar, isInviterLoaded }
}
