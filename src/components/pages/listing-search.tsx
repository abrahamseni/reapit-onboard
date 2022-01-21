import { cx } from '@linaria/core'
import {
  elWFull,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrapFull,
  SnackProvider,
  Subtitle,
  Title,
} from '@reapit/elements'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { header, headerTitle, searchBox, subtitle } from './__styles__/styles'

interface Props {}

const Calendar: React.FC<Props> = () => {
  const [address, setAddress] = React.useState('')
  const history = useHistory()

  const searchListings = (event) => {
    event.preventDefault()
    history.push(`/listing/${address}`)
  }

  return (
    <SnackProvider>
      <FlexContainer isFlexColumn className={cx(elWFull)}>
        <Title className={headerTitle} hasCenteredText>
          AppointIt
        </Title>
        <FlexContainer className={header} isFlexAlignCenter isFlexColumn>
          <Subtitle className={subtitle}>Your future starts here</Subtitle>
          <div className={`el-flex el-p6 el-border-radius el-box-shadow ${searchBox}`}>
            <form onSubmit={searchListings}>
              <FormLayout>
                <InputWrapFull>
                  <InputGroup
                    type="search"
                    placeholder="Enter an address or city"
                    onChange={(event) => setAddress(event.target.value)}
                    className="el-flex1 el-mr3"
                  />
                </InputWrapFull>
              </FormLayout>
            </form>
          </div>
        </FlexContainer>
      </FlexContainer>
    </SnackProvider>
  )
}

export default Calendar
