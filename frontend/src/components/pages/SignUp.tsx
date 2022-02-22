import { useState, VFC, memo, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, FormControl, FormLabel, Grid, Heading, Input } from '@chakra-ui/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { AuthContext } from 'context/AuthContext'
import { signUp } from 'lib/api/auth'
import { auth } from 'lib/firebase'

export const SignUp: VFC = memo(() => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const { setIsSignedIn, setCurrentUser, currentUser } = useContext(AuthContext)
  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const invitationToken = query.get('token')

  const handleCreateUser = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const data = { token }
    const res = await signUp(data, invitationToken)
    if (res.status === 200) {
      // eslint-disable-next-line no-debugger
      debugger
      setCurrentUser(res.data?.user)
      console.log(`currentUser:${currentUser}`)
      setIsSignedIn(true)
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // eslint-disable-next-line no-debugger
    debugger
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(handleCreateUser)
      .then(() => {
        history.push({
          pathname: '/invitation',
          state: { email },
        })
      })
  }

  return (
    <HeaderOnlyLogoLayout>
      <Box p={6}>
        <Heading size="lg" textAlign="center" my={10}>
          新規登録
        </Heading>
        <form noValidate autoComplete="off">
          <Grid gap={6}>
            <FormControl>
              <FormLabel htmlFor="name">名前</FormLabel>
              <Input
                value={name}
                placeholder="例）たろう"
                id="name"
                onChange={(event) => setName(event.target.value)}
              />
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
          </Grid>
        </form>
      </Box>
    </HeaderOnlyLogoLayout>
  )
})
