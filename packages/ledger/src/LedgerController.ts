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
  EventHandler,
  Message,
  UlaResponse
} from 'universal-ledger-agent'

import { Configuration, LedgerApi } from '@ula-aca/aries-cloudagent-interface'
import { AxiosError } from 'axios'
import {
  RegisterNymBody,
  RegisterNymResult,
  GetVerkeyByDidBody,
  GetEndpointByDidBody,
  AcceptTransactionAuthorAgreementBody,
  isLedgerMessage,
  LedgerMessageTypes,
  GetVerkeyByDidResult,
  GetEndpointByDidResult
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
  }: RegisterNymBody): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerRegisterNymPost(
      did,
      verkey,
      alias,
      role
    )

    // The generated API does not provide the correct response typing
    const body = (response.data as unknown) as RegisterNymResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async getVerkeyByDid({
    did
  }: GetVerkeyByDidBody): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerDidVerkeyGet(did)

    // The generated API does not provide the correct response typing
    const body = (response.data as unknown) as GetVerkeyByDidResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async getEndpointByDid({
    did
  }: GetEndpointByDidBody): Promise<UlaResponse> {
    const response = await this.ledgerApi.ledgerDidEndpointGet(did)

    // The generated API does not provide the correct response typing
    const body = (response.data as unknown) as GetEndpointByDidResult

    return new UlaResponse({
      statusCode: response.status,
      body
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

    // The generated API does not provide the correct response typing
    // TODO: change any when return type is known
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (response.data as unknown) as any

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
      const axiosErr = err as AxiosError

      if (axiosErr.response) {
        response = new UlaResponse({
          statusCode: axiosErr.response.status,
          body: {
            error: axiosErr.response.data
          }
        })
      } else {
        // couldn't get repsonse
        response = new UlaResponse({
          statusCode: 500,
          body: {
            error: axiosErr.toJSON()
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
