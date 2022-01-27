import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMt12,
  elWFull,
  FlexContainer,
  FormLayout,
  InputWrapFull,
  Subtitle,
  Table,
  TextArea,
} from '@reapit/elements'
import React from 'react'
import { FormMessage, MessageContainer, ReceivedMessage, SendMessage } from '../__styles__/styles'

const Messages = () => {
  return (
    <>
      <Subtitle>Messages</Subtitle>
      <FormMessage>
        <FormLayout>
          <InputWrapFull>
            <TextArea type="text" />
          </InputWrapFull>
          <Button intent="success">Send</Button>
        </FormLayout>
      </FormMessage>
      <FlexContainer className={cx(elMt12)}>
        <Table
          numberColumns={5}
          className={cx(elWFull)}
          rows={[
            {
              cells: [
                {
                  label: 'From',
                  value: 'Mr Johnny Corrigan',
                  icon: 'usernameSystem',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Last message',
                  value: 'How are you doing today?',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Send Time',
                  value: '19 Apr 2021',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Status',
                  value: 'Read',
                  statusCircleIntent: 'danger',
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
              expandableContent: {
                content: (
                  <>
                    <MessageContainer>
                      <ReceivedMessage>
                        <BodyText hasGreyText hasNoMargin>
                          Hi Nina, how are you?
                        </BodyText>
                      </ReceivedMessage>
                    </MessageContainer>
                    <MessageContainer>
                      <SendMessage>
                        <BodyText hasGreyText hasNoMargin>
                          Hi Nina, how are you?
                        </BodyText>
                      </SendMessage>
                    </MessageContainer>
                    <ButtonGroup alignment="right">
                      <Button intent="primary" chevronRight type="submit" onClick={() => {}}>
                        Send
                      </Button>
                    </ButtonGroup>
                  </>
                ),
              },
            },
          ]}
        />
      </FlexContainer>
    </>
  )
}

export default Messages
