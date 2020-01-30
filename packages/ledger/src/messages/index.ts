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

import { AcceptTransactionAuthorAgreementMessage } from './AcceptTransactionAuthorAgreement'
import { GetEndpointByDidMessage } from './GetEndpointByDid'
import { GetTransactionAuthorAgreementMessage } from './GetTransactionAuthorAgreement'
import { GetVerkeyByDidMessage } from './GetVerkeyByDid'
import { LedgerMessageTypes } from './LedgerMessageTypes'
import { RegisterNymMessage } from './RegisterNym'

type LedgerMessageType =
  | RegisterNymMessage
  | GetVerkeyByDidMessage
  | GetEndpointByDidMessage
  | GetTransactionAuthorAgreementMessage
  | AcceptTransactionAuthorAgreementMessage

function isLedgerMessage(properties: {
  type: string
}): properties is LedgerMessageType {
  return Object.values(LedgerMessageTypes).includes(
    properties.type as LedgerMessageTypes
  )
}

export { LedgerMessageType, isLedgerMessage }
export * from './AcceptTransactionAuthorAgreement'
export * from './GetEndpointByDid'
export * from './GetTransactionAuthorAgreement'
export * from './GetVerkeyByDid'
export * from './RegisterNym'
export * from './LedgerMessageTypes'
