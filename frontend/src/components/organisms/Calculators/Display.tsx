import { FC } from 'react'

import { Flex } from '@chakra-ui/react'

type Props = {
  data: number
}

export const Display: FC<Props> = (props) => {
  const { data } = props

  return (
    <Flex
      alignItems="end"
      justifyContent="flex-end"
      fontSize="64px"
      fontWeight="bold"
      textAlign="right"
      p={8}
      height="45%"
    >
      {data}
    </Flex>
  )
}
