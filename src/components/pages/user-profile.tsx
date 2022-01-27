import { cx } from '@linaria/core'
import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  elColGap4,
  elMb4,
  elMb6,
  elMxAuto,
  elP6,
  elP8,
  elRowGap1,
  elWFull,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrap,
  InputWrapFull,
  PageContainer,
  Subtitle,
  Title,
} from '@reapit/elements'
import * as React from 'react'
import { useHistory } from 'react-router'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useGetNegotiatorById } from '../../platform-api/negotiator-api'
import { UserContainer, UserForm, UserImage } from './__styles__/styles'

const UserProfile = () => {
  const { connectSession: session } = useReapitConnect(reapitConnectBrowserSession)
  const negotiator = useGetNegotiatorById(session, { id: 'ADV' })

  const history = useHistory()
  return (
    <PageContainer>
      <Button onClick={() => history.goBack()} chevronLeft intent="secondary">
        Go back
      </Button>
      <FlexContainer isFlexColumn className={cx(elP6, elWFull)}>
        <FlexContainer isFlexColumn className={cx(elP8)}>
          <Title>UserProfile</Title>
          <Subtitle>Profile Information</Subtitle>
          <UserContainer className={cx(elRowGap1, elP6)}>
            <FlexContainer className={cx(elColGap4, elWFull)} isFlexColumn>
              <div className={cx(elMb4, elMxAuto)}>
                <UserImage
                  src="https://images.unsplash.com/photo-1573600073955-f15b3b6caab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80"
                  alt="user"
                />
              </div>
              <BodyText hasGreyText hasNoMargin hasCenteredText>
                {negotiator.data?.jobTitle}
              </BodyText>
              <FlexContainer>
                <UserForm>
                  <FormLayout className={cx(elMb6, elP6)}>
                    <InputWrapFull>
                      <Subtitle hasNoMargin>Personal Details</Subtitle>
                    </InputWrapFull>
                    <InputWrap>
                      <InputGroup icon="homeSystem" label="Name" type="text" defaultValue={negotiator.data?.name} />
                    </InputWrap>
                    <InputWrap>
                      <InputGroup icon="emailSystem" label="Email" type="text" defaultValue={negotiator.data?.email} />
                    </InputWrap>
                    <InputWrap>
                      <InputGroup
                        icon="phoneSystem"
                        label="Mobile Phone"
                        type="number"
                        defaultValue={parseInt(negotiator.data?.mobilePhone?.replace(' ', '') ?? '555789', 10)}
                      />
                    </InputWrap>
                    <InputWrap>
                      <InputGroup
                        icon="phoneSystem"
                        label="Work Phone"
                        type="number"
                        defaultValue={parseInt(negotiator.data?.workPhone?.replace(' ', '') ?? '5556789', 10)}
                      />
                    </InputWrap>
                    <InputWrap>
                      <InputGroup type="checkbox" label="Active" defaultChecked={negotiator.data?.active} />
                    </InputWrap>
                  </FormLayout>
                  <Button intent="primary" disabled>
                    Save
                  </Button>
                </UserForm>
              </FlexContainer>
            </FlexContainer>
          </UserContainer>
        </FlexContainer>
      </FlexContainer>
    </PageContainer>
  )
}

export default UserProfile
