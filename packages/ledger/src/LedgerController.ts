/*
 * Copyright 2020-present ula-aca
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

import { Message, UlaResponse } from 'universal-ledger-agent'

import { LedgerApi } from '@ula-aca/aries-cloudagent-interface'
import {
  AcaControllerPlugin,
  AcaControllerPluginOptions,
  UlaCallback
} from '@ula-aca/core'

import {
  RegisterNymBody,
  GetVerkeyByDidBody,
  GetEndpointByDidBody,
  AcceptTransactionAuthorAgreementBody,
  isLedgerMessage,
  LedgerMessageTypes,
  AcceptTransactionAuthorAgreementResult
} from './messages'

class LedgerController extends AcaControllerPlugin {
  private ledgerApi: LedgerApi

  constructor(options?: AcaControllerPluginOptions) {
    super(options)

    this.ledgerApi = new LedgerApi(this.apiConfig)
  }

  get name(): string {
    return '@ula-aca/ledger/LedgerController'
  }

  private async registerNym({
    did,
    verkey,
    alias,
    role
  }: RegisterNymBody): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerRegisterNymPost(
      did,
      verkey,
      alias,
      role
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getVerkeyByDid({
    did
  }: GetVerkeyByDidBody): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerDidVerkeyGet(did)

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getEndpointByDid({
    did
  }: GetEndpointByDidBody): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerDidEndpointGet(did)

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
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
    body?: AcceptTransactionAuthorAgreementBody
  ): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerTaaAcceptPost(body)

    const result = (response.data as unknown) as AcceptTransactionAuthorAgreementResult

    return new UlaResponse({
      statusCode: response.status,
      body: result
    })
  }

  @AcaControllerPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (!isLedgerMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    switch (message.properties.type) {
      case LedgerMessageTypes.REGISER_NYM:
        response = await this.registerNym(message.properties.body)
        break
      case LedgerMessageTypes.GET_VERKEY_BY_DID:
        response = await this.getVerkeyByDid(message.properties.body)
        break
      case LedgerMessageTypes.GET_ENDPOINT_BY_DID:
        response = await this.getEndpointByDid(message.properties.body)
        break
      case LedgerMessageTypes.GET_TRANSACTION_AUTHOR_AGREEMENT:
        response = await this.getTransactionAuthorAgreement()
        break
      case LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT:
        response = await this.acceptTransactionAuthorAgreement(
          message.properties.body
        )
        break
    }

    callback(response)
    return 'success'
  }
}

export { LedgerController }
