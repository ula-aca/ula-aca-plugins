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

abstract class IssueCredentialEventHandler implements Plugin {
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

export { IssueCredentialEventHandler }
