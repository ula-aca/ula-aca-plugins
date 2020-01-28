/*
 * Copyright 2020-present ula-aca
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BasicMessage } from './BasicMessage'
import { WebhookEventTypes } from '../WebhookEventTypes'

export interface BasicMessageEventMessage {
  type: WebhookEventTypes.BASIC_MESSAGE_EVENT
  body: BasicMessage
}

export function isBasicMessageEventMessage(properties: {
  type: string
}): properties is BasicMessageEventMessage {
  return properties.type === WebhookEventTypes.BASIC_MESSAGE_EVENT
}
