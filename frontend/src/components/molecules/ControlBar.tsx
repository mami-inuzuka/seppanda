import { VFC } from 'react'

import { Flex } from '@chakra-ui/react'

import { BarButton } from 'components/atoms/button/BarButton'
import { CloseButton } from 'components/atoms/button/CloseButton'

type Props = {
  onClickClose: () => void
  onClickBarButton: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | (() => void)
  disabled: boolean
}

export const ControlBar: VFC<Props> = (props) => {
  const { onClickClose, onClickBarButton, disabled = false } = props
  return (
    <Flex h="64px">
      <CloseButton onClick={onClickClose} />
      <BarButton onClickButton={onClickBarButton} disabled={disabled}>
        登録する
      </BarButton>
    </Flex>
  )
}
