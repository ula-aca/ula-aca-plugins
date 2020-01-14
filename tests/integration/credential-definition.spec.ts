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
  CreateCredentialDefinitionResult,
  CreateCredentialDefinitionBody,
  GetCreatedCredentialDefinitionsResult,
  GetCredentialDefinitionByIdResult
} from '@ula-aca/credential-definition'

import {
  createCredentialDefinition,
  getTestCredentialDefinitions,
  getCreatedCredentialDefinitions,
  getCredentialDefinitionById
} from './utils/credential-definition'
import { getExistingSchemaIds } from './utils/schema'
import { getEventHandler } from './utils'

describe('[package] @ula-aca/credential-definition', () => {
  describe('[plugin] CredentialDefinitionController', () => {
    const eventHandler: EventHandler = getEventHandler({
      acaUrl: process.env.ACA_URL || 'http://localhost:7002'
    })
    let testCredentialDefinitions: {
      data: CreateCredentialDefinitionBody
      credentialDefinitionId?: string
    }[]

    before(async () => {
      // create or get schema ids
      const schemaIds = await getExistingSchemaIds(eventHandler, 3)

      testCredentialDefinitions = getTestCredentialDefinitions(schemaIds).map(
        credentialDefinition => ({
          data: credentialDefinition
        })
      )
    })

    it('@ula-aca/credential-definition/create-credential-definition', async () => {
      for (const testCredentialDefinition of testCredentialDefinitions) {
        const response = await createCredentialDefinition(
          eventHandler,
          testCredentialDefinition.data
        )

        response.statusCode.should.equal(200)
        const result: CreateCredentialDefinitionResult = response.body
        result.credential_definition_id.should.be.a('string')
        testCredentialDefinition.credentialDefinitionId =
          result.credential_definition_id
      }
    })

    it('@ula-aca/credential-definition/get-credential-definition-by-id', async () => {
      for (const testCredentialDefinition of testCredentialDefinitions) {
        const response = await getCredentialDefinitionById(eventHandler, {
          credential_definition_id:
            testCredentialDefinition.credentialDefinitionId
        })

        response.statusCode.should.equal(200)
        const result: GetCredentialDefinitionByIdResult = response.body

        result.credential_definition.id.should.equal(
          testCredentialDefinition.credentialDefinitionId
        )
        result.credential_definition.tag.should.equal(
          testCredentialDefinition.data.tag
        )
      }
    })

    it('@ula-aca/credential-definition/get-created-credential-definitions', async () => {
      const credentialDefinitionIds = testCredentialDefinitions.map(
        credentialDefinition => credentialDefinition.credentialDefinitionId
      )
      const response = await getCreatedCredentialDefinitions(eventHandler)

      response.statusCode.should.equal(200)
      const result: GetCreatedCredentialDefinitionsResult = response.body

      result.credential_definition_ids.should.include.any.members(
        credentialDefinitionIds
      )
    })
  })
})
