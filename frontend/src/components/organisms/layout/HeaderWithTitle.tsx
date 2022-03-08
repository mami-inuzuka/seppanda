import { memo, FC } from 'react'
import { Link } from 'react-router-dom'

import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const HeaderWithTitle: FC<Props> = memo((props) => {
  const { children } = props
  return (
    <Flex as="header" align="center" h="56px" borderBottom="1px" borderColor="gray.100">
      <Link to="/home">
        <Flex w="56px" h="56px" align="center" justify="center">
          <ChevronLeftIcon w="24px" h="24px" />
        </Flex>
      </Link>
      <Text fontSize="sm" fontWeight="bold">
        {children}
      </Text>
    </Flex>
  )
})
