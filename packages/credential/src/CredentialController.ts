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

import { UlaResponse, Message } from 'universal-ledger-agent'

import { CredentialsApi } from '@ula-aca/aries-cloudagent-interface'
import {
  AcaControllerPlugin,
  AcaControllerPluginOptions,
  UlaCallback
} from '@ula-aca/core'

import {
  GetCredentialsBody,
  isCredentialMessage,
  GetCredentialByIdBody,
  CredentialMessageTypes,
  RemoveCredentialBody,
  GetCredentialByIdResult
} from './messages'

class CredentialController extends AcaControllerPlugin {
  private credentialApi: CredentialsApi

  constructor(options?: AcaControllerPluginOptions) {
    super(options)

    this.credentialApi = new CredentialsApi(this.apiConfig)
  }

  get name(): string {
    return '@ula-aca/credential/CredentialController'
  }

  private async getCredentials({
    start,
    count,
    wql
  }: GetCredentialsBody = {}): Promise<UlaResponse> {
    const response = await this.credentialApi.credentialsGet(start, count, wql)

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getCredentialById({
    credential_id
  }: GetCredentialByIdBody): Promise<UlaResponse> {
    const response = await this.credentialApi.credentialIdGet(credential_id)

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async removeCredential({
    credential_id
  }: RemoveCredentialBody): Promise<UlaResponse> {
    const response = await this.credentialApi.credentialIdRemovePost(
      credential_id
    )

    const result = (response.data as unknown) as GetCredentialByIdResult

    return new UlaResponse({
      statusCode: response.status,
      body: result
    })
  }

  @AcaControllerPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (!isCredentialMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    switch (message.properties.type) {
      case CredentialMessageTypes.GET_CREDENTIALS:
        response = await this.getCredentials(message.properties.body)
        break
      case CredentialMessageTypes.GET_CREDENTIAL_BY_ID:
        response = await this.getCredentialById(message.properties.body)
        break
      case CredentialMessageTypes.REMOVE_CREDENTIAL:
        response = await this.removeCredential(message.properties.body)
        break
    }

    callback(response)
    return 'success'
  }
}

export { CredentialController }
