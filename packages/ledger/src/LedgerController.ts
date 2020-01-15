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

import {
  Plugin,
  Message,
  UlaResponse,
  EventHandler
} from 'universal-ledger-agent'

import { Configuration, LedgerApi } from '@ula-aca/aries-cloudagent-interface'
import { AxiosError } from 'axios'
import {
  RegisterNymBody,
  GetVerkeyByDidBody,
  GetEndpointByDidBody,
  AcceptTransactionAuthorAgreementBody,
  isLedgerMessage,
  LedgerMessageTypes,
  AcceptTransactionAuthorAgreementResult
} from './messages'

export default class LedgerController implements Plugin {
  private ledgerApi: LedgerApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.ledgerApi = new LedgerApi(apiConfig)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  initialize(eventHandler: EventHandler): void {}

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
    payload: AcceptTransactionAuthorAgreementBody
  ): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerTaaAcceptPost(payload)

    const body = (response.data as unknown) as AcceptTransactionAuthorAgreementResult

    return new UlaResponse({
      statusCode: response.status,
      body
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

    try {
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
    } catch (err) {
      if (err.response) {
        const axiosErr = err as AxiosError
        response = new UlaResponse({
          statusCode: axiosErr.response.status,
          body: {
            error: axiosErr.response.data
          }
        })
      } else if (err.toJSON) {
        const axiosErr = err as AxiosError
        // couldn't get repsonse
        response = new UlaResponse({
          statusCode: 500,
          body: {
            error: axiosErr.toJSON()
          }
        })
      } else {
        // not an axios error
        response = new UlaResponse({
          statusCode: 500,
          body: {
            error: err
          }
        })
      }
    }

    await callback(response)
    return response.statusCode < 200 || response.statusCode >= 300
      ? 'error'
      : 'success'
  }
}
