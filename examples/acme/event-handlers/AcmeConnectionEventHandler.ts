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
  ConnectionEventHandler,
  ConnectionMessageTypes,
  AcceptInvitationBody
} from '@ula-aca/connection'
import { acceptInvitation } from '@ula-aca/connection/examples'
import {
  SendRequestBody as SendProofRequestBody,
  PresentProofMessageTypes
} from '@ula-aca/present-proof'
import { sendRequest as sendProofRequest } from '@ula-aca/present-proof/examples'
import { logEvent, logWebhookEvent } from '@ula-aca/test-utils'
import {
  BasicMessage,
  PairwiseConnectionRecordInit,
  PairwiseConnectionRecordInvitation,
  PairwiseConnectionRecordRequest,
  PairwiseConnectionRecordResponse,
  PairwiseConnectionRecordActive,
  PairwiseConnectionRecordInactive,
  PairwiseConnectionRecordError
} from '@ula-aca/webhook-event-models'

class AcmeConnectionEventHandler extends ConnectionEventHandler {
  async onBasicMessage(message: BasicMessage): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onBasicMessage`,
      input: message
    })

    // Alice send the cred_def_id from the Faber College Degree.
    // Normally you wouldn't do it like this,
    // but the cred_def_id changes everytime the server is restarted
    const cred_def_id = message.content

    const sendProofRequestBody: SendProofRequestBody = {
      connection_id: message.connection_id,
      comment: 'As Acme I want to request a proof of degree from Alice',
      proof_request: {
        requested_attributes: {
          first_name: {
            name: 'first_name',
            // TODO: fix types in interface package
            restrictions: [
              {
                cred_def_id
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] as any
          },
          last_name: {
            name: 'last_name',

            restrictions: [
              {
                cred_def_id
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] as any
          },
          degree: {
            name: 'degree',
            restrictions: [
              {
                cred_def_id
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ] as any
          }
        },
        requested_predicates: {},
        name: 'AcmeRequestAlice',
        version: '1.0',
        nonce: '12345678'
      }
    }
    const result = await sendProofRequest(
      this.eventHandler,
      sendProofRequestBody
    )
    logEvent({
      type: PresentProofMessageTypes.SEND_REQUEST,
      comment: `#18. Acme sends proof request to Alice (AcmeConnectionEventHandler.onBasicMessage)`,
      input: sendProofRequestBody,
      output: result
    })
  }

  async onInit(message: PairwiseConnectionRecordInit): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onInit`,
      input: message
    })
  }

  async onInvitation(
    message: PairwiseConnectionRecordInvitation
  ): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onInvitation`,
      input: message
    })

    // onInvitation is also called when I create an invitation.
    // Only want to accept received invitation, not initiated invitations.
    if (message.initiator !== 'self') {
      const body: AcceptInvitationBody = {
        connection_id: message.connection_id
      }

      const result = await acceptInvitation(this.eventHandler, body)
      logEvent({
        type: ConnectionMessageTypes.ACCEPT_INVITATION,
        comment: `#15. Acme accepts connection invitation from AcmeConnectionEventHandler.OnInvitation()`,
        input: body,
        output: result
      })
    }
  }

  async onRequest(message: PairwiseConnectionRecordRequest): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onRequest`,
      input: message
    })
  }

  async onResponse(message: PairwiseConnectionRecordResponse): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onResponse`,
      input: message
    })
  }

  async onActive(message: PairwiseConnectionRecordActive): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onActive`,
      input: message
    })
  }

  async onInactive(message: PairwiseConnectionRecordInactive): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onInactive`,
      input: message
    })
  }

  async onError(message: PairwiseConnectionRecordError): Promise<void> {
    logWebhookEvent({
      type: `Acme | AcmeConnectionEventHandler | onError`,
      input: message
    })
  }
}

export default AcmeConnectionEventHandler
