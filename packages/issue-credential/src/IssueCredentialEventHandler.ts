/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Plugin, EventHandler, Message } from 'universal-ledger-agent'
import {
  isCredentialExchangeRecordProposalSent,
  isCredentialExchangeRecordProposalReceived,
  CredentialExchangeRecordProposalSent,
  CredentialExchangeRecordProposalReceived,
  isCredentialExchangeRecordOfferSent,
  CredentialExchangeRecordOfferSent,
  CredentialExchangeRecordOfferReceived,
  CredentialExchangeRecordRequestReceived,
  CredentialExchangeRecordRequestSent,
  isCredentialExchangeRecordRequestSent,
  isCredentialExchangeRecordRequestReceived,
  isCredentialExchangeRecordIssued,
  CredentialExchangeRecordIssued,
  CredentialExchangeRecordStored,
  isCredentialExchangeRecordStored,
  isCredentialExchangeRecordCredentialReceived,
  CredentialExchangeRecordCredentialReceived,
  CredentialExchangeRecordBase
} from '@ula-aca/aca-webhook-event-models'

export default abstract class ConnectionEventHandler implements Plugin {
  protected eventHandler: EventHandler

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name() {
    return '@ula-aca/issue-credential/IssueCredentialEventHandler'
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  async handleEvent(message: Message, _callback: any): Promise<string> {
    if (message.properties.type !== 'aca-issue-credential-event') {
      return 'ignored'
    }

    const payload = message.properties.payload as CredentialExchangeRecordBase

    if (isCredentialExchangeRecordProposalSent(payload)) {
      await this.onProposalSent(payload)
    } else if (isCredentialExchangeRecordProposalReceived(payload)) {
      await this.onProposalReceived(payload)
    } else if (isCredentialExchangeRecordOfferSent(payload)) {
      await this.onOfferSent(payload)
    } else if (isCredentialExchangeRecordRequestSent(payload)) {
      await this.onRequestSent(payload)
    } else if (isCredentialExchangeRecordRequestReceived(payload)) {
      await this.onRequestReceived(payload)
    } else if (isCredentialExchangeRecordIssued(payload)) {
      await this.onIssued(payload)
    } else if (isCredentialExchangeRecordStored(payload)) {
      await this.onStored(payload)
    } else if (isCredentialExchangeRecordCredentialReceived(payload)) {
      await this.onCredentialReceived(payload)
    } else {
      throw Error('unknown connection state')
    }
    return 'success'
  }

  abstract async onProposalSent(
    message: CredentialExchangeRecordProposalSent
  ): Promise<void>

  abstract async onProposalReceived(
    message: CredentialExchangeRecordProposalReceived
  ): Promise<void>

  abstract async onOfferSent(
    message: CredentialExchangeRecordOfferSent
  ): Promise<void>

  abstract async onOfferReceived(
    message: CredentialExchangeRecordOfferReceived
  ): Promise<void>

  abstract async onRequestSent(
    message: CredentialExchangeRecordRequestSent
  ): Promise<void>

  abstract async onRequestReceived(
    message: CredentialExchangeRecordRequestReceived
  ): Promise<void>

  abstract async onIssued(
    message: CredentialExchangeRecordIssued
  ): Promise<void>

  abstract async onStored(
    message: CredentialExchangeRecordStored
  ): Promise<void>

  abstract async onCredentialReceived(
    message: CredentialExchangeRecordCredentialReceived
  ): Promise<void>
}
