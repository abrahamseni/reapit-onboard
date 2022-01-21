import { PropertyModel } from '@reapit/foundations-ts-definitions'
import * as React from 'react'
import AppointmentCard from '../components/ui/appointmentCard'

export const renderTableExpandableComponent = (props: PropertyModel) => <AppointmentCard {...props} />
