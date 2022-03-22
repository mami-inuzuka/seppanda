/* eslint-disable jsx-a11y/media-has-caption */
import { VFC } from 'react'

import { Box, Heading, Image, Text } from '@chakra-ui/react'

import logotype from 'assets/images/logotype-black.svg'
import homeVideo from 'assets/seppanda.mp4'

export const About: VFC = () => (
  <Box as="section">
    <Box className="section-heading">
      <Text as="span">ABOUT</Text>
      <Heading as="h2" display="flex" alignItems="center" justifyContent="center">
        <Image src={logotype} h="35px" mr="2px" />
        とは？
      </Heading>
    </Box>
    <Text>
      seppanda（せっぱんだ）は、
      <Text
        as="span"
        bg="rgba(114,190,36,0.1)"
        display="block"
        fontWeight="bold"
        color="green.600"
        align="center"
        p={2}
        my={4}
      >
        割り勘したいけど
        <br />
        どちらかが一旦支払っておく
      </Text>
      というシーンが日々発生する<b>カップルにおすすめの割り勘計算アプリ</b>です。
    </Text>
    <Text>
      一旦支払った側がその金額をメモしておくだけで最終的にどちらがいくらお金を渡せばいいのかを瞬時に確認することができます。
    </Text>
    <Box
      overflow="hidden"
      position="relative"
      maxW="170px"
      h="283px"
      m="0 auto"
      borderWidth="6px"
      borderColor="gray.200"
      borderRadius="6px"
      sx={{
        video: {
          position: 'absolute',
          zIndex: 0,
          top: '136px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
        },
      }}
    >
      <video webkit-playsinline playsInline muted autoPlay loop>
        <source src={homeVideo} type="video/mp4" />
      </video>
    </Box>
  </Box>
)
