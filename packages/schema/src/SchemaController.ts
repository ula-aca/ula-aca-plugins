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

import { Configuration, SchemaApi } from '@ula-aca/aries-cloudagent-interface'
import { AxiosError } from 'axios'
import {
  GetCreatedSchemasBody,
  CreateSchemaBody,
  isSchemaMessage,
  SchemaMessageTypes,
  GetSchemaByIdBody
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

  private async getSchemaById({
    schema_id
  }: GetSchemaByIdBody): Promise<UlaResponse> {
    const response = await this.schemaApi.schemasIdGet(schema_id)
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
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

  async handleEvent(
    message: Message,
    callback: (res: UlaResponse) => Promise<void> | void
  ): Promise<string> {
    if (!isSchemaMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    try {
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
