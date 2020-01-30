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
  PresentProofEventHandler,
  SendPresentationBody,
  PresentProofMessageTypes,
  GetRequestCredentialsBody
} from '@ula-aca/present-proof'
import {
  sendPresentation,
  getRequestCredentials
} from '@ula-aca/present-proof/examples'
import { logWebhookEvent, logEvent } from '@ula-aca/test-utils'
import {
  PresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalReceived,
  PresentationExchangeRecordRequestSent,
  PresentationExchangeRecordRequestReceived,
  PresentationExchangeRecordPresentationSent,
  PresentationExchangeRecordPresentationReceived,
  PresentationExchangeRecordVerified
} from '@ula-aca/webhook-event-models'

class AlicePresentProofEventHandler extends PresentProofEventHandler {
  async onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AlicePresentProofEventHandler | onProposalSent`,
      input: message
    })
  }

  async onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AlicePresentProofEventHandler | onProposalReceived`,
      input: message
    })
  }

  async onRequestSent(
    message: PresentationExchangeRecordRequestSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AlicePresentProofEventHandler | onRequestSent`,
      input: message
    })
  }

  async onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AlicePresentProofEventHandler | onRequestReceived`,
      input: message
    })

    // get credentials that match restrictions from acme
    const getCredentialsBody: GetRequestCredentialsBody = {
      presentation_exchange_id: message.presentation_exchange_id
    }

    const getCredentialsResult = await getRequestCredentials(
      this.eventHandler,
      getCredentialsBody
    )

    logEvent({
      type: PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS,
      input: getCredentialsBody,
      output: getCredentialsResult
    })

    const credential = getCredentialsResult[0]
    const cred_id = credential.cred_info.referent

    const sendPresentationBody: SendPresentationBody = {
      presentation_exchange_id: message.presentation_exchange_id,
      requested_predicates: {},
      requested_attributes: {
        first_name: {
          cred_id,
          revealed: true
        },
        last_name: {
          cred_id,
          revealed: true
        },
        degree: {
          cred_id,
          revealed: true
        }
      },
      self_attested_attributes: {}
    }

    const result = await sendPresentation(
      this.eventHandler,
      sendPresentationBody
    )
    logEvent({
      type: PresentProofMessageTypes.SEND_PRESENTATION,
      comment: `#18. Alice sends proof presentation to Acme (AlicePresentProofEventHandler.onRequestReceived)`,
      input: sendPresentationBody,
      output: result
    })
  }

  async onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AlicePresentProofEventHandler | onPresentationSent`,
      input: message
    })
  }

  async onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Alice | AlicePresentProofEventHandler | onPresentationReceived`,
      input: message
    })
  }

  async onVerified(message: PresentationExchangeRecordVerified): Promise<void> {
    logWebhookEvent({
      type: `Alice | AlicePresentProofEventHandler | onVerified`,
      input: message
    })
  }
}

export default AlicePresentProofEventHandler
