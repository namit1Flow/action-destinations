import { IntegrationError } from '@segment/actions-core'

import { OFFLINE_DATA_JOB_URL } from './constants'

export const createOfflineDataJob = async (request: Request, externalId: string, statsClient, statsTags) => {
  const url = new URL(`${OFFLINE_DATA_JOB_URL}:create`)
  const response = await request(url.toString(), {
    method: 'POST',
    json: {
      job: {
        type: 'CUSTOMER_MATCH_USER_LIST',
        customerMatchUserListMetadata: {
          userList: externalId
        }
      }
    }
  })

  if (response.status !== 200) {
    statsClient?.incr('createOfflineDataJob.error', 1, statsTags)
    throw new IntegrationError('Invalid response from create offline data job request', 'INVALID_RESPONSE', 400)
    return
  }

  // return the last part of the resourceName
  const r = await response.json()
  statsClient?.incr('createOfflineDataJob.success', 1, statsTags)

  return r['resourceName'].split('/').pop()
}
