import { render } from '@testing-library/react'
import * as React from 'react'
import Bookmark from '../bookmark'

describe('bookmark query component', () => {
  test('should successful query component', () => {
    const result = render(<Bookmark />)

    expect(result.findByText(/listing bookmark/i)).toBeInTheDocument
  })
})
