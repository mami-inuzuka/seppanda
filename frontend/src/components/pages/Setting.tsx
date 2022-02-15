import { useContext, useEffect, useState, VFC } from 'react'

import { Box, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { UserIcon } from 'components/atoms/icon/UserIcon'
import { AuthContext } from 'context/AuthContext'
import { updateUser } from 'lib/api/auth'
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

    const params: UpdateUserParams = {
      name: inputName,
      email: inputEmail,
      avatar: inputAvatar,
    }

    try {
      const res = await updateUser(params)
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
    <Box p={6}>
      <Flex>
        <UserIcon src={inputAvatar.data} alt={inputAvatar.name} />
        <Input type="file" name="avatar" accept="image/png, image/jpeg" onChange={handleImageSelect} />
        <SecondaryButton>画像を選択</SecondaryButton>
      </Flex>
      <FormControl>
        <FormLabel htmlFor="name">名前</FormLabel>
        <Input value={inputName} onChange={(event) => setInputName(event.target.value)} id="name" size="lg" />
        <FormLabel htmlFor="email">メールアドレス</FormLabel>
        <Input
          value={inputEmail}
          onChange={(event) => setInputEmail(event.target.value)}
          id="email"
          type="email"
          size="lg"
        />
        <PrimaryButton onClickButton={handleUpdateUser} disabled={false}>
          保存する
        </PrimaryButton>
      </FormControl>
    </Box>
  )
}
