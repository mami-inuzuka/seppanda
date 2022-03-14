import { VFC } from 'react'

import { Flex, Image, Text } from '@chakra-ui/react'

import logomark from 'assets/images/logomark-gray-300.svg'

export const NoPaymentMessage: VFC = () => (
  <Flex direction="column" justify="center" align="center" pt={12}>
    <Text fontSize="sm" align="center" mb={4} color="gray.300">
      支払い情報はまだありません
    </Text>
    <Image src={logomark} w="60px" opacity="0.5" />
  </Flex>
)
