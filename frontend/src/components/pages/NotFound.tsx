import { VFC, memo } from 'react'
import { useHistory } from 'react-router-dom'

import { Flex, Image, Text } from '@chakra-ui/react'

import logomark from 'assets/images/logomark.svg'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'

export const NotFound: VFC = memo(() => {
  const history = useHistory()

  const handleVisitHome = () => {
    history.push('/')
  }

  return (
    <Flex h="100vh" direction="column" justify="center" align="center" pt={12}>
      <Text fontSize="sm" align="center" mb={4}>
        ページが見つかりません
      </Text>
      <SecondaryButton onClick={handleVisitHome} size="xl" isFullWidth>
        TOPに戻る
      </SecondaryButton>
      <Image src={logomark} w="60px" />
    </Flex>
  )
})
