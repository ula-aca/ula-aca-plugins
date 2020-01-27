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

import {
  Configuration,
  CredentialsApi
} from '@ula-aca/aries-cloudagent-interface'
import { AxiosError } from 'axios'
import {
  GetCredentialsBody,
  isCredentialMessage,
  GetCredentialByIdBody,
  CredentialMessageTypes,
  RemoveCredentialBody,
  GetCredentialByIdResult
} from './messages'

class CredentialController implements Plugin {
  private credentialApi: CredentialsApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.credentialApi = new CredentialsApi(apiConfig)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  initialize(eventHandler: EventHandler): void {}

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

  async handleEvent(
    message: Message,
    callback: (res: UlaResponse) => Promise<void> | void
  ): Promise<string> {
    if (!isCredentialMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    try {
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

export { CredentialController }
