import { extendTheme } from '@chakra-ui/react'

import { Button } from 'theme/components/Button'
import { FormLabel } from 'theme/components/FormLabel'
import { Input } from 'theme/components/Input'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'black',
        w: '100%',
        minHeight: '100vh',
        bg: 'gray.50',
      },
    },
  },
  colors: {
    brand: {
      primary: '#6BB349',
      orange: '#EDA83F',
      blue: '#59B6D4',
    },
    black: '#35384D',
    gray: {
      50: '#F9FBFC',
      100: '#F4F7FA',
      200: '#EBEFF5',
      300: '#D4D9E2',
      400: '#B6BBC5',
      500: '#8F94A0',
      600: '#687189',
      700: '#485273',
      800: '#2D375C',
      900: '#1B234C',
    },
    green: {
      50: '#F7FDE8',
      100: '#EFFBD2',
      200: '#DCF8A7',
      300: '#BEEB78',
      400: '#9DD854',
      500: '#72BE24',
      600: '#58A31A',
      700: '#428812',
      800: '#2E6E0B',
      900: '#205B06',
    },
    red: {
      100: '#FCE4D7',
      200: '#FAC4B1',
      300: '#F09A87',
      400: '#E27267',
      500: '#D03939',
      600: '#B22935',
      700: '#951C31',
      800: '#78122C',
      900: '#630A29',
    },
    orange: {
      100: '#FEF5D3',
      200: '#FDE9A8',
      300: '#F9D77B',
      400: '#F3C55A',
      500: '#ECA926',
      600: '#CA891B',
      700: '#A96C13',
      800: '#88510C',
      900: '#713E07',
    },
    blue: {
      100: '#D9FDFA',
      200: '#B4FBFB',
      300: '#8DECF4',
      400: '#6ED7EA',
      500: '#41BADC',
      550: '#38A6CD',
      600: '#2F93BD',
      700: '#20709E',
      800: '#14507F',
      900: '#0C3A69',
    },
  },
  components: {
    Input,
    FormLabel,
    Button,
  },
})
