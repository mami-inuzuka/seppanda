import { VFC } from 'react'
import { useLocation } from 'react-router-dom'

type LocationState = {
  token: string
}

export const Invitation: VFC = () => {
  const location = useLocation<LocationState>()
  return (
    <>
      <h1>招待</h1>
      <p>下記のURLを共有してください</p>
      <p>{`${window.location.protocol}//${window.location.host}/signup?token=${location.state.token}`}</p>
    </>
  )
}