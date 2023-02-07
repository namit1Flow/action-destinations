// // import nock from 'nock'
// import { createTestEvent, createTestIntegration } from '@segment/actions-core'
// import Destination from '../../index'
// // import { BASE_URL, TIKTOK_API_VERSION } from '../../constants'

// const testDestination = createTestIntegration(Destination)

// interface AuthTokens {
//   accessToken: string
//   refreshToken: string
// }

// const auth: AuthTokens = {
//   accessToken: 'test',
//   refreshToken: 'test'
// }

// const event = createTestEvent({
//   event: 'Audience Entered',
//   type: 'track',
//   properties: {
//     audience_key: 'personas_test_audience'
//   },
//   context: {
//     device: {
//       advertisingId: '123'
//     },
//     traits: {
//       email: 'testing@testing.com'
//     }
//   }
// })

// // const urlParams = {
// //   advertiser_id: '123',
// //   page: 1,
// //   page_size: 100
// // }

// // const updateUsersRequestBody = {
// //   advertiser_ids: ['1234567'],
// //   action: 'add',
// //   data: [
// //     {
// //       id_type: 'EMAIL_SHA256',
// //       id: '584c4423c421df49955759498a71495aba49b8780eb9387dff333b6f0982c777',
// //       audience_ids: ['1234564']
// //     },
// //     {
// //       id_type: 'EMAIL_SHA256',
// //       id: '584c4423c421df49955759498a71495aba49b8780eb9387dff333b6f0982c777',
// //       audience_ids: ['1234564']
// //     }
// //   ]
// // }

// // const createAudienceRequestBody = {
// //     custom_audience_name: "personas_test_audience",
// //     advertiser_id: 123,
// //     id_type: "EMAIL_SHA256",
// //     action: "create"
// // }

// describe('TiktokAudiences.updateAudience', () => {
//   it('should fail if `personas_audience_key` field does not match the `custom_audience_name` field', async () => {
//     await expect(
//       testDestination.testAction('updateAudience', {
//         event,
//         settings: {
//           advertiser_id: '123'
//         },
//         useDefaultMappings: true,
//         auth,
//         mapping: {
//           personas_audience_key: 'mismatched_audience'
//         }
//       })
//     ).rejects.toThrow('The value of `custom_audience_name` and `personas_audience_key` must match.')
//   })

// //   it('should succeed if an exisiting audience is found', async () => {
// //     nock(`${BASE_URL}${TIKTOK_API_VERSION}/dmp/custom_audience/list/`)
// //       .get(/.*/)
// //       .query(urlParams)
// //       .reply(200, {
// //         code: 0,
// //         message: 'OK',
// //         data: { page_info: { total_number: 1 }, list: [{ name: 'personas_test_audience', audience_id: '1234345' }] }
// //       })
// //     nock(`${BASE_URL}${TIKTOK_API_VERSION}/segment/mapping/`).post(/.*/, updateUsersRequestBody).reply(200)

// //     await expect(
// //       testDestination.testAction('updateAudience', {
// //         event,
// //         settings: {
// //           advertiser_id: '123'
// //         },
// //         useDefaultMappings: true,
// //         auth,
// //         mapping: {
// //           personas_audience_key: 'personas_test_audience',
// //           id_type: 'EMAIL_SHA256'
// //         }
// //       })
// //     ).resolves.not.toThrowError()
// //   })

//   //   it('should successfully create a new audience if one is not found', async () => {
//   //     nock(`${BASE_URL}${TIKTOK_API_VERSION}/dmp/custom_audience/list/`)
//   //       .get(/.*/)
//   //       .query(urlParams)
//   //       .reply(200,{ code: 0, message: "OK", data: { page_info: {total_number: 1}, list: [{ name: "another_audience", audience_id: "1234345"}]}})

//   //     nock(`${BASE_URL}${TIKTOK_API_VERSION}/segment/audience/`).post(/.*/, createAudienceRequestBody).reply(200, {data: { audience_id: "1234"}})
//   //     nock(`${BASE_URL}${TIKTOK_API_VERSION}/segment/mapping/`).post(/.*/, updateUsersRequestBody).reply(200)

//   //     await expect(
//   //       testDestination.testAction('updateAudience', {
//   //         event,
//   //         settings: {
//   //             advertiser_id: '123'
//   //         },
//   //         useDefaultMappings: true,
//   //         auth,
//   //         mapping: {
//   //           personas_audience_key: 'personas_test_audience',
//   //           id_type: 'EMAIL_SHA256'
//   //         }
//   //       })
//   //     ).resolves.not.toThrowError()
//   //   })
// })