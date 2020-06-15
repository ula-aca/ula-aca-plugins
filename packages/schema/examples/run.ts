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

import { EventHandler } from 'universal-ledger-agent'

import { logEvent } from '@ula-aca/test-utils'

import { createSchema, getCreatedSchemas, getSchemaById } from '.'
import {
  SchemaController,
  SchemaMessageTypes,
  CreateSchemaBody,
  GetCreatedSchemasBody,
  GetSchemaByIdBody
} from '../src'

async function run(): Promise<void> {
  const schemaController = new SchemaController({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    basePath: process.env.FABER_ACA_URL!
  })
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

run().catch((e) => {
  console.log(e)
})
