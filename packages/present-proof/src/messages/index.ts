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

import { CreatePresentationRequestMessage } from './CreatePresentationRequest'
import { GetExchangeRecordByIdMessage } from './GetExchangeRecordById'
import { GetExchangeRecordsMessage } from './GetExchangeRecords'
import { GetRequestCredentialsMessage } from './GetRequestCredentials'
import { GetPresentationRequestCredentialsByReferentIdMessage } from './GetPresentationRequestCredentialsByReferentId'
import { RemoveExchangeRecordMessage } from './RemoveExchangeRecord'
import { SendPresentationMessage } from './SendPresentation'
import { SendProposalMessage } from './SendProposal'
import { SendRequestMessage } from './SendRequest'
import { SendRequestByIdMessage } from './SendRequestById'
import { VerifyPresentationMessage } from './VerifyPresentation'

import { PresentProofMessageTypes } from './PresentProofMessageTypes'

type IssueCredentialMessageType =
  | CreatePresentationRequestMessage
  | GetExchangeRecordByIdMessage
  | GetExchangeRecordsMessage
  | GetRequestCredentialsMessage
  | GetPresentationRequestCredentialsByReferentIdMessage
  | RemoveExchangeRecordMessage
  | SendPresentationMessage
  | SendProposalMessage
  | SendRequestMessage
  | SendRequestByIdMessage
  | VerifyPresentationMessage

function isPresentProofMessage(properties: {
  type: string
}): properties is IssueCredentialMessageType {
  return Object.values(PresentProofMessageTypes).includes(
    properties.type as PresentProofMessageTypes
  )
}

export { IssueCredentialMessageType, isPresentProofMessage }

export * from './PresentProofMessageTypes'
export * from './CreatePresentationRequest'
export * from './GetExchangeRecordById'
export * from './GetExchangeRecords'
export * from './GetRequestCredentials'
export * from './GetPresentationRequestCredentialsByReferentId'
export * from './RemoveExchangeRecord'
export * from './SendPresentation'
export * from './SendProposal'
export * from './SendRequest'
export * from './SendRequestById'
export * from './VerifyPresentation'
