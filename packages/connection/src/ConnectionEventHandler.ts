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
  isPairwiseConnectionRecordInit,
  PairwiseConnectionRecordInit,
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
  PairwiseConnectionRecordError,
  isConnectionEventMessage,
  isBasicMessageEventMessage
} from '@ula-aca/webhook-event-models'

abstract class ConnectionEventHandler extends AcaEventPlugin {
  get name(): string {
    return '@ula-aca/connection/ConnectionEventHandler'
  }

  @AcaEventPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (
      !isConnectionEventMessage(message.properties) &&
      !isBasicMessageEventMessage(message.properties)
    ) {
      return 'ignored'
    }

    if (isConnectionEventMessage(message.properties)) {
      const { body } = message.properties

      if (isPairwiseConnectionRecordInit(body)) {
        await this.onInit(body)
      } else if (isPairwiseConnectionRecordInvitation(body)) {
        await this.onInvitation(body)
      } else if (isPairwiseConnectionRecordRequest(body)) {
        await this.onRequest(body)
      } else if (isPairwiseConnectionRecordResponse(body)) {
        await this.onResponse(body)
      } else if (isPairwiseConnectionRecordActive(body)) {
        await this.onActive(body)
      } else if (isPairwiseConnectionRecordInactive(body)) {
        await this.onInactive(body)
      } else if (isPairwiseConnectionRecordError(body)) {
        await this.onError(body)
      } else {
        throw new Error(`Unknown state: ${body.state}`)
      }
    } else {
      await this.onBasicMessage(message.properties.body)
    }

    const response = new UlaResponse({ statusCode: 200, body: {} })

    callback(response)
    return 'success'
  }

  abstract async onBasicMessage(message: BasicMessage): Promise<void>

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
