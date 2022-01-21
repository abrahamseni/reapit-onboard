import { ReapitConnectSession } from '@reapit/connect-session'
import { AppointmentModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from '../axios'
import { URLS } from '../constants/api'

export const fetchAppointmentByNegotiator = async ({ queryKey }): Promise<AppointmentModelPagedResult | undefined> => {
  if (!queryKey[2]) return
  try {
    const data = await axios.get(
      `${window.reapit.config.platformApiUrl}${URLS.APPOINTMENTS}/?sortBy=-start&negotiatorId=${queryKey[1]}`,
      {
        headers: {
          Authorization: `Bearer ${queryKey[2].accessToken}`,
        },
      },
    )
    return data.data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting appointments.')
  }
}

export const useGetAppointmentByNegotiator = (
  session: ReapitConnectSession | null,
  options: {
    negotiatorId: string
  },
) => {
  const { negotiatorId } = options

  const result = useQuery<
    AppointmentModelPagedResult | undefined,
    Error,
    AppointmentModelPagedResult | undefined,
    [string, string, ReapitConnectSession | null]
  >(['getAppointmentsByNegotiator', negotiatorId, session], fetchAppointmentByNegotiator)

  return result
}

const actionPostAppointment = async ({ session, body }: { session: ReapitConnectSession; body: any }) => {
  return axios
    .post(`${window.reapit.config.platformApiUrl}${URLS.APPOINTMENTS}/`, body, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    .catch((err) => console.error(err))
}

export const usePostNewAppointment = () => {
  const queryClient = useQueryClient()

  const postAppointment = useMutation(actionPostAppointment, {
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries(['getAppointmentsByNegotiator'])
    },
  })

  return [postAppointment]
}

export const actionEditAppointment = async ({
  session,
  body,
  etag,
  id,
}: {
  session: ReapitConnectSession
  body: any
  etag: string
  id: string
}) => {
  return axios
    .patch(`${window.reapit.config.platformApiUrl}${URLS.APPOINTMENTS}/${id}`, body, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'If-Match': etag,
      },
    })
    .catch((err) => console.error(err))
}

export const useEditAppointment = () => {
  const queryClient = useQueryClient()

  const editAppointment = useMutation(actionEditAppointment, {
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries(['getAppointmentsByNegotiator'])
    },
  })

  return [editAppointment]
}
