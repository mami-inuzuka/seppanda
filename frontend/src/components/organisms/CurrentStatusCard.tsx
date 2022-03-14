import { useContext, VFC } from 'react'

import { AspectRatio, Box } from '@chakra-ui/react'

import cardLabel from 'assets/images/card-label.svg'
import { CurrentStatusContents } from 'components/organisms/CurrentStatusContents'
import { SpinnerIcon } from 'components/organisms/spinner/Spinner'
import { PaymentContext } from 'context/PaymentContext'

export const CurrentStatusCard: VFC = () => {
  const { isTeamStatusLoaded } = useContext(PaymentContext)

  return (
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
          {isTeamStatusLoaded ? <CurrentStatusContents /> : <SpinnerIcon />}
        </Box>
      </AspectRatio>
    </Box>
  )
}
