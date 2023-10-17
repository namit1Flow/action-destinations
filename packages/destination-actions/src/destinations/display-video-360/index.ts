import { AudienceDestinationDefinition, IntegrationError } from '@segment/actions-core'
import type { Settings, AudienceSettings } from './generated-types'

import addToAudience from './addToAudience'
import removeFromAudience from './removeFromAudience'

import { CREATE_AUDIENCE_URL, GET_AUDIENCE_URL } from './constants'

const destination: AudienceDestinationDefinition<Settings, AudienceSettings> = {
  name: 'Display and Video 360 (Actions)',
  slug: 'actions-display-video-360',
  mode: 'cloud',
  authentication: {
    scheme: 'oauth2',
    fields: {
      // TODO: Get this
    }
  },
  extendRequest() {
    return {
      headers: {
        'Access-Token': `Bearer token`, // TODO: Update
        'Content-Type': 'application/json',
        'Login-Customer-Id': 'products/DISPLAY_VIDEO_ADVERTISER/customers/advertiser_id' // TODO: Replace, find out if you can put audience settings here. or should this he a destination setting?
      }
    }
  },
  audienceFields: {
    advertiserId: {
      type: 'string',
      label: 'Advertiser ID',
      description:
        'The ID of your advertiser, used throughout Display & Video 360. Use this ID when you contact Display & Video 360 support to help our teams locate your specific account.'
    },
    idType: {
      type: 'string',
      label: 'ID Type',
      description:
        'Type to be used for populating the audience. Can be CONTACT_INFO where Members are matched from customer info such as email address, phone number or physical address. Or MOBILE_ADVERTISING_ID where Members are matched from mobile advertising IDs such as Apple IDFA or Android AAID.',
      choices: [
        { label: 'CONTACT_INFO', value: 'CONTACT_INFO' },
        { label: 'MOBILE_ADVERTISING_ID', value: 'MOBILE_ADVERTISING_ID' }
      ]
    }
  },
  audienceConfig: {
    mode: {
      type: 'synced',
      full_audience_sync: true
    },
    async createAudience(request, createAudienceInput) {
      const audienceName = createAudienceInput.audienceName
      const idType = createAudienceInput.audienceSettings?.idType
      const advertiserId = createAudienceInput.audienceSettings?.advertiserId
      const statsClient = createAudienceInput?.statsContext?.statsClient
      const statsTags = createAudienceInput?.statsContext?.tags

      if (!audienceName) {
        throw new IntegrationError('Missing audience name value', 'MISSING_REQUIRED_FIELD', 400)
      }

      if (!advertiserId) {
        throw new IntegrationError('Missing advertiser ID value', 'MISSING_REQUIRED_FIELD', 400)
      }

      if (!idType) {
        throw new IntegrationError('Missing ID type value', 'MISSING_REQUIRED_FIELD', 400)
      }

      const response = await request(CREATE_AUDIENCE_URL, {
        method: 'POST',
        json: {
          operations: [
            {
              create: {
                crmBasedUserList: {
                  // TODO: Is this really the right type?
                  uploadKeyType: idType // TODO: Does it make sense to ask them for this? What if I use undefined type as a catch all?
                },
                name: audienceName,
                membershipLifeSpan: '365'
              }
            }
          ]
        }
      })

      const r = await response.json()
      if (response.status !== 200) {
        statsClient?.incr('createAudience.error', 1, statsTags)
        throw new IntegrationError('Invalid response from create audience request', 'INVALID_RESPONSE', 400)
      }

      statsClient?.incr('createAudience.success', 1, statsTags)

      return {
        externalId: r['results'][0]['resourceName']
      }
    },
    async getAudience(request, getAudienceInput) {
      const statsClient = getAudienceInput?.statsContext?.statsClient
      const statsTags = getAudienceInput?.statsContext?.tags

      const response = await request(GET_AUDIENCE_URL, {
        method: 'POST',
        json: {
          query: `SELECT user_list.name, user_list.description, user_list.membership_status, user_list.match_rate_percentage FROM user_list WHERE user_list.resource_name = "${getAudienceInput.externalId}"`
        }
      })

      const r = await response.json()
      if (response.status !== 200) {
        statsClient?.incr('getAudience.error', 1, statsTags)
        throw new IntegrationError('Invalid response from get audience request', 'INVALID_RESPONSE', 400)
      }

      const externalId = r['results'][0]['userList']['resourceName']

      if (externalId !== getAudienceInput.externalId) {
        throw new IntegrationError(
          "Unable to verify ownership over audience. Segment Audience ID doesn't match TikToks Audience ID.",
          'INVALID_REQUEST_DATA',
          400
        )
      }

      statsClient?.incr('getAudience.success', 1, statsTags)
      return {
        externalId: externalId
      }
    }
  },
  actions: {
    addToAudience,
    removeFromAudience
  }
}

export default destination
