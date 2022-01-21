import { Card, CardListItemProps } from '@reapit/elements'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useGetOfficesById } from '../../platform-api/office-api'
import { formatCurrency } from '../../utils/formats'

type ListingCardProps = {
  listingData: PropertyModel
}

const ListingCard: React.FC<ListingCardProps> = ({ listingData }) => {
  const history = useHistory()
  const mainCardSubHeading = `${listingData.bedrooms}`
  // const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  // const { data: negotiatorData } = useGetNegotiatorById(connectSession, {
  //   id: listingData.negotiatorId ?? '',
  // })
  const offices = useGetOfficesById({ id: listingData.officeIds ?? [] })

  const brokerOffices: CardListItemProps[] = []
  if (offices) {
    offices.forEach((office) => {
      if (office.status === 'success') {
        brokerOffices.push({
          listCardItemHeading: office.data?.name ?? '',
          listCardItemSubHeading: office.data?.address?.line1 ?? '',
          listCardItemIcon: 'houseInfographic',
          onClick: () => console.log('Clicking'),
        })
      }
    })
    brokerOffices.push({
      listCardItemHeading: listingData.address?.line1 ?? '',
      listCardItemSubHeading: 'View more',
      listCardItemIcon: 'homeSystem',
      onClick: () => history.push(`detail/${listingData.id ?? ''}`),
    })
  }

  return (
    <Card
      hasMainCard
      hasListCard
      mainCardHeading={formatCurrency(listingData.currency ?? 'GBP', listingData.selling?.price ?? 0)}
      mainCardSubHeading={mainCardSubHeading}
      mainCardSubHeadingAdditional={listingData.description}
      mainCardBody={listingData.longDescription}
      mainCardImgUrl="https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
      listCardSubHeading="BROKERAGE OFFICE"
      listCardItems={brokerOffices}
      className="el-flex-auto el-w3"
    />
  )
}

export default ListingCard
