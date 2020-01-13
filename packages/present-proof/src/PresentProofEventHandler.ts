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

/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin, EventHandler, Message } from 'universal-ledger-agent'
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
  PresentationExchangeRecordBase
} from '@ula-aca/aca-webhook-event-models'

abstract class PresentProofEventHandler implements Plugin {
  protected eventHandler: EventHandler

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name() {
    return '@ula-aca/present-proof/PresentProofEventHandler'
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  async handleEvent(message: Message, _callback: any): Promise<string> {
    if (message.properties.type !== 'aca-present-proof-event') {
      return 'ignored'
    }

    const payload = message.properties.payload as PresentationExchangeRecordBase

    if (isPresentationExchangeRecordProposalSent(payload)) {
      await this.onProposalSent(payload)
    } else if (isPresentationExchangeRecordProposalReceived(payload)) {
      await this.onProposalReceived(payload)
    } else if (isPresentationExchangeRecordRequestSent(payload)) {
      await this.onRequestSent(payload)
    } else if (isPresentationExchangeRecordRequestReceived(payload)) {
      await this.onRequestReceived(payload)
    } else if (isPresentationExchangeRecordPresentationSent(payload)) {
      await this.onPresentationSent(payload)
    } else if (isPresentationExchangeRecordPresentationReceived(payload)) {
      await this.onPresentationReceived(payload)
    } else if (isPresentationExchangeRecordVerified(payload)) {
      await this.onVerified(payload)
    } else {
      throw Error('unknown PresentationExchangeRecord state')
    }
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
