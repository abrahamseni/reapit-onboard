import { format, getDay, parse, startOfWeek } from 'date-fns'
import enAU from 'date-fns/locale/en-AU'
import * as React from 'react'
import { Calendar, dateFnsLocalizer, Event, SlotInfo, Views } from 'react-big-calendar'
import { modalBody } from '../ui/__styles__/styles'

interface CalendarProps {
  events: Event[]
  reservedAppointment: (event: SlotInfo) => void
  openEditAppointment: (event: Event) => void
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-AU': enAU },
})

const CalendarModalBody: React.FC<CalendarProps> = ({ events, reservedAppointment, openEditAppointment }) => {
  return (
    <div className={modalBody}>
      <Calendar
        selectable
        localizer={localizer}
        defaultDate={new Date(Date.now())}
        defaultView={Views.WEEK}
        views={['month', 'week', 'day']}
        events={events}
        step={30}
        timeslots={12}
        onSelectSlot={reservedAppointment}
        onSelectEvent={openEditAppointment}
        dayLayoutAlgorithm="no-overlap"
      />
    </div>
  )
}

export default CalendarModalBody
