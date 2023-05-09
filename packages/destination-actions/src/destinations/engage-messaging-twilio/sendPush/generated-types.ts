// Generated file. DO NOT MODIFY IT BY HAND.

export interface Payload {
  /**
   * The template you sending
   */
  contentSid: string
  /**
   * The Push Service Sid to send the push noitification from.
   */
  from: string
  customizations?: {
    /**
     * The title to be displayed for your notification
     */
    title?: string
    /**
     * Sets the noitfication click action/category
     */
    tapAction?: string
    /**
     * Sets the deep link
     */
    deepLink?: string
    /**
     * Sets the sound played when the notification arrives
     */
    sound?: string
    /**
     * Sets the priority of the message
     */
    priority?: string
    /**
     * The badge count which is used in combination with badge strategy to determine the final badge
     */
    badgeAmount?: number
    /**
     * Sets the badge count strategy in the notification
     */
    badgeStrategy?: string
  }
  /**
   * Additional custom arguments that will be opaquely sent back on webhook events
   */
  customArgs?: {
    [k: string]: unknown
  }
  /**
   * Connection overrides are configuration supported by twilio webhook services. Must be passed as fragments on the callback url
   */
  connectionOverrides?: string
  /**
   * Whether or not the notification should actually get sent.
   */
  send?: boolean
  /**
   * An array of user profile identity information.
   */
  externalIds?: {
    /**
     * A unique identifier for the collection.
     */
    id?: string
    /**
     * The external ID contact type.
     */
    type?: string
    /**
     * The external ID contact channel type (SMS, WHATSAPP, etc).
     */
    channelType?: string
    /**
     * The subscription status for the identity.
     */
    subscriptionStatus?: string
  }[]
  /**
   * A user profile's traits
   */
  traits?: {
    [k: string]: unknown
  }
  /**
   * Time of when the actual event happened.
   */
  eventOccurredTS?: string
}