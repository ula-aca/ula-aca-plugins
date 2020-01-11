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

import {
  Configuration,
  CredentialDefinitionApi
} from '@ula-aca/aries-cloudagent-interface'
import { AxiosError } from 'axios'
import {
  GetCreatedCredentialDefinitionsPayload,
  CreateCredentialDefinitionPayload,
  isCredentialDefinitionMessage,
  CredentialDefinitionMessageTypes
} from './messages'

export default class CredentialDefinitionController implements Plugin {
  private eventHandler?: EventHandler

  private credentialDefinitionApi: CredentialDefinitionApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.credentialDefinitionApi = new CredentialDefinitionApi(apiConfig)
  }

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name(): string {
    return '@ula-aca/credential-definition/CredentialDefinitionController'
  }

  private async getCredentialDefinitionById(
    credentialDefinitionId: string
  ): Promise<UlaResponse> {
    const response = await this.credentialDefinitionApi.credentialDefinitionsIdGet(
      credentialDefinitionId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getCreatedCredentialDefinitions({
    schemaId,
    schemaIssuerDid,
    schemaName,
    schemaVersion,
    issuerDid,
    credentialDefinitionId
  }: GetCreatedCredentialDefinitionsPayload = {}): Promise<UlaResponse> {
    const response = await this.credentialDefinitionApi.credentialDefinitionsCreatedGet(
      schemaId,
      schemaIssuerDid,
      schemaName,
      schemaVersion,
      issuerDid,
      credentialDefinitionId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createCredentialDefinition({
    tag,
    schemaId
  }: CreateCredentialDefinitionPayload): Promise<UlaResponse> {
    const response = await this.credentialDefinitionApi.credentialDefinitionsPost(
      {
        schema_id: schemaId,
        tag
      }
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  async handleEvent(
    message: Message,
    callback: (res: UlaResponse) => Promise<void> | void
  ): Promise<string> {
    if (!isCredentialDefinitionMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    try {
      switch (message.properties.type) {
        case CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION:
          response = await this.createCredentialDefinition(
            message.properties.payload
          )
          break
        case CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS:
          response = await this.getCreatedCredentialDefinitions(
            message.properties.payload
          )
          break
        case CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID:
          response = await this.getCredentialDefinitionById(
            message.properties.payload.credentialDefinitionId
          )
          break
      }
    } catch (err) {
      const axiosErr = err as AxiosError

      response = new UlaResponse({
        statusCode: axiosErr.response.status,
        body: {
          error: axiosErr.response.data
        }
      })
    }

    await callback(response)
    return response.statusCode < 200 || response.statusCode >= 300
      ? 'error'
      : 'success'
  }
}
