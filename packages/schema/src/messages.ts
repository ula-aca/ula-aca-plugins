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
