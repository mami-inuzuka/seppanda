import { VFC } from 'react'

import { Flex, Image, Text } from '@chakra-ui/react'

import logomark from 'assets/images/logomark.svg'

export const NoPaymentList: VFC = () => (
  <Flex
    direction="column"
    justify="center"
    align="center"
    borderTopColor="gray.50"
    borderTopWidth="1px"
    h="100%"
    pt={12}
  >
    <Text fontSize="sm" align="center" mb={4} color="gray.200">
      支払い情報はまだありません
    </Text>
    <Image src={logomark} w="60px" opacity="0.1" />
  </Flex>
)
