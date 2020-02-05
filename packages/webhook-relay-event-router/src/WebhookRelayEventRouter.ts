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

import WebSocket from 'isomorphic-ws'
import { Plugin, EventHandler } from 'universal-ledger-agent'

import { WebhookEventTypes } from '@ula-aca/webhook-event-models'

import { AriesEvent, AriesEventTopic } from './AriesEvent'
import { WebhookRelayOptions } from './WebhookRelayOptions'

class WebhookRelayEventRouter implements Plugin {
  private options: WebhookRelayOptions

  private eventHandler?: EventHandler

  private websocket!: WebSocket

  constructor(options: WebhookRelayOptions) {
    this.options = options
  }

  private performHandshake(): void {
    const handshakeMsg = {
      auth: this.options.apiKey,
      fastForward: this.options.fastForward
    }
    this.websocket.send(JSON.stringify(handshakeMsg))
  }

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
    this.websocket = new WebSocket(this.options.url)
    this.websocket.onopen = this.performHandshake.bind(this)
    this.websocket.onmessage = this.handleWebsocketMessage.bind(this)
  }

  get name(): string {
    return '@ula-aca/webhook-relay-event-router/WebhookRelayEventRouter'
  }

  private async handleWebsocketMessage(
    msg: WebSocket.MessageEvent
  ): Promise<void> {
    const event: AriesEvent = JSON.parse(msg.data.toString())
    let ulaMsgType: string

    switch (event.topic) {
      case AriesEventTopic.CONNECTIONS:
        ulaMsgType = WebhookEventTypes.CONNECTION_EVENT
        break
      case AriesEventTopic.BASIC_MESSAGE:
        ulaMsgType = WebhookEventTypes.BASIC_MESSAGE_EVENT
        break
      case AriesEventTopic.ISSUE_CREDENTIAL:
        ulaMsgType = WebhookEventTypes.ISSUE_CREDENTIAL_EVENT
        break
      case AriesEventTopic.PRESENT_PROOF:
        ulaMsgType = WebhookEventTypes.PRESENT_PROOF_EVENT
        break
    }
    // TODO: If the eventHandler isn't initialized yet the event is not processed
    if (this.eventHandler && ulaMsgType) {
      await this.eventHandler.processMsg(
        {
          type: ulaMsgType,
          body: event.body
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      )
    }
  }

  handleEvent(): Promise<string> {
    return Promise.resolve('ignored')
  }
}

export { WebhookRelayEventRouter }
