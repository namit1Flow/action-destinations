import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import { createOfflineDataJob } from './shared'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Add to Audience',
  description: '',
  fields: {},
  perform: () => {
    createOfflineDataJob()
    return
  }
}

export default action
