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

import { CredentialDefinitionApi } from '@ula-aca/aries-cloudagent-interface'
import {
  AcaControllerPlugin,
  AcaControllerPluginOptions,
  UlaCallback
} from '@ula-aca/core'

import {
  GetCreatedCredentialDefinitionsBody,
  CreateCredentialDefinitionBody,
  isCredentialDefinitionMessage,
  CredentialDefinitionMessageTypes,
  GetCredentialDefinitionByIdBody
} from './messages'

class CredentialDefinitionController extends AcaControllerPlugin {
  private credentialDefinitionApi: CredentialDefinitionApi

  constructor(options?: AcaControllerPluginOptions) {
    super(options)

    this.credentialDefinitionApi = new CredentialDefinitionApi(this.apiConfig)
  }

  get name(): string {
    return '@ula-aca/credential-definition/CredentialDefinitionController'
  }

  private async getCredentialDefinitionById({
    credential_definition_id
  }: GetCredentialDefinitionByIdBody): Promise<UlaResponse> {
    const response = await this.credentialDefinitionApi.credentialDefinitionsIdGet(
      credential_definition_id
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getCreatedCredentialDefinitions({
    schema_id,
    schema_issuer_did,
    schema_name,
    schema_version,
    issuer_did,
    credential_definition_id
  }: GetCreatedCredentialDefinitionsBody = {}): Promise<UlaResponse> {
    const response = await this.credentialDefinitionApi.credentialDefinitionsCreatedGet(
      schema_id,
      schema_issuer_did,
      schema_name,
      schema_version,
      issuer_did,
      credential_definition_id
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createCredentialDefinition(
    body: CreateCredentialDefinitionBody
  ): Promise<UlaResponse> {
    const response = await this.credentialDefinitionApi.credentialDefinitionsPost(
      body
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  @AcaControllerPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (!isCredentialDefinitionMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    switch (message.properties.type) {
      case CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION:
        response = await this.createCredentialDefinition(
          message.properties.body
        )
        break
      case CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS:
        response = await this.getCreatedCredentialDefinitions(
          message.properties.body
        )
        break
      case CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID:
        response = await this.getCredentialDefinitionById(
          message.properties.body
        )
        break
    }

    callback(response)
    return 'success'
  }
}

export { CredentialDefinitionController }
