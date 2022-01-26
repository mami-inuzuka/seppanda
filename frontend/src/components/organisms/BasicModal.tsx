import { VFC } from 'react'

import { Modal, ModalHeader, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
  size: string
}

export const BasicModal: VFC<Props> = (props) => {
  const { isOpen, onClose, size } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>精算</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>taroに下記の金額を返しましたか？</p>
          <p>32,670</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
