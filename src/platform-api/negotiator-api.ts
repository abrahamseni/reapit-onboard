import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { useQuery } from 'react-query'
import axios from '../axios'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const fetchNegotiatorById = async ({ queryKey }): Promise<NegotiatorModel | undefined> => {
  if (!queryKey[2]) return
  try {
    const data = await axios.get(`${window.reapit.config.platformApiUrl}${URLS.NEGOTIATORS}/${queryKey[1]}`, {
      headers: {
        Authorization: `Bearer ${queryKey[2].accessToken}`,
      },
    })
    return data.data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting negotiator.')
  }
}

export const useGetNegotiatorById = (
  session: ReapitConnectSession | null,
  options: {
    id: string
  },
) => {
  const { id } = options
  const result = useQuery<
    NegotiatorModel | undefined,
    Error,
    NegotiatorModel,
    [string, string, ReapitConnectSession | null]
  >(['getNegotiatorById', id, session], fetchNegotiatorById, {
    enabled: !!id,
  })

  return result
}

export const fetchNegotiatorByOffice = async ({ queryKey }): Promise<NegotiatorModel | undefined> => {
  if (!queryKey[1].session) return
  try {
    const data = await axios.get(
      `${window.reapit.config.platformApiUrl}${URLS.NEGOTIATORS}/?officeId=${queryKey[1].id}`,
      {
        headers: {
          Authorization: `Bearer ${queryKey[1].session.accessToken}`,
        },
      },
    )
    return data.data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting negotiator.')
  }
}

export const useGetNegotiatorByOffice = (options: { id: string }) => {
  const { connectSession: session } = useReapitConnect(reapitConnectBrowserSession)
  const { id } = options
  const result = useQuery<
    NegotiatorModel | undefined,
    Error,
    NegotiatorModel,
    [string, { id: string; session: ReapitConnectSession | null }]
  >(['getNegotiatorById', { id, session }], fetchNegotiatorByOffice, {
    enabled: !!id,
  })

  return result
}
