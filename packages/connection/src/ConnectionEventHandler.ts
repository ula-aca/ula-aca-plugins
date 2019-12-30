/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin, EventHandler, Message } from 'universal-ledger-agent'
import {
  ConnectionEventBase,
  ConnectionEventInit,
  ConnectionEventState,
  ConnectionEventInvitation,
  ConnectionEventRequest,
  ConnectionEventActive,
  ConnectionEventInactive,
  isConnectionEventInit,
  isConnectionEventInvitation,
  isConnectionEventRequest,
  isConnectionEventResponse,
  ConnectionEventResponse,
  isConnectionEventActive,
  isConnectionEventInactive,
  isConnectionEventError,
  ConnectionEventError
} from '@ula-aca/aca-webhook-event-models'
import BasicMessageEvent from './BasicMessageEvent'

export default abstract class ConnectionEventHandler implements Plugin {
  protected eventHandler: EventHandler

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name() {
    return 'ConnectionEventHandler'
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
      const payload = message.properties.payload as ConnectionEventBase

      if (isConnectionEventInit(payload)) {
        await this.onInit(payload)
      } else if (isConnectionEventInvitation(payload)) {
        await this.onInvitation(payload)
      } else if (isConnectionEventRequest(payload)) {
        await this.onRequest(payload)
      } else if (isConnectionEventResponse(payload)) {
        await this.onResponse(payload)
      } else if (isConnectionEventActive(payload)) {
        await this.onActive(payload)
      } else if (isConnectionEventInactive(payload)) {
        await this.onInactive(payload)
      } else if (isConnectionEventError(payload)) {
        await this.onError(payload)
      }
    } else if (message.properties.type === 'aca-basic-message-event') {
      await this.onBasicMessage(message.properties.payload as BasicMessageEvent)
    }
    return 'success'
  }

  abstract onBasicMessage(message: BasicMessageEvent): Promise<void>

  abstract async onInit(message: ConnectionEventInit): Promise<void>

  abstract async onInvitation(message: ConnectionEventInvitation): Promise<void>

  abstract async onRequest(message: ConnectionEventRequest): Promise<void>

  abstract async onResponse(message: ConnectionEventResponse): Promise<void>

  abstract async onActive(message: ConnectionEventActive): Promise<void>

  abstract async onInactive(message: ConnectionEventInactive): Promise<void>

  abstract async onError(message: ConnectionEventError): Promise<void>
}
