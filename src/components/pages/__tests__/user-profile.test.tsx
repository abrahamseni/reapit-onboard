import React from 'react'
import { renderWithClient } from '../../../utils/testUtils'
import UserProfile from '../user-profile'

describe('UserProfile', () => {
  it('should match a snapshot', () => {
    expect(renderWithClient(<UserProfile />)).toMatchSnapshot()
  })
})
