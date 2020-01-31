import WebSocket from 'isomorphic-ws'
import {
  Plugin,
  EventHandler,
  Message,
  UlaResponse
} from 'universal-ledger-agent'

import { WebhookEventTypes } from '@ula-aca/webhook-event-models'

import { AriesEvent, AriesEventTopic } from './AriesEvent'
import { WebhookRelayOptions } from './WebhookRelayOptions'

class WebhookRelayEventRouter implements Plugin {
  private options: WebhookRelayOptions

  private eventHandler?: EventHandler

  private websocket: WebSocket

  constructor(options: WebhookRelayOptions) {
    this.options = options
    this.websocket = new WebSocket(this.options.url)
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
    this.websocket.onmessage = this.handleWebsocketMessage.bind(this)
    this.websocket.onopen = this.performHandshake.bind(this)
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

  handleEvent(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _message: Message,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _callback: (res: UlaResponse) => Promise<void> | void
  ): Promise<string> {
    return Promise.resolve('ignored')
  }
}

export { WebhookRelayEventRouter }
