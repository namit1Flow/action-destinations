// Generated file. DO NOT MODIFY IT BY HAND.

export interface Payload {
  /**
   * An ordered list of contact identifiers in Cordial. Each item in the list represents an identifier. For example, `channels.email.address -> userId` and/or `customerId -> userId`. At least one identifier should be valid otherwise the contact will not be identified and the request will be ignored.
   */
  userIdentities: {
    [k: string]: unknown
  }
  /**
   * Segment group id. Required.
   */
  groupId: string
}
