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

import { CredentialDefinitionsCreatedResults } from '@ula-aca/aries-cloudagent-interface'

import { CredentialDefinitionMessageTypes } from './CredentialDefinitionMessageTypes'

interface GetCreatedCredentialDefinitionsBody {
  schema_id?: string
  schema_issuer_did?: string
  schema_name?: string
  schema_version?: string
  issuer_did?: string
  credential_definition_id?: string
}

interface GetCreatedCredentialDefinitionsMessage {
  type: CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS
  body?: GetCreatedCredentialDefinitionsBody
}

type GetCreatedCredentialDefinitionsResult = CredentialDefinitionsCreatedResults

export {
  GetCreatedCredentialDefinitionsBody,
  GetCreatedCredentialDefinitionsMessage,
  GetCreatedCredentialDefinitionsResult
}
