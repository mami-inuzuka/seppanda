import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'

import { InvitationUrlModal } from 'components/organisms/modal//InvitationUrlModal'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('InvitationUrlModal', () => {
  const invitationToken = '1OgdF1NVz_qNbXWAJSYDog'

  it('can render correctly', () => {
    const onClose = jest.fn()
    renderWithChakraProvider(
      <InvitationUrlModal isOpen onClose={onClose} size="xl" invitationToken={invitationToken} />
    )
    expect(screen.getByTestId('invitation-url-modal')).toBeInTheDocument()
    expect(screen.getByTestId('invitation-url-modal-header')).toHaveTextContent('一緒に使う相手を招待しましょう')
    expect(screen.getByTestId('invitation-url')).toHaveTextContent(invitationToken)
  })

  it('can close modal', () => {
    const onClose = jest.fn()
    renderWithChakraProvider(
      <InvitationUrlModal isOpen onClose={onClose} size="xl" invitationToken={invitationToken} />
    )
    expect(screen.getByTestId('invitation-url-modal')).toBeInTheDocument()
    expect(screen.getByTestId('invitation-url-modal-header')).toHaveTextContent('一緒に使う相手を招待しましょう')
    expect(screen.getByTestId('invitation-url-modal-close-button')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('invitation-url-modal-close-button'))
    expect(onClose).toHaveBeenCalled()
  })
})
