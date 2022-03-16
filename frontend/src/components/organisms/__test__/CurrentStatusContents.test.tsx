import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { CurrentStatusContents } from 'components/organisms/CurrentStatusContents'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('CurrentStatusContents', () => {
  it('display guidance text when isTeamCapacityReached is false', () => {
    renderWithChakraProvider(
      <CurrentStatusContents isDebt refundAmount={1000} teamId={1} isTeamCapacityReached={false} />
    )
    expect(screen.getByTestId('current-status-contents')).toBeInTheDocument()
    expect(screen.getByTestId('current-status-contents')).toHaveTextContent('おあいての登録が完了すると表示されます')
  })

  it('display refund amount and settlement button when isTeamCapacityReached is true', () => {
    renderWithChakraProvider(<CurrentStatusContents isDebt refundAmount={1000} teamId={1} isTeamCapacityReached />)
    expect(screen.getByTestId('current-status-contents')).toBeInTheDocument()
    expect(screen.getByTestId('card-text')).toBeInTheDocument()
    expect(screen.getByTestId('refund-amount')).toBeInTheDocument()
    expect(screen.getByTestId('current-status-contents-settlement-button')).toBeInTheDocument()
  })
})
