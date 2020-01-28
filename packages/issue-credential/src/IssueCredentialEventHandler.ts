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

import {
  Plugin,
  EventHandler,
  Message,
  UlaResponse
} from 'universal-ledger-agent'
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
  isCredentialExchangeRecordCredentialReceived,
  CredentialExchangeRecordCredentialReceived,
  isCredentialExchangeRecordOfferReceived,
  CredentialExchangeRecordCredentialAcknowledged,
  isCredentialExchangeRecordCredentialAcknowledged,
  isIssueCredentialEventMessage
} from '@ula-aca/webhook-event-models'

abstract class IssueCredentialEventHandler implements Plugin {
  protected eventHandler?: EventHandler

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name(): string {
    return '@ula-aca/issue-credential/IssueCredentialEventHandler'
  }

  async handleEvent(
    message: Message,
    callback: (res: UlaResponse) => Promise<void> | void
  ): Promise<string> {
    if (!isIssueCredentialEventMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    try {
      const { body } = message.properties

      if (isCredentialExchangeRecordProposalSent(body)) {
        await this.onProposalSent(body)
      } else if (isCredentialExchangeRecordProposalReceived(body)) {
        await this.onProposalReceived(body)
      } else if (isCredentialExchangeRecordOfferSent(body)) {
        await this.onOfferSent(body)
      } else if (isCredentialExchangeRecordOfferReceived(body)) {
        await this.onOfferReceived(body)
      } else if (isCredentialExchangeRecordRequestSent(body)) {
        await this.onRequestSent(body)
      } else if (isCredentialExchangeRecordRequestReceived(body)) {
        await this.onRequestReceived(body)
      } else if (isCredentialExchangeRecordIssued(body)) {
        await this.onIssued(body)
      } else if (isCredentialExchangeRecordCredentialAcknowledged(body)) {
        await this.onCredentialAcknowledged(body)
      } else if (isCredentialExchangeRecordCredentialReceived(body)) {
        await this.onCredentialReceived(body)
      } else {
        throw new Error(`Unknown state: ${body.state}`)
      }
      response = new UlaResponse({ statusCode: 200, body: {} })
    } catch (err) {
      response = new UlaResponse({
        statusCode: 500,
        body: {
          error: err
        }
      })
    }

    callback(response)

    return response.statusCode < 200 || response.statusCode >= 300
      ? 'error'
      : 'success'
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

  abstract async onCredentialAcknowledged(
    message: CredentialExchangeRecordCredentialAcknowledged
  ): Promise<void>

  abstract async onCredentialReceived(
    message: CredentialExchangeRecordCredentialReceived
  ): Promise<void>
}

export { IssueCredentialEventHandler }
