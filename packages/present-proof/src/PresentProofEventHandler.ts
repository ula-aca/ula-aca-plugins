/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin, EventHandler, Message } from 'universal-ledger-agent'
import {
  PresentProofEventBase,
  isPresentProofEventProposalSent,
  isPresentProofEventProposalReceived,
  isPresentProofEventRequestSent,
  isPresentProofEventRequestReceived,
  isPresentProofEventPresentationSent,
  isPresentProofEventPresentationReceived,
  isPresentProofEventVerified,
  PresentProofEventProposalSent,
  PresentProofEventProposalReceived,
  PresentProofEventRequestSent,
  PresentProofEventRequestReceived,
  PresentProofEventPresentationSent,
  PresentProofEventPresentationReceived,
  PresentProofEventVerified
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

    const payload = message.properties.payload as PresentProofEventBase

    if (isPresentProofEventProposalSent(payload)) {
      await this.onProposalSent(payload)
    } else if (isPresentProofEventProposalReceived(payload)) {
      await this.onProposalReceived(payload)
    } else if (isPresentProofEventRequestSent(payload)) {
      await this.onRequestSent(payload)
    } else if (isPresentProofEventRequestReceived(payload)) {
      await this.onRequestReceived(payload)
    } else if (isPresentProofEventPresentationSent(payload)) {
      await this.onPresentationSent(payload)
    } else if (isPresentProofEventPresentationReceived(payload)) {
      await this.onPresentationReceived(payload)
    } else if (isPresentProofEventVerified(payload)) {
      await this.onVerified(payload)
    } else {
      throw Error('unknown connection state')
    }
    return 'success'
  }

  abstract async onProposalSent(
    message: PresentProofEventProposalSent
  ): Promise<void>

  abstract async onProposalReceived(
    message: PresentProofEventProposalReceived
  ): Promise<void>

  abstract async onRequestSent(
    message: PresentProofEventRequestSent
  ): Promise<void>

  abstract async onRequestReceived(
    message: PresentProofEventRequestReceived
  ): Promise<void>

  abstract async onPresentationSent(
    message: PresentProofEventPresentationSent
  ): Promise<void>

  abstract async onPresentationReceived(
    message: PresentProofEventPresentationReceived
  ): Promise<void>

  abstract async onVerified(message: PresentProofEventVerified): Promise<void>
}
