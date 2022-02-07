import { useContext, VFC } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { CalculatorButton } from 'components/organisms/Calculator/Button'
import { Display } from 'components/organisms/Calculator/Display'
import { Keypad } from 'components/organisms/Calculator/Keypad'
import { PaymentContext } from 'context/PaymentContext'

export const Calculator: VFC = () => {
  const { inputNumber, setInputNumber } = useContext(PaymentContext)

  const handleNumberClick = (num: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputNumber(inputNumber + String(num))
  }

  const handleBackSpaceClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputNumber(inputNumber.slice(0, -1))
  }

  const display = Number(inputNumber)

  return (
    <Flex flexDirection="column" h="100%">
      <Display data={display} />
      <Box flex="1">
        <Keypad>
          <CalculatorButton label="7" value="7" onClick={handleNumberClick(7)} />
          <CalculatorButton label="8" value="8" onClick={handleNumberClick(8)} />
          <CalculatorButton label="9" value="9" onClick={handleNumberClick(9)} />

          <CalculatorButton label="4" value="4" onClick={handleNumberClick(4)} />
          <CalculatorButton label="5" value="5" onClick={handleNumberClick(5)} />
          <CalculatorButton label="6" value="6" onClick={handleNumberClick(6)} />

          <CalculatorButton label="1" value="1" onClick={handleNumberClick(1)} />
          <CalculatorButton label="2" value="2" onClick={handleNumberClick(2)} />
          <CalculatorButton label="3" value="3" onClick={handleNumberClick(3)} />

          <CalculatorButton label="0" value="0" onClick={handleNumberClick(0)} />
          <CalculatorButton label="←" value="←" onClick={handleBackSpaceClick} />
        </Keypad>
      </Box>
    </Flex>
  )
}
