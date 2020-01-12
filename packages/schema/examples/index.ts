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

import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  SchemaController,
  GetSchemaByIdMessage,
  SchemaMessageTypes,
  GetSchemaByIdResult,
  GetCreatedSchemasMessage,
  GetCreatedSchemasResult,
  CreateSchemaMessage,
  CreateSchemaResult,
  GetCreatedSchemasBody,
  CreateSchemaBody
} from '../src'

const ACA_URL = 'http://ula.test:7002'
const schemaController = new SchemaController(ACA_URL)
const eventHandler = new EventHandler([schemaController])

async function getSchemaById(schemaId: string): Promise<GetSchemaByIdResult> {
  return new Promise((resolve, reject) => {
    const message: GetSchemaByIdMessage = {
      type: SchemaMessageTypes.GET_SCHEMA_BY_ID,
      body: { schema_id: schemaId }
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /schemas/{id} api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/schema/get_schemas__id_

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetSchemaByIdResult = response.body
      resolve(result)
    })
  })
}

async function getCreatedSchemas(
  options?: GetCreatedSchemasBody
): Promise<GetCreatedSchemasResult> {
  return new Promise((resolve, reject) => {
    const message: GetCreatedSchemasMessage = {
      type: SchemaMessageTypes.GET_CREATED_SCHEMAS,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /schemas/created api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/schema/get_schemas_created

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetCreatedSchemasResult = response.body
      resolve(result)
    })
  })
}

async function createSchema(
  options: CreateSchemaBody
): Promise<CreateSchemaResult> {
  return new Promise((resolve, reject) => {
    const message: CreateSchemaMessage = {
      type: SchemaMessageTypes.CREATE_SCHEMA,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /schemas post request api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/schema/post_schemas

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: CreateSchemaResult = response.body
      resolve(result)
    })
  })
}

async function run(): Promise<void> {
  const createdSchema = await createSchema({
    schema_name: 'ExampleSchema',
    schema_version: '1.0',
    attributes: ['first_name', 'last_name']
  })
  console.log(`createSchema id: ${createdSchema.schema_id}`)

  const createdSchemas = await getCreatedSchemas({
    schema_id: createdSchema.schema_id
  })
  console.log('createdSchemas: ', createdSchemas)

  const schema = await getSchemaById(createdSchema.schema_id)
  console.log('getSchemaById: ', schema)
}

run().catch(e => {
  console.log(e)
})
