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

import {
  CredentialExchangeRecordProposalSent,
  CredentialExchangeRecordProposalReceived,
  CredentialExchangeRecordOfferSent,
  CredentialExchangeRecordOfferReceived,
  CredentialExchangeRecordRequestSent,
  CredentialExchangeRecordRequestReceived,
  CredentialExchangeRecordIssued,
  CredentialExchangeRecordCredentialAcknowledged,
  CredentialExchangeRecordCredentialReceived
} from '@ula-aca/webhook-event-models'
import { IssueCredentialEventHandler } from '@ula-aca/issue-credential'

/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */

class TestIssueCredentialEventHandler extends IssueCredentialEventHandler {
  async onProposalSent(
    message: CredentialExchangeRecordProposalSent
  ): Promise<void> {}

  async onProposalReceived(
    message: CredentialExchangeRecordProposalReceived
  ): Promise<void> {}

  async onOfferSent(
    message: CredentialExchangeRecordOfferSent
  ): Promise<void> {}

  async onOfferReceived(
    message: CredentialExchangeRecordOfferReceived
  ): Promise<void> {}

  async onRequestSent(
    message: CredentialExchangeRecordRequestSent
  ): Promise<void> {}

  async onRequestReceived(
    message: CredentialExchangeRecordRequestReceived
  ): Promise<void> {}

  async onIssued(message: CredentialExchangeRecordIssued): Promise<void> {}

  async onCredentialAcknowledged(
    message: CredentialExchangeRecordCredentialAcknowledged
  ): Promise<void> {}

  async onCredentialReceived(
    message: CredentialExchangeRecordCredentialReceived
  ): Promise<void> {}
}

export default TestIssueCredentialEventHandler
