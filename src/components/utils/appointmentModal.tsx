import {
  BodyText,
  // SearchableDropdown,
  Button,
  InputGroup,
  Label,
  Select,
  Subtitle,
} from '@reapit/elements'
import {
  // ListItemModel,
  PropertyModel,
} from '@reapit/foundations-ts-definitions'
// import { useReapitConnect } from "@reapit/connect-session";
// import { reapitConnectBrowserSession } from "../../core/connect-session";
import { compareAsc } from 'date-fns'
import add from 'date-fns/add'
import * as React from 'react'
import { Event } from 'react-big-calendar'
import DatePicker from 'react-datepicker'
import { useEditAppointment, usePostNewAppointment } from '../../platform-api/appointment-api'
import { formatDate } from '../../utils/formats'
import { useGetAppointmentConfigType } from '../../utils/hooks/session'
import { Space } from './space'

interface AppointmentModalProps {
  property: PropertyModel
  reservedEvent: Event
  closeReservedModal: () => void
}

type EditDateTime = {
  start: Date
  end: Date
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ property, reservedEvent, closeReservedModal }) => {
  const { connectSession, appointmentConfigTypes } = useGetAppointmentConfigType()
  const [createReservedAppointment] = usePostNewAppointment()
  const [editAppointment] = useEditAppointment()
  const [reservedEventTitle, setReservedEventTitle] = React.useState<string | undefined>()
  const [reservedEventViewType, setReservedEventViewType] = React.useState<string | undefined>()
  const [editEvent, setEditEvent] = React.useState<EditDateTime | undefined>()

  const saveConfirmedAppointment = () => {
    if (!connectSession) return

    const body = JSON.stringify({
      start: reservedEvent?.start,
      end: reservedEvent?.end,
      followUpOn: formatDate(add(new Date(reservedEvent?.end ?? ''), { weeks: 2 }), 'yyyy-MM-dd'),
      typeId: reservedEventViewType ?? 'VW',
      description: reservedEventTitle ?? '',
      organiserId: property.negotiatorId,
      negotiatorIds: [property.negotiatorId],
      officeIds: property.officeIds,
      attendee: {
        id: 'MKT210196',
        type: 'applicant',
      },
      propertyId: property.id,
      accompanied: true,
      negotiatorConfirmed: false,
      attendeeConfirmed: true,
      propertyConfirmed: true,
      virtual: false,
      recurrence: {
        interval: 0,
        type: null,
        until: null,
      },
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
    })

    createReservedAppointment?.mutateAsync(
      { session: connectSession, body },
      {
        onSuccess: (data) => console.log('success', data),
      },
    )
    closeReservedModal()
  }

  const saveEditReservedAppointment = async () => {
    console.log(editEvent)
    if (!connectSession || !editEvent) return

    const editedEvent = {
      start: editEvent?.start,
      end: editEvent?.end,
      followUpOn: formatDate(add(new Date(editEvent.start), { weeks: 2 }), 'yyyy-MM-dd'),
      typeId: reservedEventViewType ?? 'VW',
      description: reservedEventTitle ?? '',
      // propertyId: "OXF190022",
      // organiserId: "JAS",
      // cancelled: false,
      // negotiatorIds: ["JAS"],
      // officeIds: ["OXF", "SOL"],
      // attendee: {
      //   id: "OXF20001",
      //   type: "applicant",
      //   confirmed: false,
      // },
      // accompanied: true,
      // virtual: null,
      // negotiatorConfirmed: true,
      // attendeeConfirmed: true,
      // propertyConfirmed: true,
      // followUp: {
      //   responseId: "OXF190022",
      //   notes: "Meet at the property.",
      // },
      // recurrence: null,
      // metadata: {
      //   CustomField1: "CustomValue1",
      //   CustomField2: true,
      // },
    }
    await editAppointment.mutateAsync(
      {
        session: connectSession,
        body: editedEvent,
        etag: reservedEvent.resource.tag,
        id: reservedEvent.resource.id,
      },
      {
        onSuccess: (data) => console.log('success', data),
      },
    )
    closeReservedModal()
  }

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)

    return currentDate.getTime() < selectedDate.getTime()
  }

  const renderSelectTime = () => {
    if (reservedEvent.start) {
      if (reservedEvent.resource.type !== 'edit') {
        return (
          <>
            <BodyText hasGreyText>Date: {formatDate(reservedEvent.start, 'MMMM dd, yyyy')}</BodyText>
            <BodyText hasGreyText>
              From: {formatDate(reservedEvent.start, 'HH:mm a')} - {formatDate(reservedEvent.end ?? '', 'HH:mm a')}
            </BodyText>
          </>
        )
      } else {
        return (
          <>
            <BodyText hasBoldText>Schedule:</BodyText>
            <BodyText hasGreyText>Date: {formatDate(reservedEvent.start, 'MMMM dd, yyyy')}</BodyText>
            <BodyText hasGreyText>
              From: {formatDate(reservedEvent.start, 'HH:mm a')} - {formatDate(reservedEvent.end ?? '', 'HH:mm a')}
            </BodyText>
            <BodyText hasBoldText>Change Date and Time:</BodyText>
            <DatePicker
              onChange={(date: Date) =>
                setEditEvent({
                  start: date,
                  end: add(date, { minutes: 30 }),
                })
              }
              selected={editEvent ? editEvent.start : reservedEvent.start}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              filterTime={filterPassedTime}
            />
          </>
        )
      }
    }
  }

  return (
    <>
      <Subtitle hasBoldText>Title: {reservedEvent?.title}</Subtitle>
      {renderSelectTime()}
      <Space height="12px" />
      <InputGroup
        label="Appointment Title"
        type="text"
        icon="houseInfographic"
        onChange={(event) => setReservedEventTitle(event.target.value)}
        defaultValue={reservedEvent.title as string}
        disabled={reservedEvent.resource.type === 'old'}
      />
      <Space height="12px" />
      <Label htmlFor="appointmentType">Appointment Type:</Label>
      <Select
        id="appointmentType"
        title="appointmentType"
        name="appointmentType"
        onChange={(event) => setReservedEventViewType(event.target.value)}
        disabled={reservedEvent.resource.type === 'old'}
      >
        {appointmentConfigTypes.map((type) => (
          <option key={type.id}>{type.value}</option>
        ))}
      </Select>
      {/* <SearchableDropdown<ListItemModel>
        getResults={async (query) => {
          return new Promise((resolve) => {
            resolve(
              appointmentConfigTypes.filter((type) =>
                type.value?.toLowerCase().includes(query.trim())
              )
            )
          })
        }}
        getResultValue={(result) => result.id || ''}
        getResultLabel={(result) => result.value || ''}
        onChange={(event) => setReservedEventViewType(event.target.value)}
        disabled={reservedEvent.resource.type === 'old'}
      /> */}

      <Space height="24px" />
      {reservedEvent.start && compareAsc(new Date(reservedEvent.start), Date.now()) === -1 ? (
        ''
      ) : (
        <>
          <Button intent="neutral" onClick={closeReservedModal}>
            Cancel
          </Button>
          <Button
            intent="primary"
            onClick={() => {
              if (reservedEvent.resource.type === 'new') {
                saveConfirmedAppointment()
              } else {
                saveEditReservedAppointment()
              }
            }}
          >
            {reservedEvent.resource.type === 'edit' ? 'Confirm Edit' : 'Reserved'}
          </Button>
        </>
      )}
    </>
  )
}

export default AppointmentModal
