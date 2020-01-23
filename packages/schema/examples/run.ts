import { EventHandler } from 'universal-ledger-agent'
import { logEvent } from '@ula-aca/test-utils'
import {
  SchemaController,
  SchemaMessageTypes,
  CreateSchemaBody,
  GetCreatedSchemasBody,
  GetSchemaByIdBody
} from '../src'

import { createSchema, getCreatedSchemas, getSchemaById } from '.'

async function run(): Promise<void> {
  const schemaController = new SchemaController(process.env.FABER_ACA_URL)
  const eventHandler = new EventHandler([schemaController])

  // --- CREATE_SCHEMA ---
  const createSchemaBody: CreateSchemaBody = {
    schema_name: 'ExampleSchema',
    schema_version: '1.0',
    attributes: ['first_name', 'last_name']
  }
  const createdSchema = await createSchema(eventHandler, createSchemaBody)

  logEvent({
    type: SchemaMessageTypes.CREATE_SCHEMA,
    input: createSchemaBody,
    output: createdSchema
  })

  // --- GET_CREATED_SCHEMAS ---
  const getCreatedSchemasBody: GetCreatedSchemasBody = {
    schema_id: createdSchema.schema_id
  }
  const createdSchemas = await getCreatedSchemas(
    eventHandler,
    getCreatedSchemasBody
  )
  logEvent({
    type: SchemaMessageTypes.GET_CREATED_SCHEMAS,
    input: getCreatedSchemasBody,
    output: createdSchemas
  })

  // --- GET_SCHEMA_BY_ID ---
  const getSchemaByIdBody: GetSchemaByIdBody = {
    schema_id: createdSchema.schema_id
  }
  const schema = await getSchemaById(eventHandler, getSchemaByIdBody)
  logEvent({
    type: SchemaMessageTypes.GET_SCHEMA_BY_ID,
    input: getSchemaByIdBody,
    output: schema
  })
}

run().catch(e => {
  console.log(e)
})
