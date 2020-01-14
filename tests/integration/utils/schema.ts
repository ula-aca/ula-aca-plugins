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

import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CreateSchemaBody,
  SchemaMessageTypes,
  CreateSchemaMessage,
  GetSchemaByIdBody,
  GetSchemaByIdMessage,
  GetCreatedSchemasBody,
  GetCreatedSchemasMessage,
  GetCreatedSchemasResult,
  CreateSchemaResult
} from '@ula-aca/schema'
import faker from 'faker'

import { eventPromise } from '.'

const createSchema = (
  eventHandler: EventHandler,
  body: CreateSchemaBody
): Promise<UlaResponse> => {
  const message = {
    type: SchemaMessageTypes.CREATE_SCHEMA,
    body
  } as CreateSchemaMessage

  return eventPromise(eventHandler, message)
}

const getSchemaById = (
  eventHandler: EventHandler,
  body: GetSchemaByIdBody
): Promise<UlaResponse> => {
  const message = {
    type: SchemaMessageTypes.GET_SCHEMA_BY_ID,
    body
  } as GetSchemaByIdMessage

  return eventPromise(eventHandler, message)
}

const getCreatedSchemas = (
  eventHandler: EventHandler,
  body?: GetCreatedSchemasBody
): Promise<UlaResponse> => {
  const message = {
    type: SchemaMessageTypes.GET_CREATED_SCHEMAS,
    body
  } as GetCreatedSchemasMessage

  return eventPromise(eventHandler, message)
}

const getTestSchemas = (noOfSchemas: number): CreateSchemaBody[] =>
  Array.from(Array(noOfSchemas), () => ({
    schema_version: `${faker.random.number()}.0`,
    schema_name: faker.random.uuid(),
    attributes: Array.from(
      Array(faker.random.number({ min: 1, max: 10 })),
      () => `${faker.random.uuid()}-${faker.random.word()}`
    )
  }))

const getExistingSchemaIds = async (
  eventHandler: EventHandler,
  noOfIds: number
): Promise<string[]> => {
  let existingSchemaIds = Array.from(
    new Set(
      ((await getCreatedSchemas(eventHandler))
        .body as GetCreatedSchemasResult).schema_ids
    )
  )

  if (existingSchemaIds.length < noOfIds) {
    // eslint-disable-next-line no-restricted-syntax
    for (const schema of getTestSchemas(noOfIds - existingSchemaIds.length)) {
      // eslint-disable-next-line no-await-in-loop
      const createdSchema = (await createSchema(eventHandler, schema))
        .body as CreateSchemaResult
      existingSchemaIds.push(createdSchema.schema_id)
    }
  } else {
    existingSchemaIds = existingSchemaIds.slice(0, noOfIds)
  }

  return existingSchemaIds
}

export {
  createSchema,
  getSchemaById,
  getCreatedSchemas,
  getExistingSchemaIds,
  getTestSchemas
}
