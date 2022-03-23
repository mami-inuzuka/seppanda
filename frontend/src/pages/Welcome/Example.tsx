import { VFC } from 'react'

import { Box, Heading, Image, Text } from '@chakra-ui/react'

import dot from 'assets/images/dot.svg'
import figure1 from 'assets/images/figure-1.png'
import figure2 from 'assets/images/figure-2.png'

export const Example: VFC = () => (
  <Box as="section">
    <Box className="section-heading">
      <Heading as="h2">例えば...</Heading>
    </Box>
    <Text>とあるカップルがお出かけをし、こんなお金の支払いが発生したとします。</Text>
    <Box mx={-8} mt={8} mb={10}>
      <Image src={figure1} />
    </Box>

    <Text>
      これらを全て2人で割り勘する場合、<b>最終的にどちらがどちらに何円渡すことになるのでしょうか？</b>
    </Text>
    <Image src={dot} m="0 auto" mt={8} mb={10} />
    <Text>この計算って意外と面倒ですよね......</Text>
    <Text fontSize="18px !important" fontWeight="bold" my={12}>
      でも、seppandaを使えば一旦支払った金額をメモしておくだけで貸し借りの状況をいつでも確認することができます
    </Text>
    <Box mx={-8} mt={14} mb={20}>
      <Image src={figure2} />
    </Box>
  </Box>
)
