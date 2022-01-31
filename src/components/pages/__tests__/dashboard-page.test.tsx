import { render } from '@testing-library/react'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Router, Switch } from 'react-router-dom'
import Dashboard from '../dashboard'

const history = createBrowserHistory()

describe('Dashboard', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <Router history={history}>
          <Switch>
            <Dashboard />
          </Switch>
        </Router>,
      ),
    ).toMatchSnapshot()
  })
})
