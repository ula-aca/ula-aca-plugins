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

import { Plugin, EventHandler } from 'universal-ledger-agent'
import { AcaWebhookEventTypes } from '@ula-aca/aca-webhook-event-models'
import WebSocket from 'isomorphic-ws'

import { AriesEvent, AriesEventTopic } from './AriesEvent'

export default class WebhookRelayEventRouter implements Plugin {
  private eventHandler?: EventHandler

  private websocket: WebSocket

  constructor(webhookRelayUrl: string, options: WebSocket.ClientOptions) {
    this.websocket = new WebSocket(webhookRelayUrl, options)
    this.websocket.onmessage = this.handleWebsocketMessage.bind(this)
  }

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name(): string {
    return '@ula-aca/webhook-relay-event-router/WebhookRelayEventRouter'
  }

  private async handleWebsocketMessage(
    msg: WebSocket.MessageEvent
  ): Promise<void> {
    const event: AriesEvent = JSON.parse(msg.data.toString())
    let ulaMsgType: string

    // TODO: Switch to webhook-models types and messages

    switch (event.topic) {
      case AriesEventTopic.CONNECTIONS:
        ulaMsgType = AcaWebhookEventTypes.CONNECTION_EVENT
        break
      case AriesEventTopic.BASIC_MESSAGE:
        ulaMsgType = AcaWebhookEventTypes.BASIC_MESSAGE_EVENT
        break
      case AriesEventTopic.ISSUE_CREDENTIAL:
        ulaMsgType = AcaWebhookEventTypes.ISSUE_CREDENTIAL_EVENT
        break
      case AriesEventTopic.PRESENT_PROOF:
        ulaMsgType = AcaWebhookEventTypes.PRESENT_PROOF_EVENT
        break
      default:
        break
    }

    await this.eventHandler.processMsg(
      {
        type: ulaMsgType,
        payload: event.payload
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    )
  }

  handleEvent(): Promise<string> {
    return Promise.resolve('ignored')
  }
}
