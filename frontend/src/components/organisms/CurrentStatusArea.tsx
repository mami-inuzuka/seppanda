import { memo, useContext, VFC } from 'react'

import { Box, Center, Flex, Text, useDisclosure } from '@chakra-ui/react'

import cardLabel from 'assets/images/card-label.svg'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { BasicModal } from 'components/organisms/BasicModal'
import { AuthContext } from 'context/AuthContext'
import { PaymentContext } from 'context/PaymentContext'

export const CurrentStatusArea: VFC = memo(() => {
  const { teamStatus } = useContext(PaymentContext)
  const { currentUser } = useContext(AuthContext)
  const { isOpen: isOpenSettleModal, onOpen: onOpenSettleModal, onClose: onCloseSettleModal } = useDisclosure()

  return (
    <>
      <BasicModal isOpen={isOpenSettleModal} onClose={onCloseSettleModal} size="xl" />
      <Box px={8} mb={8}>
        <Box
          py={6}
          borderRadius="lg"
          bg="white"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.08)"
          position="relative"
          _before={{
            content: `""`,
            width: '13px',
            position: 'absolute',
            left: '2',
            top: '0',
            bottom: '0',
            margin: 'auto',
            height: '100%',
            backgroundImage: `url(${cardLabel})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          _after={{
            content: `""`,
            width: '13px',
            position: 'absolute',
            right: '2',
            top: '0',
            bottom: '0',
            margin: 'auto',
            height: '100%',
            backgroundImage: `url(${cardLabel})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: 'rotate(180deg)',
          }}
        >
          {teamStatus.refundAmount === 0 && '現在貸し借りはありません'}
          {teamStatus.refundAmount !== 0 && currentUser?.id === teamStatus.largestPaymentUser?.id && (
            <Flex fontSize="sm" fontWeight="bold" justify="center" align="center" mb={2}>
              あいてに
              <Text bg="rgba(107, 178, 73, 0.1)" color="green.500" py={0.5} px={1.5} mx={1}>
                返してもらう
              </Text>
              金額
            </Flex>
          )}
          {teamStatus.refundAmount !== 0 && currentUser?.id !== teamStatus.largestPaymentUser?.id && (
            <Flex fontSize="sm" fontWeight="bold" justify="center" align="center" mb={2}>
              あいてに
              <Text bg="rgba(208, 57, 57, 0.1)" color="red.500" py={0.5} px={1.5} mx={1}>
                返す
              </Text>
              金額
            </Flex>
          )}
          <Center mb={4}>
            <Text fontSize="5xl" lineHeight="1" fontWeight="bold" _after={{ content: `"円"`, fontSize: '3xl' }}>
              {teamStatus.refundAmount !== 0 && teamStatus.refundAmount.toLocaleString()}
            </Text>
          </Center>
          <Box textAlign="center">
            <SecondaryButton size="sm" isFullWidth={false} onClick={onOpenSettleModal}>
              精算する
            </SecondaryButton>
          </Box>
        </Box>
      </Box>
    </>
  )
})
