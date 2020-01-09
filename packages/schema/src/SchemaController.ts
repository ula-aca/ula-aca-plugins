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

import { Configuration, SchemaApi } from '@ula-aca/aries-cloudagent-interface'
import {
  GetCreatedSchemasPayload,
  CreateSchemaPayload,
  isSchemaMessage,
  SchemaMessageTypes
} from './messages'

export default class SchemaController implements Plugin {
  private eventHandler?: EventHandler

  private schemaApi: SchemaApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.schemaApi = new SchemaApi(apiConfig)
  }

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name(): string {
    return '@ula-aca/schema/SchemaController'
  }

  private async getSchemaById(schemaId: string): Promise<UlaResponse> {
    const response = await this.schemaApi.schemasIdGet(schemaId)
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getCreatedSchemas({
    schemaId,
    schemaIssuerDid,
    schemaName,
    schemaVersion
  }: GetCreatedSchemasPayload = {}): Promise<UlaResponse> {
    const response = await this.schemaApi.schemasCreatedGet(
      schemaId,
      schemaIssuerDid,
      schemaName,
      schemaVersion
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createSchema({
    attributes,
    schemaName,
    schemaVersion
  }: CreateSchemaPayload): Promise<UlaResponse> {
    const response = await this.schemaApi.schemasPost({
      schema_name: schemaName,
      schema_version: schemaVersion,
      attributes
    })
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  async handleEvent(message: Message, callback: any): Promise<string> {
    if (!isSchemaMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse
    switch (message.properties.type) {
      case SchemaMessageTypes.CREATE_SCHEMA:
        response = await this.createSchema(message.properties.payload)
        break
      case SchemaMessageTypes.GET_CREATED_SCHEMAS:
        response = await this.getCreatedSchemas(message.properties.payload)
        break
      case SchemaMessageTypes.GET_SCHEMA_BY_ID:
        response = await this.getSchemaById(message.properties.payload.schemaId)
        break
      default:
        throw Error('Unknown message')
    }

    await callback(response)
    return response.statusCode < 200 || response.statusCode > 300
      ? 'error'
      : 'success'
  }
}
