import { Alert } from '@chakra-ui/react'
import { VFC } from 'react'

export const BasicAlert: VFC = () => (
  <Alert status="success" variant="subtle" justifyContent="center" fontSize="sm" p={1}>
    現在貸し借りはありません
  </Alert>
)
