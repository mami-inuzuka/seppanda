import { useContext, useEffect, useState, VFC } from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Divider, Flex, FormControl, FormLabel, Grid, Image, Input } from '@chakra-ui/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { HeaderWithTitleLayout } from 'components/templates/HeaderWithTitleLayout'
import { AuthContext } from 'context/AuthContext'
import { updateUser } from 'lib/api/auth'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'
import { UpdateUserParams } from 'types/updateUserParams'

export const Setting: VFC = () => {
  const { currentUser } = useContext(AuthContext)
  const [inputName, setInputName] = useState<string>('')
  const [inputAvatar, setInputAvatar] = useState({ data: '', name: '' })
  const [processing, setProcessing] = useState<boolean>(false)
  const { errorToast, successToast } = useToast()
  const history = useHistory()

  const handleSignOut = async () => {
    await auth.signOut()
    history.push('/welcome')
    successToast('ログアウトしました')
  }

  const handleUpdateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProcessing(true)
    const idToken = await auth.currentUser?.getIdToken(true)
    const params: UpdateUserParams = {
      name: inputName,
      avatar: inputAvatar,
    }
    try {
      const res = await updateUser(params, idToken)
      if (res.status === 200) {
        successToast('ユーザー情報を更新しました')
      } else {
        errorToast('ユーザー情報の更新に失敗しました')
      }
    } catch {
      errorToast('ユーザー情報の更新に失敗しました')
    } finally {
      setProcessing(false)
    }
  }

  const handleImageSelect = (e: React.FormEvent) => {
    const reader = new FileReader()
    const { files } = e.target as HTMLInputElement
    if (files) {
      reader.onload = () => {
        setInputAvatar({
          data: reader.result as string,
          name: files[0] ? files[0].name : 'unknownfile',
        })
      }
      reader.readAsDataURL(files[0])
    }
  }

  useEffect(() => {
    if (currentUser) {
      setInputName(currentUser.name)
      setInputAvatar({ data: currentUser.avatar?.data, name: currentUser.avatar?.name })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HeaderWithTitleLayout title="アカウント設定">
      <Box p={6}>
        <form>
          <Grid gap={6}>
            <FormControl>
              <Flex align="center" direction="column">
                <Image
                  src={inputAvatar.data}
                  alt={inputAvatar.name}
                  boxSize="124px"
                  borderRadius="full"
                  border="4px"
                  borderColor={`brand.${currentUser?.color}`}
                  mb={4}
                />
                <FormLabel
                  bg="gray.50"
                  color="gray.900"
                  borderRadius="base"
                  h="32px"
                  border="1px solid rgba(46, 47, 46, 0.1)"
                  boxShadow="0px 1px 0px #D7D7D7"
                  pl={3}
                  pr={3}
                  m={0}
                >
                  <Input
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={handleImageSelect}
                    display="none"
                  />
                  <Flex h="100%" align="center" justify="center">
                    画像を選択
                  </Flex>
                </FormLabel>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">なまえ</FormLabel>
              <Input value={inputName} onChange={(event) => setInputName(event.target.value)} id="name" size="lg" />
            </FormControl>
            <PrimaryButton isLoading={processing} onClickButton={handleUpdateUser} disabled={processing}>
              保存する
            </PrimaryButton>
          </Grid>
        </form>
        <Divider my={10} />
        <Box textAlign="center">
          <SecondaryButton size="sm" onClick={handleSignOut} isFullWidth={false}>
            ログアウト
          </SecondaryButton>
        </Box>
      </Box>
    </HeaderWithTitleLayout>
  )
}
