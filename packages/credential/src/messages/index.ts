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

import { CredentialMessageTypes } from './CredentialMessageTypes'
import { GetCredentialByIdMessage } from './GetCredentialById'
import { GetCredentialsMessage } from './GetCredentials'
import { RemoveCredentialMessage } from './RemoveCredential'

type CredentialMessageType =
  | GetCredentialByIdMessage
  | GetCredentialsMessage
  | RemoveCredentialMessage

function isCredentialMessage(properties: {
  type: string
}): properties is CredentialMessageType {
  return Object.values(CredentialMessageTypes).includes(
    properties.type as CredentialMessageTypes
  )
}

export { CredentialMessageType, isCredentialMessage }

export * from './GetCredentials'
export * from './GetCredentialById'
export * from './RemoveCredential'
export * from './CredentialMessageTypes'
