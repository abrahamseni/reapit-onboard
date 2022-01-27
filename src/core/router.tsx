import { createBrowserHistory } from 'history'
import * as React from 'react'
import { Redirect, Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { Routes } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'

export const history = createBrowserHistory()

export const catchChunkError = (
  fn: Function,
  retriesLeft = 3,
  interval = 500,
): Promise<{ default: React.ComponentType<any> }> => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: Error) => {
        // Ignore chunk cache error and retry to fetch, if cannot reload browser
        console.info(error)
        setTimeout(() => {
          if (retriesLeft === 1) {
            window.location.reload()
            return
          }
          catchChunkError(fn, retriesLeft - 1, interval).then(resolve, reject)
        }, interval)
      })
  })
}

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/pages/login-page')))
const HomePage = React.lazy(() => catchChunkError(() => import('../components/pages/home-page')))
const ExamplesPage = React.lazy(() => catchChunkError(() => import('../components/pages/examples-page')))
const DataPage = React.lazy(() => catchChunkError(() => import('../components/pages/data-page')))
const ListingSearch = React.lazy(() => catchChunkError(() => import('../components/pages/listing-search')))
const Listing = React.lazy(() => catchChunkError(() => import('../components/pages/listings')))
const Bookmark = React.lazy(() => catchChunkError(() => import('../components/pages/bookmark')))
const DetailListing = React.lazy(() => catchChunkError(() => import('../components/pages/listing')))
const Dashboard = React.lazy(() => catchChunkError(() => import('../components/pages/dashboard')))
const UserProfile = React.lazy(() => catchChunkError(() => import('../components/pages/user-profile')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper>
          <Switch>
            <Route path={Routes.HOME} exact component={HomePage} />

            <Route path={Routes.FORM} exact component={ExamplesPage} />
            <Route path={Routes.TABLE} exact component={ExamplesPage} />
            <Route path={Routes.LIST} exact component={ExamplesPage} />

            <Route path={Routes.DATA} exact component={DataPage} />
            <Route path={Routes.LISTING_SEARCH} exact component={ListingSearch} />
            <Route path={Routes.LISTING} exact component={Listing} />
            <Route path={Routes.DETAIL_LISTING} exact component={DetailListing} />
            <Route path={Routes.BOOKMARK} exact component={Bookmark} />

            <Route path={Routes.DASHBOARD} exact component={Dashboard} />
            <Route path={Routes.AGENTS} exact component={Dashboard} />
            <Route path={Routes.MESSAGES} exact component={Dashboard} />
            <Route path={Routes.SETTING} exact component={Dashboard} />
            <Route path={Routes.INVOICES} exact component={Dashboard} />
            <Route path={Routes.RESIDENTS} exact component={Dashboard} />

            <Route path={Routes.USER_PROFILE} exact component={UserProfile} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
