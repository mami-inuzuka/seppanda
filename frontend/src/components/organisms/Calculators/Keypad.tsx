import { FC, ReactNode } from 'react'

import { Grid } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const Keypad: FC<Props> = (props) => {
  const { children } = props
  return (
    <Grid templateColumns="repeat(3, 1fr)" bg="gray.50" h="100%">
      {children}
    </Grid>
  )
}
