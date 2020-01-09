/* eslint-disable @typescript-eslint/no-empty-function */
/*
 * Copyright 2020  ula-aca.
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
  SchemaGetResults,
  SchemasCreatedResults,
  SchemaSendResults
} from '@ula-aca/aries-cloudagent-interface'

enum SchemaMessageTypes {
  GET_SCHEMA_BY_ID = '@ula-aca/schema/get-schema-by-id',
  GET_CREATED_SCHEMAS = '@ula-aca/schema/get-created-schemas',
  CREATE_SCHEMA = '@ula-aca/schema/create-schema'
}

interface GetSchemaByIdMessage {
  type: SchemaMessageTypes.GET_SCHEMA_BY_ID
  payload: {
    schemaId: string
  }
}

type GetSchemaByIdResult = SchemaGetResults

interface GetCreatedSchemasPayload {
  schemaId?: string
  schemaIssuerDid?: string
  schemaName?: string
  schemaVersion?: string
}

interface GetCreatedSchemasMessage {
  type: SchemaMessageTypes.GET_CREATED_SCHEMAS
  payload?: GetCreatedSchemasPayload
}

type GetCreatedSchemasResult = SchemasCreatedResults

interface CreateSchemaPayload {
  schemaVersion: string
  schemaName: string
  attributes: string[]
}

interface CreateSchemaMessage {
  type: SchemaMessageTypes.CREATE_SCHEMA
  payload: CreateSchemaPayload
}

type CreateSchemaResult = SchemaSendResults

type SchemaMessageType =
  | GetSchemaByIdMessage
  | GetCreatedSchemasMessage
  | CreateSchemaMessage

function isSchemaMessage(properties): properties is SchemaMessageType {
  return Object.values(SchemaMessageTypes).includes(properties.type)
}

export {
  SchemaMessageType,
  SchemaMessageTypes,
  isSchemaMessage,
  /* get-schema-by-id */
  GetSchemaByIdMessage,
  GetSchemaByIdResult,
  /* get-created-schemas */
  GetCreatedSchemasPayload,
  GetCreatedSchemasMessage,
  GetCreatedSchemasResult,
  /* create-schema */
  CreateSchemaPayload,
  CreateSchemaMessage,
  CreateSchemaResult
}
