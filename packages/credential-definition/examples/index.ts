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
  CredentialDefinitionController,
  GetCredentialDefinitionByIdMessage,
  CredentialDefinitionMessageTypes,
  GetCredentialDefinitionByIdResult,
  GetCreatedCredentialDefinitionsMessage,
  GetCreatedCredentialDefinitionsResult,
  CreateCredentialDefinitionMessage,
  CreateCredentialDefinitionResult,
  GetCreatedCredentialDefinitionsBody,
  CreateCredentialDefinitionBody
} from '../src'

const ACA_URL = 'http://ula.test:7002'
const credentialDefinitionController = new CredentialDefinitionController(
  ACA_URL
)
const eventHandler = new EventHandler([credentialDefinitionController])

async function getCredentialDefinitionById(
  credentialDefinitionId: string
): Promise<GetCredentialDefinitionByIdResult> {
  return new Promise((resolve, reject) => {
    const message: GetCredentialDefinitionByIdMessage = {
      type: CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID,
      body: { credential_definition_id: credentialDefinitionId }
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /credential-definitions/{id} api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credential-definition/get_credential_definitions__id_

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetCredentialDefinitionByIdResult = response.body
      resolve(result)
    })
  })
}

async function getCreatedCredentialDefinitions(
  options?: GetCreatedCredentialDefinitionsBody
): Promise<GetCreatedCredentialDefinitionsResult> {
  return new Promise((resolve, reject) => {
    const message: GetCreatedCredentialDefinitionsMessage = {
      type: CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /credential-definitions/created api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credential-definition/get_credential_definitions_created

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetCreatedCredentialDefinitionsResult = response.body
      resolve(result)
    })
  })
}

async function createCredentialDefinition(
  options: CreateCredentialDefinitionBody
): Promise<CreateCredentialDefinitionResult> {
  return new Promise((resolve, reject) => {
    const message: CreateCredentialDefinitionMessage = {
      type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      // response.body is response from /credential-definitions post request api endpoint in aca-py
      // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credential-definition/post_credential_definitions

      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: CreateCredentialDefinitionResult = response.body
      resolve(result)
    })
  })
}

async function run(): Promise<void> {
  const createdCredentialDefinition = await createCredentialDefinition({
    schema_id: 'Bqqp9wananY4uW2pRHACiT:2:Test:1.0',
    tag: 'my-cred-def'
  })
  console.log(
    `createCredentialDefinition id: ${createdCredentialDefinition.credential_definition_id}`
  )

  const createdCredentialDefinitions = await getCreatedCredentialDefinitions({
    credential_definition_id:
      createdCredentialDefinition.credential_definition_id
  })
  console.log('createdCredentialDefinitions: ', createdCredentialDefinitions)

  const credentialDefinition = await getCredentialDefinitionById(
    createdCredentialDefinition.credential_definition_id
  )
  console.log('getCredentialDefinitionById: ', credentialDefinition)
}

run().catch(e => {
  console.log(e)
})
