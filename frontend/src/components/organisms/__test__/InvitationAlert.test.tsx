import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { InvitationAlert } from 'components/organisms/InvitationAlert'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

describe('InvitationAlert', () => {
  const invitationToken = '1OgdF1NVz_qNbXWAJSYDog'
  const invitationUrl = `${window.location.protocol}//${window.location.host}/welcome?invitation_token=${invitationToken}&openExternalBrowser=1`

  it('can render correctly', () => {
    renderWithChakraProvider(<InvitationAlert invitationToken={invitationToken} />)
    expect(screen.getByTestId('invitation-alert')).toHaveTextContent(
      'お相手の登録がまだのようです下記のURLを共有して登録をしてもらおう'
    )
    expect(screen.getByTestId('invitation-alert-invitation-url')).toHaveTextContent(invitationUrl)
  })
})
