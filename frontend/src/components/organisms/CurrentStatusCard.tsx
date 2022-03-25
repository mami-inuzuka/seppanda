import { memo, VFC } from 'react'

import { AspectRatio, Box } from '@chakra-ui/react'

import cardLabel from 'assets/images/card-label.svg'
import { SpinnerIcon } from 'components/atoms/spinner/Spinner'
import { CurrentStatusContents } from 'components/organisms/CurrentStatusContents'

type Props = {
  isLoaded: boolean
  isDebt: boolean
  refundAmount: number
  teamId: number
  isTeamCapacityReached: boolean
}

export const CurrentStatusCard: VFC<Props> = memo((props) => {
  const { isLoaded, isDebt, refundAmount, teamId, isTeamCapacityReached } = props

  return (
    <Box px={8} mb={8} data-testid="current-status-card">
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
          {isLoaded ? (
            <CurrentStatusContents
              isDebt={isDebt}
              refundAmount={refundAmount}
              teamId={teamId}
              isTeamCapacityReached={isTeamCapacityReached}
            />
          ) : (
            <SpinnerIcon />
          )}
        </Box>
      </AspectRatio>
    </Box>
  )
})
