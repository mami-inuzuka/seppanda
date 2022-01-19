import { useContext, useState, VFC, memo } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Box, Button, Input } from '@chakra-ui/react'

/* eslint import/no-cycle: 0 */
import { AuthContext } from '../../App'
import { signUp } from '../../lib/api/auth'
import { SignUpParams } from '../../types/signUpParams'

export const SignUp: VFC = memo(() => {
  const history = useHistory()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
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
        setCurrentUser(res.data.data)
        history.push('/')
        console.log('Signed in successfully!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form noValidate autoComplete="off">
      <Box>
        <Input value={name} onChange={(event) => setName(event.target.value)} />
        <Input value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input value={password} onChange={(event) => setPassword(event.target.value)} />

        <Input value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} />
        <Button
          type="submit"
          disabled={!!(!name || !email || !password || !passwordConfirmation)}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </form>
  )
})
