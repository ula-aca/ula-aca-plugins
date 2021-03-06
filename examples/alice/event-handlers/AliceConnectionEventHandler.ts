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
  AcceptInvitationBody,
  SendBasicMessageBody,
  AcceptRequestBody
} from '@ula-aca/connection'
import {
  acceptInvitation,
  sendBasicMessage,
  acceptRequest
} from '@ula-aca/connection/examples'
import { getCredentials } from '@ula-aca/credential/examples'
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

class AliceConnectionEventHandler extends ConnectionEventHandler {
  async onBasicMessage(message: BasicMessage): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceConnectionEventHandler | onBasicMessage`,
      input: message
    })
  }

  async onInit(message: PairwiseConnectionRecordInit): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceConnectionEventHandler | onInit`,
      input: message
    })
  }

  async onInvitation(
    message: PairwiseConnectionRecordInvitation
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceConnectionEventHandler | onInvitation`,
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
        comment: `#3. Alice accepts connection invitation from Faber (AliceConnectionEventHandler.OnInvitation)`,
        input: body,
        output: result
      })
    }
  }

  async onRequest(message: PairwiseConnectionRecordRequest): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceConnectionEventHandler | onRequest`,
      input: message
    })

    // Always accept connection requests. You could add logic here to see
    // if you really want to accept this credential
    const body: AcceptRequestBody = {
      connection_id: message.connection_id
    }

    const result = await acceptRequest(this.eventHandler, body)
    logEvent({
      type: ConnectionMessageTypes.ACCEPT_REQUEST,
      comment: `#16. Alice accepts connection request from Acme (AliceConnectionEventHandler.onRequest)`,
      input: body,
      output: result
    })
  }

  async onResponse(message: PairwiseConnectionRecordResponse): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceConnectionEventHandler | onResponse`,
      input: message
    })

    if (message.initiator !== 'self') {
      const comment = `#5. Alice sends message to Faber (AliceConnectionEventHandler.onResponse)`

      // Send basic message after getting response from faber. We now have a connection
      // This will move it from 'response' to 'active'. This is not needed.
      // The first action done on a connection will move it from 'response' to 'active'
      const body: SendBasicMessageBody = {
        connection_id: message.connection_id,
        content: `Hello, I am Alice`
      }

      const result = await sendBasicMessage(this.eventHandler, body)
      logEvent({
        type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
        comment,
        input: body,
        output: result
      })
    } else {
      const comment = `#17. Alice sends cred_def_id to Acme (AliceConnectionEventHandler.onResponse)`

      // ACME only allows credentials issued by Faber. Because the cred_def_id changes everytime the server restarts
      // we send it as a basic message to ACME
      const credentials = await getCredentials(this.eventHandler)
      const { cred_def_id } = credentials.results.find(cred =>
        cred.cred_def_id.includes('Faber-CollegeDegreeSchema')
      )

      // Send basic message after getting response from acme. We now have a connection
      // This will move it from 'response' to 'active'. This is not needed.
      // The first action done on a connection will move it from 'response' to 'active'
      const body: SendBasicMessageBody = {
        connection_id: message.connection_id,
        content: cred_def_id
      }

      const result = await sendBasicMessage(this.eventHandler, body)
      logEvent({
        type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
        comment,
        input: body,
        output: result
      })
    }
  }

  async onActive(message: PairwiseConnectionRecordActive): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceConnectionEventHandler | onActive`,
      input: message
    })
  }

  async onInactive(message: PairwiseConnectionRecordInactive): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceConnectionEventHandler | onInactive`,
      input: message
    })
  }

  async onError(message: PairwiseConnectionRecordError): Promise<void> {
    logWebhookEvent({
      type: `Alice | AliceConnectionEventHandler | onError`,
      input: message
    })
  }
}

export default AliceConnectionEventHandler
