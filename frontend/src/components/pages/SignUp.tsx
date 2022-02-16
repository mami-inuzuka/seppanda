import { useContext, useState, VFC, memo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { AuthContext } from 'context/AuthContext'
import { signUp } from 'lib/api/auth'
import { useToast } from 'lib/toast'

import type { SignUpErrorResponse } from 'types/SignUpErrorResponse'
import type { SignUpParams } from 'types/signUpParams'

export const SignUp: VFC = memo(() => {
  // 関連issue: [react-router-dom] - Export History type #50526 https://github.com/DefinitelyTyped/DefinitelyTyped/issues/50526
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const history = useHistory()
  const { setIsSignedIn } = useContext(AuthContext)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const { search } = useLocation()

  const query = new URLSearchParams(search)
  const token = query.get('token')
  const { errorToast } = useToast()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name,
      email,
      password,
      passwordConfirmation,
    }

    try {
      const res = await signUp(params, token)

      if (res.status === 200) {
        console.log(res)
        // アカウント作成と同時にログイン（後程メール認証を挟む）
        Cookies.set('_access_token', res.headers['access-token'], { secure: true })
        Cookies.set('_client', res.headers.client, { secure: true })
        Cookies.set('_uid', res.headers.uid, { secure: true })
        setIsSignedIn(true)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        if (res.data.isTeamCapacityReached) {
          history.push('/')
        } else {
          history.push({
            pathname: '/invitation',
            state: { token: res.data.invitationToken },
          })
        }
        console.log('Signed in successfully!')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<SignUpErrorResponse>
        if (serverError.response?.data.errors.fullMessages) {
          serverError.response?.data.errors.fullMessages.map((message) => errorToast(message))
        } else {
          errorToast('登録に失敗しました')
        }
      } else {
        errorToast('登録に失敗しました')
      }
    }
  }

  return (
    <HeaderOnlyLogoLayout>
      <Box p={6}>
        <Heading size="lg" textAlign="center" my={10}>
          新規登録
        </Heading>
        <form noValidate autoComplete="off">
          <FormControl>
            <FormLabel htmlFor="name">名前</FormLabel>
            <Input value={name} placeholder="例）たろう" id="name" onChange={(event) => setName(event.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <Input
              value={email}
              placeholder="例）taro@example.com"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <Input
              value={password}
              placeholder="英数字6文字以上"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password_confirmation">パスワード確認</FormLabel>
            <Input
              value={passwordConfirmation}
              placeholder="英数字6文字以上"
              id="password_confirmation"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              type="password"
            />
          </FormControl>
          <PrimaryButton
            disabled={!!(!name || !email || !password || !passwordConfirmation)}
            onClickButton={handleSubmit}
          >
            利用規約に同意して登録する
          </PrimaryButton>
        </form>
      </Box>
    </HeaderOnlyLogoLayout>
  )
})
