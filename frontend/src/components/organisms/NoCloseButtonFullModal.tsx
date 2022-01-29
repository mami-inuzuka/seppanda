import { FC } from 'react'

import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const NoCloseButtonFullModal: FC<Props> = (props) => {
  const { isOpen, onClose, children } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent borderRadius={0}>{children}</ModalContent>
    </Modal>
  )
}
