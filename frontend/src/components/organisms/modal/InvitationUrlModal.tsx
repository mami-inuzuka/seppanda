import { memo, VFC } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { CopyIcon } from '@chakra-ui/icons'
import { Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay, Text, Box, Flex } from '@chakra-ui/react'

import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { useToast } from 'lib/toast'

type Props = {
  isOpen: boolean
  onClose: () => void
  size: string
  invitationToken: string
}

export const InvitationUrlModal: VFC<Props> = memo((props) => {
  const { successToast } = useToast()
  const { isOpen, onClose, size, invitationToken } = props
  const invitationUrl = `${window.location.protocol}//${window.location.host}/welcome?invitation_token=${invitationToken}&openExternalBrowser=1`

  const onClickClose = () => {
    onClose()
    localStorage.setItem('invitationUrlClosed', 'true')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent m={6} py={14} px={6}>
        <ModalHeader align="center" mb={4}>
          一緒に使う相手を
          <br />
          招待しましょう
        </ModalHeader>
        <ModalBody p={0}>
          <Box mb={12}>
            <Text align="center" fontSize="sm" mb={6}>
              アカウントの設定が完了しました！アプリを一緒に使いたいおあいてに下記の招待URLを共有してください
            </Text>
            <Flex bg="gray.100" py={5} px={6} align="center">
              <Text flex="1" fontSize="sm" wordBreak="break-all">
                {invitationUrl}
              </Text>
              <CopyToClipboard text={invitationUrl}>
                <Flex
                  w={10}
                  align="center"
                  justify="flex-end"
                  onClick={() => {
                    successToast('コピーしました')
                  }}
                >
                  <CopyIcon w={6} h={6} />
                </Flex>
              </CopyToClipboard>
            </Flex>
          </Box>
          <SecondaryButton onClick={onClickClose} size="xl" isFullWidth>
            とじる
          </SecondaryButton>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
