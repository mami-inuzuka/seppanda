import { VFC } from 'react'

import { Alert } from '@chakra-ui/react'

export const BasicAlert: VFC = () => (
  <Alert status="success" variant="subtle" justifyContent="center" fontSize="sm" p={1}>
    現在貸し借りはありません
  </Alert>
)
