import { memo, VFC } from 'react'

import { Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay, Text, Box } from '@chakra-ui/react'

import { SecondaryButton } from 'components/atoms/button/SecondaryButton'

type Props = {
  isOpen: boolean
  onClose: () => void
  size: string
}

export const BrowserCheckModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, size } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent m={6} py={14} px={6}>
        <ModalHeader align="center" mb={4}>
          外部ブラウザで
          <br />
          開いてください
        </ModalHeader>
        <ModalBody p={0}>
          <Box mb={12}>
            <Text align="center" fontSize="sm" mb={6}>
              LINEやInstagram、Messangerなどのアプリ内ブラウザでは正しく動作しない場合があります。お手数ですが外部ブラウザで開き直してください。
            </Text>
          </Box>
          <SecondaryButton
            onClick={() => {
              onClose()
            }}
            size="xl"
            isFullWidth
          >
            とじる
          </SecondaryButton>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
