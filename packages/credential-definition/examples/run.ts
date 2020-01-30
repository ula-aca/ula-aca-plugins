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

import {
  createCredentialDefinition,
  getCreatedCredentialDefinitions,
  getCredentialDefinitionById
} from '.'
import {
  CredentialDefinitionController,
  CreateCredentialDefinitionBody,
  CredentialDefinitionMessageTypes,
  GetCreatedCredentialDefinitionsBody,
  GetCredentialDefinitionByIdBody
} from '../src'

async function run(): Promise<void> {
  const credentialDefinitionController = new CredentialDefinitionController({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    basePath: process.env.FABER_ACA_URL!
  })
  const eventHandler = new EventHandler([credentialDefinitionController])

  // --- CREATE_CREDENTIAL_DEFINITION ---
  const createCredentialDefinitionBody: CreateCredentialDefinitionBody = {
    schema_id: 'Bqqp9wananY4uW2pRHACiT:2:ExampleSchema:1.0',
    tag: 'my-cred-def'
  }
  const createdCredentialDefinition = await createCredentialDefinition(
    eventHandler,
    createCredentialDefinitionBody
  )
  logEvent({
    type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION,
    input: createCredentialDefinitionBody,
    output: createdCredentialDefinition
  })

  // --- GET_CREATED_CREDENTIAL_DEFINITIONS ---
  const getCreatedCredentialDefinitionsBody: GetCreatedCredentialDefinitionsBody = {
    credential_definition_id:
      createdCredentialDefinition.credential_definition_id
  }
  const createdCredentialDefinitions = await getCreatedCredentialDefinitions(
    eventHandler,
    getCreatedCredentialDefinitionsBody
  )
  logEvent({
    type: CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS,
    input: getCreatedCredentialDefinitionsBody,
    output: createdCredentialDefinitions
  })

  // --- GET_CREDENTIAL_DEFINITION_BY_ID ---
  const getCredentialDefinitionByIdBody: GetCredentialDefinitionByIdBody = {
    credential_definition_id:
      createdCredentialDefinition.credential_definition_id
  }
  const credentialDefinition = await getCredentialDefinitionById(
    eventHandler,
    getCredentialDefinitionByIdBody
  )
  logEvent({
    type: CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID,
    input: getCredentialDefinitionByIdBody,
    output: credentialDefinition
  })
}

run().catch(e => {
  console.log(e)
})
