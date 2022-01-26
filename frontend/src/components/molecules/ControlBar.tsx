import { VFC } from 'react'

import { Flex } from '@chakra-ui/react'

import { BarButton } from '../atoms/button/BarButton'
import { CloseButton } from '../atoms/button/CloseButton'

export const ControlBar: VFC = () => (
  <Flex h="64px">
    <CloseButton />
    <BarButton>登録する</BarButton>
  </Flex>
)
