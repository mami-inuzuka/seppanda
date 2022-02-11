import { VFC } from 'react'

import { Alert } from '@chakra-ui/react'

export const DebtAlert: VFC = () => (
  <Alert status="error" variant="subtle" justifyContent="center" fontSize="sm" p={1}>
    現在あなたは借金中です
  </Alert>
)
