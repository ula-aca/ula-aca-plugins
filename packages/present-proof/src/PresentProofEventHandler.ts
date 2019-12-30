/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin, EventHandler, Message } from 'universal-ledger-agent'
import {
  isPresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalReceived,
  isPresentationExchangeRecordProposalReceived,
  isPresentationExchangeRecordRequestSent,
  isPresentationExchangeRecordRequestReceived,
  isPresentationExchangeRecordPresentationSent,
  isPresentationExchangeRecordPresentationReceived,
  PresentationExchangeRecordRequestSent,
  PresentationExchangeRecordRequestReceived,
  PresentationExchangeRecordPresentationSent,
  PresentationExchangeRecordVerified,
  isPresentationExchangeRecordVerified,
  PresentationExchangeRecordPresentationReceived,
  PresentationExchangeRecordBase
} from '@ula-aca/aca-webhook-event-models'

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

    const payload = message.properties.payload as PresentationExchangeRecordBase

    if (isPresentationExchangeRecordProposalSent(payload)) {
      await this.onProposalSent(payload)
    } else if (isPresentationExchangeRecordProposalReceived(payload)) {
      await this.onProposalReceived(payload)
    } else if (isPresentationExchangeRecordRequestSent(payload)) {
      await this.onRequestSent(payload)
    } else if (isPresentationExchangeRecordRequestReceived(payload)) {
      await this.onRequestReceived(payload)
    } else if (isPresentationExchangeRecordPresentationSent(payload)) {
      await this.onPresentationSent(payload)
    } else if (isPresentationExchangeRecordPresentationReceived(payload)) {
      await this.onPresentationReceived(payload)
    } else if (isPresentationExchangeRecordVerified(payload)) {
      await this.onVerified(payload)
    } else {
      throw Error('unknown connection state')
    }
    return 'success'
  }

  abstract async onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void>

  abstract async onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void>

  abstract async onRequestSent(
    message: PresentationExchangeRecordRequestSent
  ): Promise<void>

  abstract async onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void>

  abstract async onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void>

  abstract async onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void>

  abstract async onVerified(
    message: PresentationExchangeRecordVerified
  ): Promise<void>
}
