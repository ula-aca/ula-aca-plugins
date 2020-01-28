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

import { Configuration, WalletApi } from '@ula-aca/aries-cloudagent-interface'
import { AxiosError } from 'axios'
import {
  GetDidsBody,
  AssignPublicDidBody,
  GetTagPolicyBody,
  SetTagPolicyBody,
  isWalletMessage,
  WalletMessageTypes,
  SetTagPolicyResult
} from './messages'

class WalletController implements Plugin {
  private walletApi: WalletApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.walletApi = new WalletApi(apiConfig)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  initialize(_eventHandler: EventHandler): void {}

  get name(): string {
    return '@ula-aca/wallet/WalletController'
  }

  private async getDids({
    did,
    verkey,
    public: _public
  }: GetDidsBody = {}): Promise<UlaResponse> {
    const response = await this.walletApi.walletDidGet(did, verkey, _public)

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createLocalDid(): Promise<UlaResponse> {
    const response = await this.walletApi.walletDidCreatePost()

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async fetchPublicDid(): Promise<UlaResponse> {
    const response = await this.walletApi.walletDidPublicGet()

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async assignPublicDid({
    did
  }: AssignPublicDidBody): Promise<UlaResponse> {
    const response = await this.walletApi.walletDidPublicPost(did)

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getTagPolicy({
    credential_definition_id
  }: GetTagPolicyBody): Promise<UlaResponse> {
    const response = await this.walletApi.walletTagPolicyIdGet(
      credential_definition_id
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async setTagPolicy({
    credential_definition_id,
    taggables
  }: SetTagPolicyBody): Promise<UlaResponse> {
    const response = await this.walletApi.walletTagPolicyIdPost(
      credential_definition_id,
      { taggables }
    )

    const result = (response.data as unknown) as SetTagPolicyResult

    return new UlaResponse({
      statusCode: response.status,
      body: result
    })
  }

  async handleEvent(
    message: Message,
    callback: (res: UlaResponse) => Promise<void> | void
  ): Promise<string> {
    if (!isWalletMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    try {
      switch (message.properties.type) {
        case WalletMessageTypes.GET_DIDS:
          response = await this.getDids(message.properties.body)
          break
        case WalletMessageTypes.CREATE_LOCAL_DID:
          response = await this.createLocalDid()
          break
        case WalletMessageTypes.FETCH_PUBLIC_DID:
          response = await this.fetchPublicDid()
          break
        case WalletMessageTypes.ASSIGN_PUBLIC_DID:
          response = await this.assignPublicDid(message.properties.body)
          break
        case WalletMessageTypes.GET_TAG_POLICY:
          response = await this.getTagPolicy(message.properties.body)
          break
        case WalletMessageTypes.SET_TAG_POLICY:
          response = await this.setTagPolicy(message.properties.body)
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
      } else if (axiosErr.toJSON) {
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

export { WalletController }
