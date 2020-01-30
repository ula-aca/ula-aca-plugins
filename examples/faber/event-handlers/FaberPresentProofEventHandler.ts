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
import { PresentProofEventHandler } from '@ula-aca/present-proof'
import { logWebhookEvent } from '@ula-aca/test-utils'
import {
  PresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalReceived,
  PresentationExchangeRecordRequestSent,
  PresentationExchangeRecordRequestReceived,
  PresentationExchangeRecordPresentationSent,
  PresentationExchangeRecordPresentationReceived,
  PresentationExchangeRecordVerified
} from '@ula-aca/webhook-event-models'

class FaberPresentProofEventHandler extends PresentProofEventHandler {
  async onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onProposalSent`,
      input: message
    })
  }

  async onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onProposalReceived`,
      input: message
    })
  }

  async onRequestSent(
    message: PresentationExchangeRecordRequestSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onRequestSent`,
      input: message
    })
  }

  async onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onRequestReceived`,
      input: message
    })
  }

  async onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onPresentationSent`,
      input: message
    })
  }

  async onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onPresentationReceived`,
      input: message
    })
  }

  async onVerified(message: PresentationExchangeRecordVerified): Promise<void> {
    logWebhookEvent({
      type: `Faber | FaberPresentProofEventHandler | onVerified`,
      input: message
    })
  }
}

export default FaberPresentProofEventHandler
