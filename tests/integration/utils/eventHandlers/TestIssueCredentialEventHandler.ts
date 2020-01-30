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

import { IssueCredentialEventHandler } from '@ula-aca/issue-credential'
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

/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */

class TestIssueCredentialEventHandler extends IssueCredentialEventHandler {
  async onProposalSent(
    _message: CredentialExchangeRecordProposalSent
  ): Promise<void> {}

  async onProposalReceived(
    _message: CredentialExchangeRecordProposalReceived
  ): Promise<void> {}

  async onOfferSent(
    _message: CredentialExchangeRecordOfferSent
  ): Promise<void> {}

  async onOfferReceived(
    _message: CredentialExchangeRecordOfferReceived
  ): Promise<void> {}

  async onRequestSent(
    _message: CredentialExchangeRecordRequestSent
  ): Promise<void> {}

  async onRequestReceived(
    _message: CredentialExchangeRecordRequestReceived
  ): Promise<void> {}

  async onIssued(_message: CredentialExchangeRecordIssued): Promise<void> {}

  async onCredentialAcknowledged(
    _message: CredentialExchangeRecordCredentialAcknowledged
  ): Promise<void> {}

  async onCredentialReceived(
    _message: CredentialExchangeRecordCredentialReceived
  ): Promise<void> {}
}

export default TestIssueCredentialEventHandler
