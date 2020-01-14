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

import {
  CreateSchemaResult,
  GetSchemaByIdResult,
  CreateSchemaBody,
  GetCreatedSchemasResult
} from '@ula-aca/schema'

import {
  createSchema,
  getSchemaById,
  getTestSchemas,
  getCreatedSchemas
} from './utils/schema'

import { getEventHandler } from './utils'

describe('[package] @ula-aca/schema', () => {
  describe('[plugin] SchemaController', () => {
    const eventHandler: EventHandler = getEventHandler({
      acaUrl: process.env.ACA_URL || 'http://localhost:7002'
    })
    const testSchemas: {
      data: CreateSchemaBody
      schemaId?: string
    }[] = getTestSchemas(3).map(val => ({ data: val }))

    it('@ula-aca/schema/create-schema', async () => {
      for (const testSchema of testSchemas) {
        const response = await createSchema(eventHandler, testSchema.data)

        response.statusCode.should.equal(200)
        const result: CreateSchemaResult = response.body
        result.schema_id.should.be.a('string')

        testSchema.schemaId = result.schema_id
      }
    })

    it('@ula-aca/schema/get-schema-by-id', async () => {
      for (const testSchema of testSchemas) {
        const response = await getSchemaById(eventHandler, {
          schema_id: testSchema.schemaId
        })

        response.statusCode.should.equal(200)
        const result: GetSchemaByIdResult = response.body

        result.schema_json.version.should.equal(testSchema.data.schema_version)
        result.schema_json.name.should.equal(testSchema.data.schema_name)
        result.schema_json.id.should.equal(testSchema.schemaId)
        result.schema_json.attrNames.should.have.members(
          testSchema.data.attributes
        )
      }
    })

    it('@ula-aca/schema/get-created-schemas', async () => {
      const schemaIds = testSchemas.map(schema => schema.schemaId)
      const response = await getCreatedSchemas(eventHandler)

      response.statusCode.should.equal(200)
      const result: GetCreatedSchemasResult = response.body

      result.schema_ids.should.include.any.members(schemaIds)
    })
  })
})
