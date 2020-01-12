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
    return 'WebhookRelayEventRouter'
  }

  private async handleWebsocketMessage(
    msg: WebSocket.MessageEvent
  ): Promise<void> {
    const event: AriesEvent = JSON.parse(msg.data.toString())
    let ulaMsgType: string

    switch (event.topic) {
      case AriesEventTopic.CONNECTIONS:
        ulaMsgType = 'aca-connection-event'
        break
      case AriesEventTopic.BASIC_MESSAGE:
        ulaMsgType = 'aca-basic-message-event'
        break
      case AriesEventTopic.ISSUE_CREDENTIAL:
        ulaMsgType = 'aca-issue-credential-event'
        break
      case AriesEventTopic.PRESENT_PROOF:
        ulaMsgType = 'aca-present-proof-event'
        break
      default:
        break
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await this.eventHandler.processMsg(
      {
        type: ulaMsgType,
        payload: event.payload
      },
      () => {}
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEvent(_message: Message, _callback: any): Promise<string> {
    return Promise.resolve('ignored')
  }
}
