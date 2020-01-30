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

import { WalletApi } from '@ula-aca/aries-cloudagent-interface'
import {
  AcaControllerPlugin,
  AcaControllerPluginOptions,
  UlaCallback
} from '@ula-aca/core'

import {
  GetDidsBody,
  AssignPublicDidBody,
  GetTagPolicyBody,
  SetTagPolicyBody,
  isWalletMessage,
  WalletMessageTypes,
  SetTagPolicyResult
} from './messages'

class WalletController extends AcaControllerPlugin {
  private walletApi: WalletApi

  constructor(options?: AcaControllerPluginOptions) {
    super(options)

    this.walletApi = new WalletApi(this.apiConfig)
  }

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

  @AcaControllerPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (!isWalletMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

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

    callback(response)
    return 'success'
  }
}

export { WalletController }
