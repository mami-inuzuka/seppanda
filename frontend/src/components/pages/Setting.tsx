import { useContext, useEffect, useState, VFC } from 'react'

import { Box, Flex, FormControl, FormLabel, Grid, Image, Input } from '@chakra-ui/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { HeaderWithTitleLayout } from 'components/templates/HeaderWithTitleLayout'
import { AuthContext } from 'context/AuthContext'
import { updateUser } from 'lib/api/auth'
import { auth } from 'lib/firebase'
import { useToast } from 'lib/toast'
import { UpdateUserParams } from 'types/updateUserParams'

export const Setting: VFC = () => {
  const { currentUser } = useContext(AuthContext)
  const [inputName, setInputName] = useState<string>('')
  const [inputEmail, setInputEmail] = useState<string>('')
  const [inputAvatar, setInputAvatar] = useState({ data: '', name: '' })
  const { errorToast, successToast } = useToast()

  const handleUpdateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const idToken = await auth.currentUser?.getIdToken(true)
    const params: UpdateUserParams = {
      name: inputName,
      email: inputEmail,
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
      setInputEmail(currentUser.email)
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
              <Flex align="center">
                <Image
                  src={inputAvatar.data}
                  alt={inputAvatar.name}
                  boxSize="64px"
                  borderRadius="full"
                  border="2px"
                  borderColor={`brand.${currentUser?.color}`}
                  mr={4}
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
              <FormLabel htmlFor="name">名前</FormLabel>
              <Input value={inputName} onChange={(event) => setInputName(event.target.value)} id="name" size="lg" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Input
                value={inputEmail}
                onChange={(event) => setInputEmail(event.target.value)}
                id="email"
                type="email"
                size="lg"
              />
            </FormControl>
            <PrimaryButton onClickButton={handleUpdateUser} disabled={false}>
              保存する
            </PrimaryButton>
          </Grid>
        </form>
      </Box>
    </HeaderWithTitleLayout>
  )
}
