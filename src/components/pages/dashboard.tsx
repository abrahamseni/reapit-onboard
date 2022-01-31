import { cx } from '@linaria/core'
import {
  elMb9,
  FlexContainer,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  SmallText,
  Subtitle,
  Title,
} from '@reapit/elements'
import * as React from 'react'
import { Route, useHistory, useLocation } from 'react-router'
import { Routes } from '../../constants/routes'
import { navigate } from '../../utils/navigation'
import Agents from '../ui/dashboard/agents'
import Home from '../ui/dashboard/home'
import Invoices from '../ui/dashboard/invoices'
import Messages from '../ui/dashboard/messages'
import Residents from '../ui/dashboard/residents'
import SettingDashboard from '../ui/dashboard/setting-dashboard'
import { Avatar, DashboardHeader, Notification, textXs, UserAvatarContainer, whiteText } from './__styles__/styles'

const Dashboard = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Marketplace</Title>
        <SecondaryNav className={elMb9}>
          <SecondaryNavItem onClick={navigate(history, Routes.DASHBOARD)} active={pathname === Routes.DASHBOARD}>
            Home
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.RESIDENTS)} active={pathname.includes(Routes.RESIDENTS)}>
            Tennants
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.AGENTS)} active={pathname.includes(Routes.AGENTS)}>
            Agents
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.MESSAGES)} active={pathname.includes(Routes.MESSAGES)}>
            Messages
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.INVOICES)} active={pathname.includes(Routes.INVOICES)}>
            Invoices
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.SETTING)} active={pathname.includes(Routes.SETTING)}>
            Settings
          </SecondaryNavItem>
        </SecondaryNav>
      </SecondaryNavContainer>
      <PageContainer>
        <DashboardHeader>
          <Subtitle>Nina Smith - Super Agent</Subtitle>
          <UserAvatarContainer>
            <Avatar
              src="https://images.unsplash.com/photo-1573600073955-f15b3b6caab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80"
              alt="avatar"
              onClick={navigate(history, '/user/123')}
            />
            <Notification onClick={navigate(history, Routes.MESSAGES)}>
              <SmallText hasNoMargin className={cx(whiteText, textXs)}>
                5
              </SmallText>
            </Notification>
          </UserAvatarContainer>
        </DashboardHeader>
        <Route path={Routes.DASHBOARD} component={Home} exact />
        <Route path={Routes.RESIDENTS} component={Residents} exact />
        <Route path={Routes.AGENTS} component={Agents} exact />
        <Route path={Routes.MESSAGES} component={Messages} exact />
        <Route path={Routes.INVOICES} component={Invoices} exact />
        <Route path={Routes.SETTING} component={SettingDashboard} exact />
      </PageContainer>
    </FlexContainer>
  )
}

export default Dashboard
