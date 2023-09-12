// Generated file. DO NOT MODIFY IT BY HAND.

export interface Payload {
  /**
   * The Profile Space to use for creating a record. *Note: This field shows list of internal sources associated with the Profile Space. Changes made to the Profile Space name in **Settings** will not reflect in this list unless the source associated with the Profile Space is renamed explicitly.*
   */
  engage_space: string
  /**
   * Unique identifier for the user in your database. A userId or an anonymousId is required.
   */
  user_id?: string
  /**
   * A pseudo-unique substitute for a User ID, for cases when you don’t have an absolutely unique identifier. A userId or an anonymousId is required.
   */
  anonymous_id?: string
  /**
   * Email of the user
   */
  email?: string
  /**
   * Phone number of the user
   */
  phone?: string
  /**
   * Global status of the email subscription. True is subscribed, false is unsubscribed and null|undefined is did-not-subscribe.
   */
  email_subscription_status?: string
  /**
   * Global status of the SMS subscription. True is subscribed, false is unsubscribed and null|undefined is did-not-subscribe.
   */
  sms_subscription_status?: string
  /**
   * Global status of the WhatsApp subscription. True is subscribed, false is unsubscribed and null|undefined is did-not-subscribe.
   */
  whatsapp_subscription_status?: string
  /**
   * Free-form dictionary of traits that describe the user or group of users.
   */
  traits?: {
    [k: string]: unknown
  }
  /**
   * Subscription status for the groups. Object containing group names as keys and statuses as values
   */
  subscriptionGroups?: {
    [k: string]: unknown
  }
}
