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

import { SchemaApi } from '@ula-aca/aries-cloudagent-interface'
import {
  AcaControllerPlugin,
  AcaControllerPluginOptions,
  UlaCallback
} from '@ula-aca/core'

import {
  GetCreatedSchemasBody,
  CreateSchemaBody,
  isSchemaMessage,
  SchemaMessageTypes,
  GetSchemaByIdBody,
  GetSchemaByIdResult
} from './messages'

class SchemaController extends AcaControllerPlugin {
  private schemaApi: SchemaApi

  constructor(options?: AcaControllerPluginOptions) {
    super(options)

    this.schemaApi = new SchemaApi(this.apiConfig)
  }

  get name(): string {
    return '@ula-aca/schema/SchemaController'
  }

  private async getSchemaById({
    schema_id
  }: GetSchemaByIdBody): Promise<UlaResponse> {
    const response = await this.schemaApi.schemasIdGet(schema_id)

    // The generated API does not provide the correct response typing
    const responseBody = (response.data as unknown) as GetSchemaByIdResult

    return new UlaResponse({
      statusCode: response.status,
      body: responseBody
    })
  }

  private async getCreatedSchemas({
    schema_id,
    schema_issuer_did,
    schema_name,
    schema_version
  }: GetCreatedSchemasBody = {}): Promise<UlaResponse> {
    const response = await this.schemaApi.schemasCreatedGet(
      schema_id,
      schema_issuer_did,
      schema_name,
      schema_version
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createSchema(body: CreateSchemaBody): Promise<UlaResponse> {
    const response = await this.schemaApi.schemasPost(body)
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  @AcaControllerPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (!isSchemaMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    switch (message.properties.type) {
      case SchemaMessageTypes.CREATE_SCHEMA:
        response = await this.createSchema(message.properties.body)
        break
      case SchemaMessageTypes.GET_CREATED_SCHEMAS:
        response = await this.getCreatedSchemas(message.properties.body)
        break
      case SchemaMessageTypes.GET_SCHEMA_BY_ID:
        response = await this.getSchemaById(message.properties.body)
        break
    }

    callback(response)
    return 'success'
  }
}

export { SchemaController }
