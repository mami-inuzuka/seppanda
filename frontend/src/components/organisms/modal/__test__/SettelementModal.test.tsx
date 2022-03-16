import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'

import { SettelementModal } from 'components/organisms/modal/SettlementModal'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('SettlementModal', () => {
  const onClose = jest.fn()
  const refundAmount = 1000

  it('can display itself', () => {
    renderWithChakraProvider(
      <SettelementModal teamId={1} refundAmount={refundAmount} isDebt isOpen onClose={onClose} size="xl" />
    )
    expect(screen.getByTestId('settlement-modal')).toBeInTheDocument()
    expect(screen.getByTestId('settlement-modal-header')).toHaveTextContent('精算')
    expect(screen.getByTestId('settlement-modal-body')).toHaveTextContent(refundAmount.toLocaleString())
  })

  it('can display correctly when isDebt is true', () => {
    renderWithChakraProvider(
      <SettelementModal teamId={1} refundAmount={refundAmount} isDebt isOpen onClose={onClose} size="xl" />
    )
    expect(screen.getByTestId('settlement-modal')).toBeInTheDocument()
    expect(screen.getByTestId('settlement-modal-body')).toHaveTextContent('お相手に下記の金額を返しましたか？')
  })

  it('can display correctly when isDebt is false', () => {
    renderWithChakraProvider(
      <SettelementModal teamId={1} refundAmount={refundAmount} isDebt={false} isOpen onClose={onClose} size="xl" />
    )
    expect(screen.getByTestId('settlement-modal')).toBeInTheDocument()
    expect(screen.getByTestId('settlement-modal-body')).toHaveTextContent('お相手に下記の金額を返してもらいましたか？')
  })

  it('can close modal', () => {
    renderWithChakraProvider(
      <SettelementModal teamId={1} refundAmount={refundAmount} isDebt isOpen onClose={onClose} size="xl" />
    )
    expect(screen.getByTestId('settlement-modal')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('settlement-modal-close-button'))
    expect(onClose).toHaveBeenCalled()
  })
})
