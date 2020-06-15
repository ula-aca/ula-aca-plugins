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

import faker from 'faker'
import { EventHandler, UlaResponse } from 'universal-ledger-agent'

import {
  CreateCredentialDefinitionBody,
  CredentialDefinitionMessageTypes,
  CreateCredentialDefinitionMessage,
  GetCredentialDefinitionByIdBody,
  GetCredentialDefinitionByIdMessage,
  GetCreatedCredentialDefinitionsBody,
  GetCreatedCredentialDefinitionsMessage,
  GetCreatedCredentialDefinitionsResult,
  CreateCredentialDefinitionResult
} from '@ula-aca/credential-definition'

import { eventPromise } from '.'
import { getExistingSchemaIds } from './schema'

const createCredentialDefinition = (
  eventHandler: EventHandler,
  body: CreateCredentialDefinitionBody
): Promise<UlaResponse> => {
  const message: CreateCredentialDefinitionMessage = {
    type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION,
    body
  }

  return eventPromise(eventHandler, message)
}

const getCredentialDefinitionById = (
  eventHandler: EventHandler,
  body: GetCredentialDefinitionByIdBody
): Promise<UlaResponse> => {
  const message: GetCredentialDefinitionByIdMessage = {
    type: CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID,
    body
  }

  return eventPromise(eventHandler, message)
}

const getCreatedCredentialDefinitions = (
  eventHandler: EventHandler,
  body?: GetCreatedCredentialDefinitionsBody
): Promise<UlaResponse> => {
  const message: GetCreatedCredentialDefinitionsMessage = {
    type: CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS,
    body
  }

  return eventPromise(eventHandler, message)
}

const getTestCredentialDefinitionBodies = (
  schemaIds: string[]
): CreateCredentialDefinitionBody[] =>
  schemaIds.map((schemaId) => ({
    schema_id: schemaId,
    tag: faker.random.uuid()
  }))

const getExistingCredentialDefinitionIds = async (
  eventHandler: EventHandler,
  noOfIds: number
): Promise<string[]> => {
  const existingSchemaIds = await getExistingSchemaIds(eventHandler, noOfIds)

  let existingCredentialDefinitionIds = Array.from(
    new Set(
      ((await getCreatedCredentialDefinitions(eventHandler))
        .body as GetCreatedCredentialDefinitionsResult).credential_definition_ids
    )
  )

  if (existingCredentialDefinitionIds.length < noOfIds) {
    // eslint-disable-next-line no-restricted-syntax
    for (const credentialDefinition of getTestCredentialDefinitionBodies(
      existingSchemaIds.slice(
        0,
        existingCredentialDefinitionIds.length - noOfIds
      )
    )) {
      // eslint-disable-next-line no-await-in-loop
      const createdCredentialDefinitionResult = await createCredentialDefinition(
        eventHandler,
        credentialDefinition
      )
      const createdCredentialDefinition = createdCredentialDefinitionResult.body as CreateCredentialDefinitionResult
      existingCredentialDefinitionIds.push(
        createdCredentialDefinition.credential_definition_id
      )
    }
  } else {
    existingCredentialDefinitionIds = existingCredentialDefinitionIds.slice(
      0,
      noOfIds
    )
  }

  return existingCredentialDefinitionIds
}

export {
  createCredentialDefinition,
  getCredentialDefinitionById,
  getCreatedCredentialDefinitions,
  getTestCredentialDefinitionBodies,
  getExistingCredentialDefinitionIds
}
