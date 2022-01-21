import { ReapitConnectSession } from '@reapit/connect-session'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { useQuery } from 'react-query'
import axios from '../axios'
import { URLS } from '../constants/api'

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
