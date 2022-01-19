import { useState, useContext, VFC, memo } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import { Box, Button, Input } from '@chakra-ui/react'

/* eslint import/no-cycle: 0 */
import { AuthContext } from '../../App'

import { signIn } from '../../lib/api/auth'
import { SignInParams } from '../../types/signInParams'

export const SignIn: VFC = memo(() => {
  const history = useHistory()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // デフォルトの動作をキャンセル
    e.preventDefault()

    const params: SignInParams = {
      email,
      password,
    }

    try {
      const res = await signIn(params)
      console.log(res)
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers.client)
        Cookies.set('_uid', res.headers.uid)
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        history.push('/')
        console.log('Signed in successfully!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>サインイン</h1>
      <form noValidate autoComplete="off">
        <Box>
          <Input value={email} placeholder="メールアドレス" onChange={(event) => setEmail(event.target.value)} />
          <Input value={password} placeholder="パスワード" onChange={(event) => setPassword(event.target.value)} />
          <Button
            type="submit"
            disabled={!!(!email || !password)} // 空欄があった場合はボタンを押せないように
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  )
})
