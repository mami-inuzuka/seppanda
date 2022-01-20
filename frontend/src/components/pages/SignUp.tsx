import { useContext, useState, VFC, memo } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Box, Button, Input } from '@chakra-ui/react'

import { signUp } from '../../lib/api/auth'
import { SignUpParams } from '../../types/signUpParams'
import { AuthContext } from '../../context/AuthContext'

export const SignUp: VFC = memo(() => {
  const history = useHistory()
  const { setIsSignedIn } = useContext(AuthContext)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name,
      email,
      password,
      passwordConfirmation,
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にログイン（後程メール認証を挟む）
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers.client)
        Cookies.set('_uid', res.headers.uid)
        setIsSignedIn(true)
        history.push('/')
        console.log('Signed in successfully!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>サインアップ</h1>
      <form noValidate autoComplete="off">
        <Box>
          <Input value={name} placeholder="名前" onChange={(event) => setName(event.target.value)} />
          <Input value={email} placeholder="メールアドレス" onChange={(event) => setEmail(event.target.value)} />
          <Input value={password} placeholder="パスワード" onChange={(event) => setPassword(event.target.value)} />
          <Input
            value={passwordConfirmation}
            placeholder="パスワード確認"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <Button
            type="submit"
            disabled={!!(!name || !email || !password || !passwordConfirmation)}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  )
})
