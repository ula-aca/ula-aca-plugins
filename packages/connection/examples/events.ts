import {
  BasicMessage,
  PairwiseConnectionRecordInit,
  PairwiseConnectionRecordInvitation,
  PairwiseConnectionRecordRequest,
  PairwiseConnectionRecordResponse,
  PairwiseConnectionRecordActive,
  PairwiseConnectionRecordInactive,
  PairwiseConnectionRecordError
} from '@ula-aca/aca-webhook-event-models'
import { UlaResponse } from 'universal-ledger-agent'
import { logEvent, logWebhookEvent } from '@ula-aca/test-utils'
import {
  ConnectionEventHandler,
  ConnectionMessageTypes,
  AcceptInvitationBody,
  AcceptInvitationMessage,
  AcceptRequestBody,
  AcceptRequestMessage,
  SendBasicMessageBody,
  SendBasicMessageMessage
} from '../src'

class ExampleConnectionEventHandler extends ConnectionEventHandler {
  constructor(private label: string) {
    super()
  }

  async onBasicMessage(message: BasicMessage): Promise<void> {
    logWebhookEvent({ type: `${this.label} | onBasicMessage`, input: message })

    return Promise.resolve()
  }

  async onInit(message: PairwiseConnectionRecordInit): Promise<void> {
    logWebhookEvent({ type: `${this.label} | onInit`, input: message })

    return Promise.resolve()
  }

  async onInvitation(
    message: PairwiseConnectionRecordInvitation
  ): Promise<void> {
    logWebhookEvent({ type: `${this.label} | onInvitation`, input: message })

    if (message.initiator !== 'self') {
      const body: AcceptInvitationBody = {
        connection_id: message.connection_id
      }

      await this.eventHandler.processMsg(
        {
          type: ConnectionMessageTypes.ACCEPT_INVITATION,
          body
        } as AcceptInvitationMessage,
        (res: UlaResponse) => {
          logEvent({
            type: ConnectionMessageTypes.ACCEPT_INVITATION,
            comment: `Invitation accepted from within ${this.label} OnInvitation event handler`,
            input: body,
            output: res.body
          })
        }
      )
    }
    return Promise.resolve()
  }

  async onRequest(message: PairwiseConnectionRecordRequest): Promise<void> {
    logWebhookEvent({ type: `${this.label} | onRequest`, input: message })

    if (message.initiator === 'self') {
      const body: AcceptRequestBody = {
        connection_id: message.connection_id
      }

      await this.eventHandler.processMsg(
        {
          type: ConnectionMessageTypes.ACCEPT_REQUEST,
          body
        } as AcceptRequestMessage,
        (res: UlaResponse) => {
          logEvent({
            type: ConnectionMessageTypes.ACCEPT_REQUEST,
            comment: `Request accepted from within ${this.label} onRequest event handler`,
            input: body,
            output: res.body
          })
        }
      )
    }

    return Promise.resolve()
  }

  async onResponse(message: PairwiseConnectionRecordResponse): Promise<void> {
    logWebhookEvent({ type: `${this.label} | onResponse`, input: message })

    if (message.initiator !== 'self') {
      const body: SendBasicMessageBody = {
        connection_id: message.connection_id,
        content: `Hello, I am ${this.label}`
      }

      await this.eventHandler.processMsg(
        {
          type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
          body
        } as SendBasicMessageMessage,
        (res: UlaResponse) => {
          logEvent({
            type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
            comment: `Message send from within ${this.label} onResponse event handler`,
            input: body,
            output: res.body
          })
        }
      )
    }

    return Promise.resolve()
  }

  async onActive(message: PairwiseConnectionRecordActive): Promise<void> {
    logWebhookEvent({ type: `${this.label} | onActive`, input: message })

    return Promise.resolve()
  }

  async onInactive(message: PairwiseConnectionRecordInactive): Promise<void> {
    logWebhookEvent({ type: `${this.label} | onInactive`, input: message })

    return Promise.resolve()
  }

  async onError(message: PairwiseConnectionRecordError): Promise<void> {
    logWebhookEvent({ type: `${this.label} | onError`, input: message })

    return Promise.resolve()
  }
}

export { ExampleConnectionEventHandler }
