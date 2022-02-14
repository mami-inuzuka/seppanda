import { useContext, useEffect, useState, VFC } from 'react'

import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { UserIcon } from 'components/atoms/icon/UserIcon'
import { AuthContext } from 'context/AuthContext'

export const Setting: VFC = () => {
  const { currentUser } = useContext(AuthContext)
  const [inputName, setInputName] = useState<string>('')
  const [inputEmail, setInputEmail] = useState<string>('')

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

    <PrimaryButton>保存する</PrimaryButton>
  </>
)
