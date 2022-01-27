import { BodyText, Button, FlexContainer, Loader, SmallText, Subtitle } from '@reapit/elements'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { useHistory } from 'react-router'
import { Routes } from '../../../constants/routes'
import { useGetNegotiatorByOffice } from '../../../platform-api/negotiator-api'
import { navigate } from '../../../utils/navigation'
import { AgentAvatar, AgentAvatarContainer, AgentCard, AgentCardBody, AgentContainer } from '../__styles__/styles'

const avatarSrc = [
  'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1596075780750-81249df16d19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
]

const Agents = () => {
  const history = useHistory()
  const agents = useGetNegotiatorByOffice({ id: 'MKT' })

  const randomSrc = () => {
    const randomIndex = Math.floor(Math.random() * avatarSrc.length)
    return avatarSrc[randomIndex]
  }

  return (
    <div>
      <Subtitle>Agents</Subtitle>
      <AgentContainer>
        {agents.status === 'loading' ? (
          <Loader label="loading" />
        ) : agents.status === 'error' ? (
          <p>Error fetching agents</p>
        ) : (
          agents.data?._embedded?.map((agent: NegotiatorModel) => {
            return (
              <AgentCard key={agent.id}>
                <AgentAvatarContainer>
                  <AgentAvatar src={randomSrc()} alt={agent.name} />
                </AgentAvatarContainer>
                <AgentCardBody>
                  <BodyText hasNoMargin>{agent.name}</BodyText>
                  <SmallText hasGreyText hasNoMargin>
                    {agent.jobTitle ?? 'Sales Negotiator'}
                  </SmallText>
                  <SmallText hasGreyText hasNoMargin>
                    {agent.email ?? agent.name + '@reapit.com'}
                  </SmallText>
                  <SmallText hasGreyText hasNoMargin>
                    {agent.mobilePhone ?? '0074005678'}
                  </SmallText>
                </AgentCardBody>
                <FlexContainer isFlexJustifyCenter isFlexAlignCenter>
                  <Button intent="secondary" chevronRight onClick={navigate(history, Routes.MESSAGES)}>
                    Send message
                  </Button>
                </FlexContainer>
              </AgentCard>
            )
          })
        )}
      </AgentContainer>
    </div>
  )
}

export default Agents
