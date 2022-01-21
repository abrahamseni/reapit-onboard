import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { OfficeModel } from '@reapit/foundations-ts-definitions'
import { QueryKey, useQueries, UseQueryOptions, UseQueryResult } from 'react-query'
import axios from '../axios'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

type fetchParams = {
  id: string
  session: ReapitConnectSession | null
}

export const fetchOfficeById = async ({ id, session }: fetchParams): Promise<OfficeModel | undefined> => {
  if (!session) return
  try {
    const data = await axios.get(`${(window as any).reapit.config.platformApiUrl}${URLS.OFFICES}/${id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    return data.data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting office.')
  }
}

export const useGetOfficesById = (options: { id: string[] }) => {
  const { id } = options
  const { connectSession: session } = useReapitConnect(reapitConnectBrowserSession)
  const queries = id.map((i: string) => {
    return {
      queryKey: ['getOfficeById', { id: i, session }],
      queryFn: () => fetchOfficeById({ id: i, session }),
    }
  })
  const result = useQueries<UseQueryOptions<any, Error, typeof queries, QueryKey>[]>(queries)

  return result as UseQueryResult<OfficeModel>[]
}
