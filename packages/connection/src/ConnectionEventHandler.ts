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

import { Plugin, EventHandler, Message } from 'universal-ledger-agent'
import {
  isPairwiseConnectionRecordInit,
  PairwiseConnectionRecordInit,
  PairwiseConnectionRecordBase,
  isPairwiseConnectionRecordInvitation,
  isPairwiseConnectionRecordRequest,
  isPairwiseConnectionRecordResponse,
  isPairwiseConnectionRecordActive,
  isPairwiseConnectionRecordInactive,
  isPairwiseConnectionRecordError,
  BasicMessage,
  PairwiseConnectionRecordInvitation,
  PairwiseConnectionRecordRequest,
  PairwiseConnectionRecordResponse,
  PairwiseConnectionRecordActive,
  PairwiseConnectionRecordInactive,
  PairwiseConnectionRecordError
} from '@ula-aca/aca-webhook-event-models'

abstract class ConnectionEventHandler implements Plugin {
  protected eventHandler: EventHandler

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name() {
    return '@ula-aca/connection/ConnectionEventHandler'
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  async handleEvent(message: Message, _callback: any): Promise<string> {
    if (
      message.properties.type !== 'aca-connection-event' &&
      message.properties.type !== 'aca-basic-message-event'
    ) {
      return 'ignored'
    }

    if (message.properties.type === 'aca-connection-event') {
      const payload = message.properties.payload as PairwiseConnectionRecordBase

      if (isPairwiseConnectionRecordInit(payload)) {
        await this.onInit(payload)
      } else if (isPairwiseConnectionRecordInvitation(payload)) {
        await this.onInvitation(payload)
      } else if (isPairwiseConnectionRecordRequest(payload)) {
        await this.onRequest(payload)
      } else if (isPairwiseConnectionRecordResponse(payload)) {
        await this.onResponse(payload)
      } else if (isPairwiseConnectionRecordActive(payload)) {
        await this.onActive(payload)
      } else if (isPairwiseConnectionRecordInactive(payload)) {
        await this.onInactive(payload)
      } else if (isPairwiseConnectionRecordError(payload)) {
        await this.onError(payload)
      }
    } else if (message.properties.type === 'aca-basic-message-event') {
      await this.onBasicMessage(message.properties.payload as BasicMessage)
    }
    return 'success'
  }

  abstract onBasicMessage(message: BasicMessage): Promise<void>

  abstract async onInit(message: PairwiseConnectionRecordInit): Promise<void>

  abstract async onInvitation(
    message: PairwiseConnectionRecordInvitation
  ): Promise<void>

  abstract async onRequest(
    message: PairwiseConnectionRecordRequest
  ): Promise<void>

  abstract async onResponse(
    message: PairwiseConnectionRecordResponse
  ): Promise<void>

  abstract async onActive(
    message: PairwiseConnectionRecordActive
  ): Promise<void>

  abstract async onInactive(
    message: PairwiseConnectionRecordInactive
  ): Promise<void>

  abstract async onError(message: PairwiseConnectionRecordError): Promise<void>
}

export { ConnectionEventHandler }
