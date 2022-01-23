/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { VFC } from 'react'
import { useLocation } from 'react-router-dom'
import client from '../../lib/api/client'

type LocationState = {
  token: string
}

export const Paring: VFC = (props) => {
  const location = useLocation<LocationState>()
  return (
    <>
      <h1>ペアリング</h1>
      <p>下記のURLを共有してください</p>
      <p>{`http://localhost:3000/signup?token=${location.state.token}`}</p>
    </>
  )
}
