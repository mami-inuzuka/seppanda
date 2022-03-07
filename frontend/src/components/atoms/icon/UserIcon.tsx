import { memo, VFC } from 'react'

import { Image } from '@chakra-ui/react'

import type { User } from 'types/user'

type Props = {
  user: User | null
  size: string
}

export const UserIcon: VFC<Props> = memo((props) => {
  const { user, size } = props

  return (
    <Image
      src={user?.avatar.data}
      alt={user?.avatar.name}
      boxSize={size}
      borderRadius="full"
      border="2px"
      borderColor={`brand.${user?.color}`}
      objectFit="cover"
    />
  )
})
