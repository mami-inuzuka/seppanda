import { memo, useContext, VFC } from 'react'

import { AspectRatio, Box, Center, Text, useDisclosure } from '@chakra-ui/react'

import cardLabel from 'assets/images/card-label.svg'
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import { CardText } from 'components/molcules/CardText'
import { RefundAmount } from 'components/molcules/RefundAmount'
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
        <AspectRatio ratio={311 / 166}>
          <Box
            py={6}
            borderRadius="lg"
            flexDirection="column"
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
            <CardText />
            <RefundAmount />
            {teamStatus.refundAmount !== 0 && (
              <Box textAlign="center">
                <SecondaryButton size="sm" isFullWidth={false} onClick={onOpenSettleModal}>
                  精算する
                </SecondaryButton>
              </Box>
            )}
          </Box>
        </AspectRatio>
      </Box>
    </>
  )
})
