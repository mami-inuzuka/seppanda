import { VFC } from 'react'

import { Flex } from '@chakra-ui/react'

import { BarButton } from '../atoms/button/BarButton'
import { CloseButton } from '../atoms/button/CloseButton'

type Props = {
  onClickClose: () => void
}

export const ControlBar: VFC<Props> = (props) => {
  const { onClickClose } = props
  return (
    <Flex h="64px">
      <CloseButton onClick={onClickClose} />
      <BarButton>登録する</BarButton>
    </Flex>
  )
}
