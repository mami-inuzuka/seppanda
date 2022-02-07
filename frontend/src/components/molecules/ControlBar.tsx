import { VFC } from 'react'

import { Flex } from '@chakra-ui/react'

import { BarButton } from 'components/atoms/button/BarButton'
import { CloseButton } from 'components/atoms/button/CloseButton'

type Props = {
  onClickClose: () => void
  onClickBarButton: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | (() => void)
}

export const ControlBar: VFC<Props> = (props) => {
  const { onClickClose, onClickBarButton } = props
  return (
    <Flex h="64px">
      <CloseButton onClick={onClickClose} />
      <BarButton onClickButton={onClickBarButton}>登録する</BarButton>
    </Flex>
  )
}
