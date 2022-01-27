import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  elWFull,
  FlexContainer,
  Loader,
  SmallText,
  StatusIndicator,
  Subtitle,
} from '@reapit/elements'
import { ApplicantModel } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { useHistory } from 'react-router'
import { Routes } from '../../../constants/routes'
import { useGetApplicantByOffice } from '../../../platform-api/applicant-api'
import { navigate } from '../../../utils/navigation'
import { ApplicantCard, ApplicantContacts, Container } from '../__styles__/styles'

const Residents = () => {
  const applicants = useGetApplicantByOffice({ id: 'MKT' })
  const history = useHistory()

  return (
    <div>
      <Subtitle>Tennants</Subtitle>
      <Container>
        {applicants.status === 'loading' ? (
          <Loader label="loading" />
        ) : applicants.status === 'error' ? (
          <p>Error fetching agents</p>
        ) : (
          applicants.data?._embedded?.map((applicant: ApplicantModel) => {
            return (
              <ApplicantCard key={applicant.id}>
                <ApplicantContacts>
                  <BodyText>Contacts:</BodyText>
                  {applicant.related?.map((related) => {
                    return (
                      <div key={related.id}>
                        <BodyText hasNoMargin>
                          <StatusIndicator intent={applicant.active ? 'success' : undefined} />
                          {related.name}
                        </BodyText>
                        <SmallText hasNoMargin hasGreyText>
                          {related.dateOfBirth}
                        </SmallText>
                      </div>
                    )
                  })}
                </ApplicantContacts>
                <FlexContainer isFlexJustifyEvenly className={cx(elWFull)}>
                  <div>
                    <BodyText>Last Call: {applicant.lastCall}</BodyText>
                    <SmallText hasNoMargin hasGreyText>
                      Price Range: {applicant.buying?.priceFrom} - {applicant.buying?.priceTo}
                    </SmallText>
                    <SmallText hasNoMargin hasGreyText>
                      Notes: {applicant.notes}
                    </SmallText>
                  </div>
                  <div>
                    <BodyText>Interest</BodyText>
                    <SmallText hasGreyText>{applicant.marketingMode}</SmallText>
                  </div>
                  <FlexContainer isFlexAlignCenter>
                    <Button intent="secondary" chevronRight onClick={navigate(history, Routes.MESSAGES)}>
                      Send message
                    </Button>
                  </FlexContainer>
                </FlexContainer>
              </ApplicantCard>
            )
          })
        )}
      </Container>
    </div>
  )
}

export default Residents
