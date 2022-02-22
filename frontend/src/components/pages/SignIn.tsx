import { useState, useContext, VFC, memo } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, FormControl, FormLabel, Grid, Heading, Input } from '@chakra-ui/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'
import { AuthContext } from 'context/AuthContext'
import { getCurrentUser } from 'lib/api/auth'
import { auth } from 'lib/firebase'

export const SignIn: VFC = memo(() => {
  // 関連issue: [react-router-dom] - Export History type #50526 https://github.com/DefinitelyTyped/DefinitelyTyped/issues/50526
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const history = useHistory()
  const { setCurrentUser, setIsLoaded } = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleGetCurrentUser = async () => {
    console.log('SIgnIn:handleGetCurrentUser')
    try {
      const idToken = await auth.currentUser?.getIdToken(true)
      const uid = auth.currentUser?.uid
      if (uid) {
        const res = await getCurrentUser({ uid }, idToken)
        if (res?.status === 200) {
          setCurrentUser(res.data.user)
          setIsLoaded(true)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // デフォルトの動作をキャンセル
    e.preventDefault()
    // eslint-disable-next-line no-debugger
    debugger
    await auth.signInWithEmailAndPassword(email, password).then(handleGetCurrentUser)
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
