import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { PropertyModel, PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useQuery } from 'react-query'
import axios from '../axios'
import { BASE_HEADERS, URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const getAllProperties = async (
  session: ReapitConnectSession,
): Promise<PropertyModelPagedResult | undefined> => {
  try {
    const response = await fetch(`${(window as any).reapit.config.platformApiUrl}${URLS.PROPERTIES}`, {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      const responseJson: Promise<PropertyModelPagedResult | undefined> = response.json()
      return responseJson
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Properties', err)
  }
}

export const useGetPropertiesByAddress = (
  session: ReapitConnectSession | null,
  options: {
    pageNumber: number
    address?: string
  },
) => {
  const { pageNumber, address } = options

  const fetchPropertiesByAddress = async ({ queryKey }) => {
    if (!session) return
    try {
      const data = await axios.get(
        `${(window as any).reapit.config.platformApiUrl}${URLS.PROPERTIES}/?pageNumber=${queryKey[1]}&address=${
          queryKey[2]
        }`,
        {
          headers: {
            Authorization: `Bearer ${queryKey[3].accessToken}`,
          },
        },
      )
      return data.data
    } catch (error) {
      console.log(error)
      throw new Error('Error getting properties.')
    }
  }
  const propertiesResult = useQuery<
    PropertyModelPagedResult,
    Error,
    PropertyModelPagedResult,
    [string, number, string | undefined, ReapitConnectSession | null]
  >(['getPropertiesByAddress', pageNumber, address, session], fetchPropertiesByAddress)

  return propertiesResult
}

export const useGetPropertiesBy = (options: {
  pageNumber: number
  address?: string
  sortBy?: string
  type?: string
  officeId?: string
}) => {
  const { connectSession: session } = useReapitConnect(reapitConnectBrowserSession)
  const { pageNumber, ...otherQueries } = options
  const queriesString = Object.keys(otherQueries)
    .map((key) => otherQueries[key] && `${key}=${otherQueries[key]}`)
    .join('&')

  const fetchPropertiesBy = async () => {
    if (!session) return
    try {
      const data = await axios.get(
        `${(window as any).reapit.config.platformApiUrl}${URLS.PROPERTIES}/?pageNumber=${pageNumber}&${queriesString}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      )
      return data.data
    } catch (error) {
      console.log(error)
      throw new Error('Error getting properties.')
    }
  }

  const propertiesResult = useQuery<
    PropertyModelPagedResult,
    Error,
    PropertyModelPagedResult,
    [string, { pageNumber: number; options: any }]
  >(['getPropertiesBy', { pageNumber, options }], fetchPropertiesBy, {
    enabled: !!session,
  })

  return propertiesResult
}

export const useGetPropertyById = (
  session: ReapitConnectSession | null,
  options: {
    id: string
  },
) => {
  const { id } = options

  const fetchPropertyById = async ({ queryKey }) => {
    if (!session) return
    try {
      const data = await axios.get(`${(window as any).reapit.config.platformApiUrl}${URLS.PROPERTIES}/${queryKey[1]}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      return data.data
    } catch (error) {
      console.log(error)
      throw new Error('Error getting properties.')
    }
  }
  const propertyResult = useQuery<PropertyModel, Error, PropertyModel, [string, string | undefined]>(
    ['getPropertyById', id],
    fetchPropertyById,
  )

  return propertyResult
}
