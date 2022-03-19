import { VFC } from 'react'

import { Box } from '@chakra-ui/react'

import { About } from 'pages/Welcome/About'
import { Example } from 'pages/Welcome/Example'
import { Scene } from 'pages/Welcome/Scene'

export const WelcomeContents: VFC = () => (
  <Box
    sx={{
      p: {},
      h2: {
        textAlign: 'center',
        fontSize: '2xl',
        lineHeight: 1,
      },
      section: {
        mb: 16,
      },
      '.section-heading': {
        textAlign: 'center',
        mb: 8,
      },
      '.section-heading span': {
        fontSize: 'sm',
        display: 'block',
        mb: 3,
        color: 'green.500',
        fontWeight: 'normal',
        letterSpacing: '0.1em',
      },
      'section p': {
        textAlign: 'center',
        mb: '6',
        lineHeight: '180%',
        fontSize: '15px',
      },
    }}
  >
    <About />
    <Example />
    <Scene />
  </Box>
)
