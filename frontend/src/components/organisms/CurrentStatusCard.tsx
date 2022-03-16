import { memo, VFC } from 'react'

import { AspectRatio, Box } from '@chakra-ui/react'

import cardLabel from 'assets/images/card-label.svg'
import { CurrentStatusContents } from 'components/organisms/CurrentStatusContents'
import { SpinnerIcon } from 'components/organisms/spinner/Spinner'

type Props = {
  isLoaded: boolean
}

export const CurrentStatusCard: VFC<Props> = memo((props) => {
  const { isLoaded } = props

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
          {isLoaded ? <CurrentStatusContents /> : <SpinnerIcon />}
        </Box>
      </AspectRatio>
    </Box>
  )
})
