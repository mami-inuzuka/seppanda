import { extendTheme } from '@chakra-ui/react'

import { FormLabel } from 'theme/components/FormLabel'
import { Input } from 'theme/components/Input'

export const theme = extendTheme({
  colors: {
    brand: {
      primary: '#6BB349',
    },
    gray: {
      50: '#F2F2F2',
      100: '#DBDBDB',
      200: '#C4C4C4',
      300: '#ADADAD',
      400: '#969696',
      500: '#808080',
      600: '#666666',
      700: '#4D4D4D',
      800: '#333333',
      900: '#1A1A1A',
    },
    green: {
      50: '#F0F8ED',
      100: '#D6EACC',
      200: '#BCDDAC',
      300: '#A1D08B',
      400: '#87C26A',
      500: '#6CB54A',
      600: '#57913B',
      700: '#416D2C',
      800: '#2B481E',
      900: '#16240F',
    },
    red: {
      50: '#FAEAEA',
      100: '#F2C5C5',
      200: '#EA9F9F',
      300: '#E17A7A',
      400: '#D95454',
      500: '#D02F2F',
      600: '#A72525',
      700: '#7D1C1C',
      800: '#531313',
      900: '#2A0909',
    },
    orange: {
      50: '#FDF4E8',
      100: '#F9E1BE',
      200: '#F5CE94',
      300: '#F1BB6A',
      400: '#EDA83F',
      500: '#EA9515',
      600: '#BB7711',
      700: '#8C590D',
      800: '#5D3C09',
      900: '#2F1E04',
    },
    cyan: {
      50: '#EBF6FA',
      100: '#C6E6F0',
      200: '#A2D6E7',
      300: '#7EC6DD',
      400: '#59B6D4',
      500: '#35A6CA',
      600: '#2A85A2',
      700: '#206479',
      800: '#154351',
      900: '#0B2128',
    },
  },
  components: {
    Input,
    FormLabel,
  },
})