import { useReapitConnect } from '@reapit/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import React, { FC } from 'react'
import { Routes } from '../../../constants/routes'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { history } from '../../../core/router'
import { navigate } from '../../../utils/navigation'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.HOME:
      return 1
    case Routes.DATA:
      return 2
    case Routes.TABLE:
    case Routes.LIST:
    case Routes.FORM:
      return 3
    case Routes.LISTING_SEARCH:
      return 4
    case Routes.DASHBOARD:
    case Routes.AGENTS:
    case Routes.MESSAGES:
    case Routes.INVOICES:
    case Routes.SETTING:
    case Routes.RESIDENTS:
      return 5
    default:
      return 0
  }
}

export const Nav: FC = () => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Home',
      iconId: 'defaultMenu',
      callback: navigate(history, Routes.HOME),
    },
    {
      itemIndex: 2,
      text: 'Data',
      iconId: 'dataMenu',
      callback: navigate(history, Routes.DATA),
    },
    {
      itemIndex: 3,
      text: 'UI',
      iconId: 'uiMenu',
      callback: navigate(history, Routes.TABLE),
      subItems: [
        {
          itemIndex: 1,
          callback: navigate(history, Routes.TABLE),
          text: 'Table',
        },
        {
          itemIndex: 2,
          callback: navigate(history, Routes.LIST),
          text: 'List',
        },
        {
          itemIndex: 3,
          callback: navigate(history, Routes.FORM),
          text: 'Form',
        },
      ],
    },
    {
      itemIndex: 4,
      // callback: () => (window.location.href = window.reapit.config.marketplaceUrl),
      callback: navigate(history, Routes.LISTING_SEARCH),
      iconId: 'appsMenu',
      text: 'Apps',
    },
    {
      itemIndex: 5,
      callback: navigate(history, Routes.DASHBOARD),
      iconId: 'devicesInfographic',
      text: 'Dashboard',
      subItems: [
        {
          itemIndex: 1,
          callback: navigate(history, Routes.AGENTS),
          text: 'Agents',
        },
        {
          itemIndex: 2,
          callback: navigate(history, Routes.RESIDENTS),
          text: 'Tennants',
        },
        {
          itemIndex: 3,
          callback: navigate(history, Routes.MESSAGES),
          text: 'Messages',
        },
        {
          itemIndex: 4,
          callback: navigate(history, Routes.INVOICES),
          text: 'Invoices',
        },
        {
          itemIndex: 5,
          callback: navigate(history, Routes.SETTING),
          text: 'Settings',
        },
      ],
    },
  ]

  if (!connectIsDesktop) {
    navOptions.push({
      itemIndex: 6,
      callback: connectLogoutRedirect,
      isSecondary: true,
      iconId: 'logoutMenu',
      text: 'Logout',
    })
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
