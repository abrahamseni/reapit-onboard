import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { ApplicantModel } from '@reapit/foundations-ts-definitions'
import { useQuery } from 'react-query'
import axios from '../axios'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const fetchApplicantByOffice = async ({ queryKey }): Promise<ApplicantModel | undefined> => {
  if (!queryKey[1].session) return
  try {
    const data = await axios.get(
      `${window.reapit.config.platformApiUrl}${URLS.APPLICANTS}/?officeId=${queryKey[1].id}`,
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

export const useGetApplicantByOffice = (options: { id: string }) => {
  const { connectSession: session } = useReapitConnect(reapitConnectBrowserSession)
  const { id } = options
  const result = useQuery<
    ApplicantModel | undefined,
    Error,
    ApplicantModel,
    [string, { id: string; session: ReapitConnectSession | null }]
  >(['getNegotiatorById', { id, session }], fetchApplicantByOffice, {
    enabled: !!id,
  })

  return result
}
