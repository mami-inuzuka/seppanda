import { VFC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Heading, Image, Text } from '@chakra-ui/react'

import logomark from 'assets/images/logomark.svg'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'

export const NotFound: VFC = () => {
  const navigation = useNavigate()

  const handleVisitHome = () => {
    navigation('/home')
  }

  return (
    <HeaderOnlyLogoLayout>
      <Box p={6}>
        <Box my={8}>
          <Image src={logomark} w="60px" margin="0 auto" mb={6} />
          <Heading size="lg" textAlign="center" my={4}>
            ページが見つかりません
          </Heading>
        </Box>
        <Text fontSize="sm" align="center" mb={10}>
          アクセスしようとしたページは削除、変更されたか現在利用できない可能性があります。
          <br />
          URLにタイプミスがないかご確認ください。
        </Text>
        <SecondaryButton onClick={handleVisitHome} size="xl" isFullWidth>
          メインページに戻る
        </SecondaryButton>
      </Box>
    </HeaderOnlyLogoLayout>
  )
}
