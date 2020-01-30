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

/* eslint-disable @typescript-eslint/require-await */
import { IssueCredentialEventHandler } from '@ula-aca/issue-credential'
import {
  CredentialExchangeRecordProposalSent,
  CredentialExchangeRecordProposalReceived,
  CredentialExchangeRecordOfferSent,
  CredentialExchangeRecordOfferReceived,
  CredentialExchangeRecordRequestSent,
  CredentialExchangeRecordRequestReceived,
  CredentialExchangeRecordIssued,
  CredentialExchangeRecordCredentialReceived,
  CredentialExchangeRecordCredentialAcknowledged
} from '@ula-aca/webhook-event-models'
import { logWebhookEvent } from '@ula-aca/test-utils'

class AcmeIssueCredentialEventHandler extends IssueCredentialEventHandler {
  async onProposalSent(
    message: CredentialExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onProposalSent`,
      input: message
    })
  }

  async onProposalReceived(
    message: CredentialExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onProposalReceived`,
      input: message
    })
  }

  async onOfferSent(message: CredentialExchangeRecordOfferSent): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onOfferSent`,
      input: message
    })
  }

  async onOfferReceived(
    message: CredentialExchangeRecordOfferReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onOfferReceived`,
      input: message
    })
  }

  async onRequestSent(
    message: CredentialExchangeRecordRequestSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onRequestSent`,
      input: message
    })
  }

  async onRequestReceived(
    message: CredentialExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onRequestReceived`,
      input: message
    })
  }

  async onIssued(message: CredentialExchangeRecordIssued): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onIssued`,
      input: message
    })
  }

  async onCredentialAcknowledged(
    message: CredentialExchangeRecordCredentialAcknowledged
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onCredentialAcknowledged`,
      input: message
    })
  }

  async onCredentialReceived(
    message: CredentialExchangeRecordCredentialReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeIssueCredentialEventHandler | onCredentialReceived`,
      input: message
    })
  }
}

export default AcmeIssueCredentialEventHandler
