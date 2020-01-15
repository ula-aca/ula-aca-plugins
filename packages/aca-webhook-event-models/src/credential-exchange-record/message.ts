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

import { AcaWebhookEventTypes } from '../AcaWebhookEventTypes'
import { CredentialExchangeRecordBase } from './base/CredentialExchangeRecordBase'

export interface IssueCredentialEvent {
  type: AcaWebhookEventTypes.ISSUE_CREDENTIAL
  body: CredentialExchangeRecordBase
}

export function isIssueCredentialEventMessage(
  properties
): properties is IssueCredentialEvent {
  return properties.type === AcaWebhookEventTypes.ISSUE_CREDENTIAL
}
