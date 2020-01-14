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
  CreateCredentialDefinitionBody,
  CredentialDefinitionMessageTypes,
  CreateCredentialDefinitionMessage,
  GetCredentialDefinitionByIdBody,
  GetCredentialDefinitionByIdMessage,
  GetCreatedCredentialDefinitionsBody,
  GetCreatedCredentialDefinitionsMessage
} from '@ula-aca/credential-definition'
import faker from 'faker'

import { eventPromise } from '.'

const createCredentialDefinition = (
  eventHandler: EventHandler,
  body: CreateCredentialDefinitionBody
): Promise<UlaResponse> => {
  const message = {
    type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION,
    body
  } as CreateCredentialDefinitionMessage

  return eventPromise(eventHandler, message)
}

const getCredentialDefinitionById = (
  eventHandler: EventHandler,
  body: GetCredentialDefinitionByIdBody
): Promise<UlaResponse> => {
  const message = {
    type: CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID,
    body
  } as GetCredentialDefinitionByIdMessage

  return eventPromise(eventHandler, message)
}

const getCreatedCredentialDefinitions = (
  eventHandler: EventHandler,
  body?: GetCreatedCredentialDefinitionsBody
): Promise<UlaResponse> => {
  const message = {
    type: CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS,
    body
  } as GetCreatedCredentialDefinitionsMessage

  return eventPromise(eventHandler, message)
}

const getTestCredentialDefinitions = (
  schemaIds: string[]
): CreateCredentialDefinitionBody[] =>
  schemaIds.map(schemaId => ({
    schema_id: schemaId,
    tag: faker.random.uuid()
  }))

export {
  createCredentialDefinition,
  getCredentialDefinitionById,
  getCreatedCredentialDefinitions,
  getTestCredentialDefinitions
}
