import { useContext, useEffect, useState, VFC } from 'react'

import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'

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
  const { errorToast, successToast } = useToast()

  const handleUpdateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: UpdateUserParams = {
      name: inputName,
      email: inputEmail,
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

  useEffect(() => {
    if (currentUser) {
      setInputName(currentUser.name)
      setInputEmail(currentUser.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Flex>
        <UserIcon src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
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
      </FormControl>

      <PrimaryButton onClickButton={handleUpdateUser}>保存する</PrimaryButton>
    </>
  )
}
