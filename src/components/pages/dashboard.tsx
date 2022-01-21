import {
  BodyText,
  elMb9,
  FlexContainer,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Title,
} from '@reapit/elements'
import * as React from 'react'
import { GiGreenhouse } from 'react-icons/gi'
import { MdApartment, MdLandscape, MdOutlineDeveloperBoard, MdOutlineHouse } from 'react-icons/md'
import { Route, useHistory, useLocation } from 'react-router'
import { Routes } from '../../constants/routes'
import { useGetPropertiesBy } from '../../platform-api/property-api'
import { navigate } from '../../utils/navigation'
import Agents from '../ui/dashboard/agents'
import Invoices from '../ui/dashboard/invoices'
import Messages from '../ui/dashboard/messages'
import Residents from '../ui/dashboard/residents'
import SettingDashboard from '../ui/dashboard/setting-dashboard'
import { cardContainer, PropertyIcon } from './__styles__/styles'

const Dashboard = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const house = useGetPropertiesBy({
    pageNumber: 1,
    type: 'house',
    officeId: 'MKT',
  })
  const flatApartment = useGetPropertiesBy({
    pageNumber: 1,
    type: 'flatApartment',
    officeId: 'MKT',
  })
  const land = useGetPropertiesBy({
    pageNumber: 1,
    type: 'land',
    officeId: 'MKT',
  })
  const cottage = useGetPropertiesBy({
    pageNumber: 1,
    type: 'cottage',
    officeId: 'MKT',
  })
  const developmentPlot = useGetPropertiesBy({
    pageNumber: 1,
    type: 'developmentPlot',
    officeId: 'MKT',
  })

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
        <Subtitle>Number One Property Owner in UK</Subtitle>

        <FlexContainer className={cardContainer}>
          <PropertyIcon className="blue">
            <BodyText>House</BodyText>
            <MdOutlineHouse size={48} /> {house.data?.totalCount}
          </PropertyIcon>
          <PropertyIcon>
            <BodyText>Flat Apartment</BodyText>
            <MdApartment size={48} /> {flatApartment.data?.totalCount}
          </PropertyIcon>
          <PropertyIcon className="green">
            <BodyText>Cottage</BodyText>
            <GiGreenhouse size={48} /> {cottage.data?.totalCount}
          </PropertyIcon>
          <PropertyIcon className="yellow">
            <BodyText>Land</BodyText>
            <MdLandscape size={48} /> {land.data?.totalCount}
          </PropertyIcon>
          <PropertyIcon className="red">
            <BodyText>Development Plot</BodyText>
            <MdOutlineDeveloperBoard size={48} />
            {developmentPlot.data?.totalCount}
          </PropertyIcon>
        </FlexContainer>

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
