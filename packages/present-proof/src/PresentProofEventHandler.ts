/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin, EventHandler, Message } from 'universal-ledger-agent'
import PresentationExchangeRecord from './PresentationExchangeRecord'

enum PresentationExchangeRecordState {
  PROPOSAL_SENT = 'proposal_sent',
  PROPOSAL_RECEIVED = 'proposal_received',
  REQUEST_SENT = 'request_sent',
  REQUEST_RECEIVED = 'request_received',
  PRESENTATION_SENT = 'presentation_sent',
  PRESENTATION_RECEIVED = 'presentation_received',
  VERIFIED = 'verified'
}

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
    if (message.properties.type !== 'aca-present-proof-event') {
      return 'ignored'
    }
    const payload = message.properties.payload as PresentationExchangeRecord

    switch (payload.state) {
      case PresentationExchangeRecordState.PROPOSAL_SENT:
        await this.onProposalSend(payload)
        break
      case PresentationExchangeRecordState.PROPOSAL_RECEIVED:
        await this.onProposalReceived(payload)
        break
      case PresentationExchangeRecordState.REQUEST_SENT:
        await this.onRequestSent(payload)
        break
      case PresentationExchangeRecordState.REQUEST_RECEIVED:
        await this.onRequestReceived(payload)
        break
      case PresentationExchangeRecordState.PRESENTATION_SENT:
        await this.onPresentationSent(payload)
        break
      case PresentationExchangeRecordState.PRESENTATION_RECEIVED:
        await this.onPresentationReceived(payload)
        break
      case PresentationExchangeRecordState.VERIFIED:
        await this.onVerified(payload)
        break
      default:
        throw Error('unknown connection state')
    }
    return 'success'
  }

  abstract async onProposalSend(
    message: PresentationExchangeRecord
  ): Promise<void>

  abstract async onProposalReceived(
    message: PresentationExchangeRecord
  ): Promise<void>

  abstract async onRequestSent(
    message: PresentationExchangeRecord
  ): Promise<void>

  abstract async onRequestReceived(
    message: PresentationExchangeRecord
  ): Promise<void>

  abstract async onPresentationSent(
    message: PresentationExchangeRecord
  ): Promise<void>

  abstract async onPresentationReceived(
    message: PresentationExchangeRecord
  ): Promise<void>

  abstract async onVerified(message: PresentationExchangeRecord): Promise<void>
}
