import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { CardText } from 'components/molecules/CardText'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('CardText', () => {
  it('can display correctly when refundAmount is 0', () => {
    renderWithChakraProvider(<CardText isDebt={false} refundAmount={0} />)
    expect(screen.getByTestId('card-text')).toHaveTextContent('現在貸し借りはありません')
  })

  it('can display correctly when isDebt is true', () => {
    renderWithChakraProvider(<CardText isDebt refundAmount={1000} />)
    expect(screen.getByTestId('card-text')).toHaveTextContent('あいてに返す金額')
  })

  it('can display correctly when isDebt is false', () => {
    renderWithChakraProvider(<CardText isDebt={false} refundAmount={1000} />)
    expect(screen.getByTestId('card-text')).toHaveTextContent('あいてに返してもらう金額')
  })
})
