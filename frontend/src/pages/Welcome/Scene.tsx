import { VFC } from 'react'

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

import footprint from 'assets/images/footprint.svg'
import heart from 'assets/images/heart.svg'
import home from 'assets/images/home.svg'

export const Scene: VFC = () => (
  <Box as="section">
    <Box className="section-heading">
      <Text as="span">SCENE</Text>
      <Heading as="h2">おすすめの利用シーン</Heading>
    </Box>
    <Flex bg="gray.100" alignItems="center" p={6} mb={4}>
      <Image src={heart} w="24px" h="24px" mr={4} />
      <Text as="span" fontWeight="bold" mb={0}>
        日々のデートや旅行での割り勘
      </Text>
    </Flex>

    <Flex bg="gray.100" alignItems="center" p={6} mb={6}>
      <Image src={home} w="24px" h="24px" mr={4} />
      <Text as="span" fontWeight="bold" mb={0}>
        同棲に必要な生活費の割り勘
      </Text>
    </Flex>

    <Text>
      支払い周りは基本割り勘にしたいけど、共通のお財布や共通の口座を持つのはハードルが高いというカップルにおすすめです
    </Text>

    <Image src={footprint} w="20px" h="20px" m="0 auto" my={20} />
  </Box>
)
