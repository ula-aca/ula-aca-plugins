/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin, EventHandler, Message } from 'universal-ledger-agent'
import ConnectionEvent from './ConnectionEvent'
import BasicMessageEvent from './BasicMessageEvent'

enum ConnectionStates {
  INIT = 'init',
  INVITATION = 'invitation',
  REQUEST = 'request',
  RESPONSE = 'response',
  ACTIVE = 'active',
  ERROR = 'error',
  INACTIVE = 'inactive'
}

export default abstract class ConnectionEventHandler implements Plugin {
  private eventHandler: EventHandler

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
      return
    }

    if (message.properties.type === 'aca-connection-event') {
      const payload = message.properties.payload as ConnectionEvent

      switch (payload.state) {
        case ConnectionStates.INIT:
          await this.onInit(payload)
          break
        case ConnectionStates.INVITATION:
          await this.onInvitation(payload)
          break
        case ConnectionStates.REQUEST:
          await this.onRequest(payload)
          break
        case ConnectionStates.RESPONSE:
          await this.onResponse(payload)
          break
        case ConnectionStates.ACTIVE:
          await this.onActive(payload)
          break
        case ConnectionStates.ERROR:
          await this.onError(payload)
          break
        case ConnectionStates.INACTIVE:
          await this.onInactive(payload)
          break
        default:
          throw Error('unknown connection state')
      }
    } else if (message.properties.type === 'aca-basic-message-event') {
      await this.onBasicMessage(message.properties.payload as BasicMessageEvent)
    }
  }

  abstract onBasicMessage(message: BasicMessageEvent): Promise<void>

  abstract async onInit(message: ConnectionEvent): Promise<void>

  abstract async onInvitation(message: ConnectionEvent): Promise<void>

  abstract async onRequest(message: ConnectionEvent): Promise<void>

  abstract async onResponse(message: ConnectionEvent): Promise<void>

  abstract async onActive(message: ConnectionEvent): Promise<void>

  abstract async onError(message: ConnectionEvent): Promise<void>

  abstract async onInactive(message: ConnectionEvent): Promise<void>
}
