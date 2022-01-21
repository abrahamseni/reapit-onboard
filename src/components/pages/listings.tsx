import { cx } from '@linaria/core'
import {
  elBoxShadow,
  elMb8,
  elP6,
  FlexContainer,
  FormLayout,
  InputWrap,
  Label,
  Loader,
  Pagination,
  Select,
  Snack,
  Title,
} from '@reapit/elements'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPropertiesBy } from '../../platform-api/property-api'
import ListingCard from '../ui/listingCard'
// import { createTableRows } from '../../utils/helpers'
import { Space } from '../utils/space'
import { cardContainer } from './__styles__/styles'

// interface Props {}

type ListingParams = {
  location: string
}

const Listing: React.FC = () => {
  const { location: address } = useParams<ListingParams>()

  const [pageNumber, setPageNumber] = React.useState(1)
  const [sortBy, setSortBy] = React.useState('price')
  const [type, setType] = React.useState('')

  const propertiesResult = useGetPropertiesBy({
    pageNumber,
    address,
    sortBy,
    type,
  })
  const { status, data, error } = propertiesResult

  const renderCards = () => {
    if (status === 'loading') {
      return <Loader label="In progress..." />
    } else if (status === 'error') {
      return (
        <Snack intent="danger" icon="errorSolidSystem">
          Error getting Properties.
          <p>{error?.message}</p>
        </Snack>
      )
    } else {
      return (
        <div className="el-flex el-flex-column">
          <FlexContainer isFlexWrap className={cardContainer}>
            {data &&
              data._embedded?.map((d: PropertyModel) => {
                return <ListingCard key={d.id} listingData={d} />
              })}
          </FlexContainer>
          <Space height="8px" />
          <Pagination callback={setPageNumber} currentPage={pageNumber} numberPages={data?.totalPageCount || 1} />
        </div>
      )
    }
  }

  return (
    <div>
      <Title hasBoldText>Listings in {address} area.</Title>
      <form className={cx(elMb8, elBoxShadow, elP6)}>
        <FormLayout>
          <InputWrap>
            <Label>Sort By</Label>
            <Select onChange={(event) => setSortBy(event.target.value)}>
              <option value="price">Price Ascending</option>
              <option value="-price">Price Descending</option>
            </Select>
          </InputWrap>
          <InputWrap>
            <Label>Type</Label>
            <Select onChange={(event) => setType(event.target.value)}>
              <option value="" disabled defaultValue="">
                Choose property type
              </option>
              <option value="house">house</option>
              <option value="bungalow">bungalow</option>
              <option value="flatApartment">flatApartment</option>
              <option value="maisonette">maisonette</option>
              <option value="land">land</option>
              <option value="farm">farm</option>
              <option value="cottage">cottage</option>
              <option value="studio">studio</option>
              <option value="townhouse">townhouse</option>
              <option value="developmentPlot">developmentPlot</option>
            </Select>
          </InputWrap>
        </FormLayout>
      </form>
      {renderCards()}
    </div>
  )
}

export default Listing
