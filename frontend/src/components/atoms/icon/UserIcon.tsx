import { Image } from '@chakra-ui/react'
import { VFC } from 'react'

type Props = {
  src: string
  alt: string
}

export const UserIcon: VFC<Props> = (props) => {
  const { src, alt } = props
  return <Image src={src} alt={alt} boxSize="64px" borderRadius="full" />
}
