import { Box, Flex } from '@chakra-ui/react'
import { VFC } from 'react'
import { CalculatorButton } from './Button'
import { Display } from './Display'
import { Keypad } from './Keypad'

export const Calculator: VFC = () => (
  <Flex flexDirection="column" h="100%">
    <Display data={2800} />
    <Box flex="1">
      <Keypad>
        <CalculatorButton label="7" value="7" />
        <CalculatorButton label="8" value="8" />
        <CalculatorButton label="9" value="9" />
        <CalculatorButton label="÷" value="/" />

        <CalculatorButton label="4" value="4" />
        <CalculatorButton label="5" value="5" />
        <CalculatorButton label="6" value="6" />
        <CalculatorButton label="×" value="*" />

        <CalculatorButton label="1" value="1" />
        <CalculatorButton label="2" value="2" />
        <CalculatorButton label="3" value="3" />
        <CalculatorButton label="-" value="-" />

        <CalculatorButton label="." value="." />
        <CalculatorButton label="0" value="0" />
        <CalculatorButton label="←" value="backspace" />
        <CalculatorButton label="+" value="+" />
      </Keypad>
    </Box>
  </Flex>
)
