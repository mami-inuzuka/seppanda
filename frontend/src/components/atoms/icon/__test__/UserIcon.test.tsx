import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { UserIcon } from 'components/atoms/icon/UserIcon'
import { renderWithChakraProvider } from 'tests/chakra/themeProvider'

import type { User } from 'types/user'

const IMAGE_URL = 'https://placekitten.com/200/300'

describe('SecondaryButton', () => {
  it('can display correctrly', () => {
    const user: User = {
      id: 1,
      name: 'テスト',
      uid: '1',
      teamId: 1,
      createdAt: '',
      updatedAt: '',
      color: 'blue',
      isDebt: true,
      avatar: {
        data: IMAGE_URL,
        dataSmall: IMAGE_URL,
        name: 'test-image.png',
      },
    }
    renderWithChakraProvider(<UserIcon user={user} size="lg" />)
    expect(screen.getByTestId('user-icon')).toHaveAttribute('src', IMAGE_URL)
  })
})
