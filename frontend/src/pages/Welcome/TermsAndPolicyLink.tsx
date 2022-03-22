import { VFC } from 'react'
import { Link } from 'react-router-dom'

import { Text } from '@chakra-ui/react'

export const TermsAndPolicyLick: VFC = () => (
  <Text fontSize="xs" align="center" color="gray.400" lineHeight="1.8">
    上記のボタンをクリックすることで、
    <Text as="span" textDecoration="underline">
      <Link to="/terms">利用規約</Link>
    </Text>
    および
    <Text as="span" textDecoration="underline">
      <Link to="/policy">プライバシーポリシー</Link>
    </Text>
    に同意するものとします。
  </Text>
)
