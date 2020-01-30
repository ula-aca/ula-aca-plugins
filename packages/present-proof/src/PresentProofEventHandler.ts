/*
 * Copyright 2019-present ula-aca
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

import { Message, UlaResponse } from 'universal-ledger-agent'

import { AcaEventPlugin, UlaCallback } from '@ula-aca/core'
import {
  isPresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalReceived,
  isPresentationExchangeRecordProposalReceived,
  isPresentationExchangeRecordRequestSent,
  isPresentationExchangeRecordRequestReceived,
  isPresentationExchangeRecordPresentationSent,
  isPresentationExchangeRecordPresentationReceived,
  PresentationExchangeRecordRequestSent,
  PresentationExchangeRecordRequestReceived,
  PresentationExchangeRecordPresentationSent,
  PresentationExchangeRecordVerified,
  isPresentationExchangeRecordVerified,
  PresentationExchangeRecordPresentationReceived,
  isPresentProofEventMessage
} from '@ula-aca/webhook-event-models'

abstract class PresentProofEventHandler extends AcaEventPlugin {
  get name(): string {
    return '@ula-aca/present-proof/PresentProofEventHandler'
  }

  @AcaEventPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (!isPresentProofEventMessage(message.properties)) {
      return 'ignored'
    }

    const { body } = message.properties

    if (isPresentationExchangeRecordProposalSent(body)) {
      await this.onProposalSent(body)
    } else if (isPresentationExchangeRecordProposalReceived(body)) {
      await this.onProposalReceived(body)
    } else if (isPresentationExchangeRecordRequestSent(body)) {
      await this.onRequestSent(body)
    } else if (isPresentationExchangeRecordRequestReceived(body)) {
      await this.onRequestReceived(body)
    } else if (isPresentationExchangeRecordPresentationSent(body)) {
      await this.onPresentationSent(body)
    } else if (isPresentationExchangeRecordPresentationReceived(body)) {
      await this.onPresentationReceived(body)
    } else if (isPresentationExchangeRecordVerified(body)) {
      await this.onVerified(body)
    }

    const response = new UlaResponse({ statusCode: 200, body: {} })

    callback(response)
    return 'success'
  }

  abstract async onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void>

  abstract async onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void>

  abstract async onRequestSent(
    message: PresentationExchangeRecordRequestSent
  ): Promise<void>

  abstract async onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void>

  abstract async onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void>

  abstract async onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void>

  abstract async onVerified(
    message: PresentationExchangeRecordVerified
  ): Promise<void>
}

export { PresentProofEventHandler }
