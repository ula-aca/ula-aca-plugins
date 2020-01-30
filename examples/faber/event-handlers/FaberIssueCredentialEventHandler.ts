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
import {
  IssueCredentialEventHandler,
  IssueBody,
  IssueCredentialMessageTypes
} from '@ula-aca/issue-credential'
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
import { logWebhookEvent, logEvent } from '@ula-aca/test-utils'
import { issue } from '@ula-aca/issue-credential/examples'

class FaberIssueCredentialEventHandler extends IssueCredentialEventHandler {
  async onProposalSent(
    message: CredentialExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onProposalSent`,
      input: message
    })
  }

  async onProposalReceived(
    message: CredentialExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onProposalReceived`,
      input: message
    })
  }

  async onOfferSent(message: CredentialExchangeRecordOfferSent): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onOfferSent`,
      input: message
    })
  }

  async onOfferReceived(
    message: CredentialExchangeRecordOfferReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onOfferReceived`,
      input: message
    })
  }

  async onRequestSent(
    message: CredentialExchangeRecordRequestSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onRequestSent`,
      input: message
    })
  }

  async onRequestReceived(
    message: CredentialExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onRequestReceived`,
      input: message
    })

    // Always issue credential when we receive a request. You could add logic here to see
    // if you really want to accept this credential
    const issueBody: IssueBody = {
      credential_exchange_id: message.credential_exchange_id,
      credential_preview: message.credential_proposal_dict.credential_proposal
    }
    const result = await issue(this.eventHandler, issueBody)
    logEvent({
      type: IssueCredentialMessageTypes.ISSUE,
      comment:
        '#11. Faber issues credential to Alice (FaberIssueCredentialEventHandler.onRequestReceived)',
      input: issueBody,
      output: result
    })
  }

  async onIssued(message: CredentialExchangeRecordIssued): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onIssued`,
      input: message
    })
  }

  async onCredentialAcknowledged(
    message: CredentialExchangeRecordCredentialAcknowledged
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onCredentialAcknowledged`,
      input: message
    })
  }

  async onCredentialReceived(
    message: CredentialExchangeRecordCredentialReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberIssueCredentialEventHandler | onCredentialReceived`,
      input: message
    })
  }
}

export default FaberIssueCredentialEventHandler
