import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'

import { BrowserCautionModal } from 'components/organisms/modal/BrowserCautionModal'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('BrowserCautionModal', () => {
  it('can display itself', () => {
    const onClose = jest.fn()
    renderWithChakraProvider(<BrowserCautionModal isOpen onClose={onClose} size="xl" />)
    expect(screen.getByTestId('browser-caution-modal')).toBeInTheDocument()
  })

  it('can close modal', () => {
    const onClose = jest.fn()
    renderWithChakraProvider(<BrowserCautionModal isOpen onClose={onClose} size="xl" />)
    expect(screen.getByTestId('browser-caution-modal')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('browser-caution-modal-close-button'))
    expect(onClose).toHaveBeenCalled()
  })
})
