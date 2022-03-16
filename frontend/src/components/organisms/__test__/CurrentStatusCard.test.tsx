import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { CurrentStatusCard } from 'components/organisms/CurrentStatusCard'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('CurrentStatusCard', () => {
  it('display spinner when isLoaded is false', () => {
    renderWithChakraProvider(
      <CurrentStatusCard isLoaded={false} isDebt refundAmount={1000} teamId={1} isTeamCapacityReached />
    )
    expect(screen.getByTestId('current-status-card')).toBeInTheDocument()
    expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('current-status-contents')).toBeNull()
  })

  it('display CurrentStatusContents when isLoaded is true', () => {
    renderWithChakraProvider(<CurrentStatusCard isLoaded isDebt refundAmount={1000} teamId={1} isTeamCapacityReached />)
    expect(screen.getByTestId('current-status-card')).toBeInTheDocument()
    expect(screen.getByTestId('current-status-contents')).toBeInTheDocument()
    expect(screen.queryByTestId('spinner-icon')).toBeNull()
  })
})
