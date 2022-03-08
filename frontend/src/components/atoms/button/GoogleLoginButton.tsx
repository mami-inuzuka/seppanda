import { memo, VFC } from 'react'

import { Button, Flex, Image, Text } from '@chakra-ui/react'

import googleIcon from 'assets/images/google_icon.svg'

type Props = {
  disabled: boolean
  onClick: () => void
}

export const GoogleLoginButton: VFC<Props> = memo((props) => {
  const { disabled, onClick } = props
  return (
    <Button
      onClick={onClick}
      bg="#4285F4"
      color="white"
      size="xl"
      mb={6}
      isFullWidth
      disabled={disabled}
      padding="4px"
      justifyContent="normal"
      _hover={{ bg: '#4285F4' }}
      _active={{ bg: '#3367D6' }}
    >
      <Flex bg="white" h="56px" w="56px" align="center" justify="center" borderRadius={2}>
        <Image w="40%" src={googleIcon} />
      </Flex>
      <Text align="center" w="100%" flex="1">
        Googleでログインする
      </Text>
    </Button>
  )
})
