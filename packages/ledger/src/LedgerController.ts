/*
 * Copyright 2020 ula-aca.
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

import { Configuration, LedgerApi } from '@ula-aca/aries-cloudagent-interface'
import {
  RegisterNymPayload,
  GetVerkeyByDidPayload,
  GetEndpointByDidPayload,
  AcceptTransactionAuthorAgreementPayload,
  isLedgerMessage,
  LedgerMessageTypes
} from './messages'

export default class LedgerController implements Plugin {
  private eventHandler?: EventHandler

  private ledgerApi: LedgerApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.ledgerApi = new LedgerApi(apiConfig)
  }

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name(): string {
    return '@ula-aca/ledger/LedgerController'
  }

  private async registerNym({
    did,
    verkey,
    alias,
    role
  }: RegisterNymPayload): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerRegisterNymPost(
      did,
      verkey,
      alias,
      role
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  private async getVerkeyByDid({
    did
  }: GetVerkeyByDidPayload): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerDidVerkeyGet(did)
    return new UlaResponse({
      statusCode: response.status,
      // TODO: response
      body: {}
    })
  }

  private async getEndpointByDid({
    did
  }: GetEndpointByDidPayload): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerDidEndpointGet(did)
    return new UlaResponse({
      statusCode: response.status,
      // TODO: Response
      body: {}
    })
  }

  private async getTransactionAuthorAgreement(): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerTaaGet()
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async acceptTransactionAuthorAgreement(
    payload: AcceptTransactionAuthorAgreementPayload
  ): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerTaaAcceptPost(payload)
    return new UlaResponse({
      statusCode: response.status,
      // TODO: Response
      body: {}
    })
  }

  async handleEvent(
    message: Message,
    callback: (res: UlaResponse) => Promise<void> | void
  ): Promise<string> {
    if (!isLedgerMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse
    switch (message.properties.type) {
      case LedgerMessageTypes.REGISER_NYM:
        response = await this.registerNym(message.properties.payload)
        break
      case LedgerMessageTypes.GET_VERKEY_BY_DID:
        response = await this.getVerkeyByDid(message.properties.payload)
        break
      case LedgerMessageTypes.GET_ENDPOINT_BY_DID:
        response = await this.getEndpointByDid(message.properties.payload)
        break
      case LedgerMessageTypes.GET_TRANSACTION_AUTHOR_AGREEMENT:
        response = await this.getTransactionAuthorAgreement()
        break
      case LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT:
        response = await this.acceptTransactionAuthorAgreement(
          message.properties.payload
        )
        break
    }

    await callback(response)
    return response.statusCode < 200 || response.statusCode >= 300
      ? 'error'
      : 'success'
  }
}
