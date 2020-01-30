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

import { CredentialDefinitionGetResults } from '@ula-aca/aries-cloudagent-interface'

import { CredentialDefinitionMessageTypes } from './CredentialDefinitionMessageTypes'

interface GetCredentialDefinitionByIdBody {
  credential_definition_id: string
}

interface GetCredentialDefinitionByIdMessage {
  type: CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID
  body: GetCredentialDefinitionByIdBody
}

type GetCredentialDefinitionByIdResult = CredentialDefinitionGetResults

export {
  GetCredentialDefinitionByIdBody,
  GetCredentialDefinitionByIdMessage,
  GetCredentialDefinitionByIdResult
}
