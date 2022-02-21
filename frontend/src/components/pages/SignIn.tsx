import { useState, useContext, VFC, memo } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, FormControl, FormLabel, Grid, Heading, Input } from '@chakra-ui/react'
import Cookies from 'js-cookie'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { AuthContext } from 'context/AuthContext'
import { signIn } from 'lib/api/auth'

import type { SignInParams } from 'types/signInParams'

export const SignIn: VFC = memo(() => {
  // 関連issue: [react-router-dom] - Export History type #50526 https://github.com/DefinitelyTyped/DefinitelyTyped/issues/50526
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        history.push('/')
        console.log('Signed in successfully!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <HeaderOnlyLogoLayout>
      <Box p={6}>
        <Heading size="lg" textAlign="center" my={10}>
          ログイン
        </Heading>
        <form noValidate autoComplete="off">
          <Grid gap={6}>
            <FormControl>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Input value={email} placeholder="メールアドレス" onChange={(event) => setEmail(event.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <Input
                value={password}
                placeholder="パスワード"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
              />
            </FormControl>
            <PrimaryButton
              disabled={!!(!email || !password)} // 空欄があった場合はボタンを押せないように
              onClickButton={handleSubmit}
            >
              ログイン
            </PrimaryButton>
          </Grid>
        </form>
      </Box>
    </HeaderOnlyLogoLayout>
  )
})
