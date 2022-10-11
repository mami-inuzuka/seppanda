import { memo, VFC } from 'react'

import { Image } from '@chakra-ui/react'

import type { SimpleUser, User } from 'types/user'

type Props = {
  user: User | SimpleUser
  size: string
}

export const UserIcon: VFC<Props> = memo((props) => {
  const { user, size } = props

  return (
    <Image
      src={user.avatar.dataSmall}
      alt="user-icon"
      boxSize={size}
      borderRadius="full"
      border="2px"
      borderColor={`${user.color}.500`}
      objectFit="cover"
      data-testid="user-icon"
    />
  )
})
