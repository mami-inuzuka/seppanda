import { VFC } from 'react'

import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'

import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { UserIcon } from 'components/atoms/icon/UserIcon'

export const Setting: VFC = () => (
  <>
    <Flex>
      <UserIcon src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      <SecondaryButton>画像を選択</SecondaryButton>
    </Flex>
    <FormControl>
      <FormLabel htmlFor="email">メールアドレス</FormLabel>
      <Input id="email" type="email" value="taro@example.com" size="lg" />
      <FormLabel htmlFor="name">名前</FormLabel>
      <Input id="name" value="taro" size="lg" />
    </FormControl>

    <PrimaryButton>保存する</PrimaryButton>
  </>
)
