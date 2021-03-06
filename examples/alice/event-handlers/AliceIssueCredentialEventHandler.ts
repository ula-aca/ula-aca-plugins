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
  CreateInvitationBody,
  ConnectionMessageTypes
} from '@ula-aca/connection'
import { createInvitation } from '@ula-aca/connection/examples'
import {
  IssueCredentialEventHandler,
  SendRequestBody,
  IssueCredentialMessageTypes,
  StoreBody
} from '@ula-aca/issue-credential'
import { store, sendRequest } from '@ula-aca/issue-credential/examples'
import { logWebhookEvent, logEvent } from '@ula-aca/test-utils'
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

class AliceIssueCredentialEventHandler extends IssueCredentialEventHandler {
  async onProposalSent(
    message: CredentialExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onProposalSent`,
      input: message
    })
  }

  async onProposalReceived(
    message: CredentialExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onProposalReceived`,
      input: message
    })
  }

  async onOfferSent(message: CredentialExchangeRecordOfferSent): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onOfferSent`,
      input: message
    })
  }

  async onOfferReceived(
    message: CredentialExchangeRecordOfferReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onOfferReceived`,
      input: message
    })

    // Always accept offers by sending a request for the credential. You could add logic here to see
    // if you really want to accept this credential
    const sendRequestBody: SendRequestBody = {
      credential_exchange_id: message.credential_exchange_id
    }
    const result = await sendRequest(this.eventHandler, sendRequestBody)

    logEvent({
      type: IssueCredentialMessageTypes.SEND_REQUEST,
      comment: `#10. Alice sends credential request to Faber (AliceIssueCredentialEventHandler.onOfferReceived)`,
      input: sendRequestBody,
      output: result
    })
  }

  async onRequestSent(
    message: CredentialExchangeRecordRequestSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onRequestSent`,
      input: message
    })
  }

  async onRequestReceived(
    message: CredentialExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onRequestReceived`,
      input: message
    })
  }

  async onIssued(message: CredentialExchangeRecordIssued): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onIssued`,
      input: message
    })
  }

  async onCredentialAcknowledged(
    message: CredentialExchangeRecordCredentialAcknowledged
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onCredentialAcknowledged`,
      input: message
    })

    // --- CREATE_INVITATION ---
    const createInvitationBody: CreateInvitationBody = {
      alias: `Invitation created by Alice for ACME`
    }
    const createdInvitation = await createInvitation(
      this.eventHandler,
      createInvitationBody
    )

    logEvent({
      type: ConnectionMessageTypes.CREATE_INVITATION,
      comment: `#13. Alice creates connection invitation for ACME\n\n${JSON.stringify(
        createdInvitation.invitation
      )}`,
      input: createInvitationBody,
      output: createdInvitation
    })
  }

  async onCredentialReceived(
    message: CredentialExchangeRecordCredentialReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceIssueCredentialEventHandler | onCredentialReceived`,
      input: message
    })

    // Store credential when we receive it
    const storeBody: StoreBody = {
      credential_exchange_id: message.credential_exchange_id
    }
    const storedCredential = await store(this.eventHandler, storeBody)
    logEvent({
      type: IssueCredentialMessageTypes.STORE,
      comment: `#12. Alice stores credential from Faber (AliceIssueCredentialEventHandler.onCredentialReceived)`,
      input: storeBody,
      output: storedCredential
    })
  }
}

export default AliceIssueCredentialEventHandler
