import { cx } from '@linaria/core'
import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  elBorderBlue,
  elBoxShadow,
  elFlex1,
  elMAuto,
  elMr4,
  elMt4,
  elP2,
  elP4,
  elP8,
  elW8,
  elWFull,
  FlexContainer,
  Loader,
  PageContainer,
  Subtitle,
  Tabs,
  Title,
} from '@reapit/elements'
import { motion } from 'framer-motion'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { BiBath, BiBuildingHouse } from 'react-icons/bi'
import { BsCalendar3, BsThermometerHalf } from 'react-icons/bs'
import { IoBedOutline, IoSnowOutline } from 'react-icons/io5'
import { RiParkingBoxLine } from 'react-icons/ri'
import { useHistory, useParams } from 'react-router-dom'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useGetPropertyById } from '../../platform-api/property-api'
import Carousel from '../ui/carousel'
import { container, divContainer, List, StyledImage, TabContent, tabListing, UList } from './__styles__/styles'

type ParamsProps = {
  id: string
}

enum TabName {
  overview = 'overview',
  features = 'features',
  floorPlan = 'floorPlan',
  nearby = 'nearby',
}

const handleChangeTab = (setTab: Dispatch<SetStateAction<TabName>>) => (event: ChangeEvent<HTMLInputElement>) => {
  setTab(event.target.value as TabName)
}

const Listing = () => {
  const { id } = useParams<ParamsProps>()
  const history = useHistory()
  const [tab, setTab] = React.useState<TabName>(TabName.overview)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { data: property, status } = useGetPropertyById(connectSession, { id })

  return (
    <PageContainer className={cx(elP8, container)}>
      <Button onClick={() => history.goBack()} chevronLeft intent="secondary">
        Go Back
      </Button>
      {status === 'loading' ? (
        <Loader label="Loading" />
      ) : status === 'error' ? (
        <h4>Something went wrong, please try again later.</h4>
      ) : (
        <FlexContainer isFlexColumn isFlexJustifyCenter className={cx(elMt4, elWFull)}>
          <div>
            <Title>
              {property?.address?.line1}, {property?.address?.line2}
            </Title>
            <FlexContainer>
              <Subtitle className={cx(elBorderBlue, elP2, elMr4)}>{property?.marketingMode}</Subtitle>
              <Subtitle className={cx(elBorderBlue, elP2)}>{property?.type || 'House'}</Subtitle>
            </FlexContainer>
          </div>
          <Carousel />
          <Tabs
            onChange={handleChangeTab(setTab)}
            name="single-property-detail"
            options={[
              {
                id: 'tab-0',
                value: TabName.overview,
                text: 'Overview',
                isChecked: tab === TabName.overview,
              },
              {
                id: 'tab-1',
                value: TabName.features,
                text: 'Features',
                isChecked: tab === TabName.features,
              },
              {
                id: 'tab-2',
                value: TabName.floorPlan,
                text: 'Floor Plan',
                isChecked: tab === TabName.floorPlan,
              },
              {
                id: 'tab-3',
                value: TabName.nearby,
                text: 'Nearby',
                isChecked: tab === TabName.nearby,
              },
            ]}
            className={cx(elMAuto, elMt4, tabListing)}
          />
          <TabContent className={cx(elFlex1, elP4, elW8, elMAuto, elBoxShadow)}>
            {tab === TabName.overview && (
              <motion.div
                animate={{ y: [20, 0] }}
                transition={{ ease: 'easeOut', duration: 0.5 }}
                className={divContainer}
              >
                <Title>Overview</Title>
                <BodyText hasGreyText>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of
                  type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                  the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                  with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                  publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </BodyText>
              </motion.div>
            )}
            {tab === TabName.features && (
              <motion.div
                animate={{ y: [20, 0] }}
                transition={{ ease: 'easeOut', duration: 0.5 }}
                className={divContainer}
              >
                <Title>Features</Title>
                <div>
                  <UList style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <List>
                      <BiBuildingHouse color="#888" /> {property?.type ?? 'House'}
                    </List>
                    <List>
                      <IoBedOutline color="#888" /> {property?.bedrooms ?? 0}
                    </List>
                    <List>
                      <BiBath color="#888" /> {property?.bathrooms ?? 0}
                    </List>
                    <List>
                      <BsCalendar3 color="#888" /> {property?.boardStatus ?? ''}
                    </List>
                    <List>
                      <BsThermometerHalf color="#888" /> Central
                    </List>
                    <List>
                      <IoSnowOutline color="#888" /> Central Air
                    </List>
                    <List>
                      <RiParkingBoxLine color="#888" /> {property?.parking?.join(' ') ?? ''}
                    </List>
                  </UList>
                </div>
              </motion.div>
            )}
            {tab === TabName.floorPlan && (
              <motion.div
                animate={{ y: [20, 0] }}
                transition={{ ease: 'easeOut', duration: 0.5 }}
                className={divContainer}
              >
                <Title>Floor Plan</Title>
                <FlexContainer style={{ height: '200px' }}>
                  <StyledImage
                    src="https://media.istockphoto.com/photos/modern-flat-first-floor-loft-type-render-picture-id1211447522"
                    alt="floor plan"
                  />
                </FlexContainer>
              </motion.div>
            )}
            {tab === TabName.nearby && (
              <motion.div
                animate={{ y: [20, 0] }}
                transition={{ ease: 'easeOut', duration: 0.5 }}
                className={divContainer}
              >
                <Title>Nearby</Title>
                <div>map here</div>
              </motion.div>
            )}
          </TabContent>
        </FlexContainer>
      )}
    </PageContainer>
  )
}

export default Listing
