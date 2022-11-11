import nock from 'nock'
import { createTestEvent, createTestIntegration, DecoratedResponse, IntegrationError } from '@segment/actions-core'
import Definition from '../index'
import { getEndpointByRegion } from '../regional-endpoints'

const testDestination = createTestIntegration(Definition)
const settings = {
  endpoint: 'north_america'
}
const endpoint = getEndpointByRegion(settings.endpoint)

describe('Intercom (actions)', () => {
  describe('testAuthentication', () => {
    it('should validate authentication inputs', async () => {
      nock(endpoint).get('/admins').reply(200, {})
      await expect(testDestination.testAuthentication(settings)).resolves.not.toThrowError()
    })

    it('should fail on authentication failure', async () => {
      nock(endpoint).get('/admins').reply(404, {})

      await expect(testDestination.testAuthentication(settings)).rejects.toThrowError(
        new Error('Credentials are invalid:  Test authentication failed')
      )
    })
  })

  describe('onDelete', () => {
    it('should delete a user by searching for a user using the userId', async () => {
      const userId = '9999'
      const event = createTestEvent({ userId: '9999' })
      nock(endpoint).delete(`/contacts/${userId}`).reply(200, {})
      nock(`${endpoint}`)
        .post(`/contacts/search`)
        .reply(200, { total_count: 1, data: [{ id: 1 }] })

      if (testDestination.onDelete) {
        const response = await testDestination.onDelete(event, settings)
        const resp = response as DecoratedResponse
        expect(resp.status).toBe(200)
        expect(resp.data).toMatchObject({})
      }
    })

    it('should throw an error when no user is found', async () => {
      const userId = '9999'
      const event = createTestEvent({ userId: '9999' })
      nock(endpoint).delete(`/contacts/${userId}`).reply(200, {})
      nock(`${endpoint}`).post(`/contacts/search`).reply(200, { total_count: 0, data: [] })

      if (testDestination.onDelete) {
        await expect(testDestination.onDelete(event, settings)).rejects.toThrowError(
          new IntegrationError('No unique contact found', 'Contact not found', 404)
        )
      }
    })
  })
})
