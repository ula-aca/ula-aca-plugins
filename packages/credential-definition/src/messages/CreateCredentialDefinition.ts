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

import { CredentialDefinitionSendResults } from '@ula-aca/aries-cloudagent-interface'
import { CredentialDefinitionMessageTypes } from './CredentialDefinitionMessageTypes'

interface CreateCredentialDefinitionPayload {
  tag: string
  schemaId: string
}

interface CreateCredentialDefinitionMessage {
  type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION
  payload: CreateCredentialDefinitionPayload
}

type CreateCredentialDefinitionResult = CredentialDefinitionSendResults

export {
  CreateCredentialDefinitionPayload,
  CreateCredentialDefinitionMessage,
  CreateCredentialDefinitionResult
}
