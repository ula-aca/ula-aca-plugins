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
import { GetPresentationExchangeRecordByIdMessage } from './GetPresentationExchangeRecordById'
import { GetPresentationExchangeRecordsMessage } from './GetPresentationExchangeRecords'
import { GetPresentationRequestCredentialsMessage } from './GetPresentationRequestCredentials'
import { GetPresentationRequestCredentialsByReferentIdMessage } from './GetPresentationRequestCredentialsByReferentId'
import { RemovePresentationExchangeRecordMessage } from './RemovePresentation'
import { SendPresentationMessage } from './SendPresentation'
import { SendPresentationProposalMessage } from './SendPresentationProposal'
import { SendPresentationRequestMessage } from './SendPresentationRequest'
import { SendPresentationRequestByIdMessage } from './SendPresentationRequestById'
import { VerifyPresentationMessage } from './VerifyPresentation'

import { PresentProofMessageTypes } from './PresentProofMessageTypes'

type IssueCredentialMessageType =
  | CreatePresentationRequestMessage
  | GetPresentationExchangeRecordByIdMessage
  | GetPresentationExchangeRecordsMessage
  | GetPresentationRequestCredentialsMessage
  | GetPresentationRequestCredentialsByReferentIdMessage
  | RemovePresentationExchangeRecordMessage
  | SendPresentationMessage
  | SendPresentationProposalMessage
  | SendPresentationRequestMessage
  | SendPresentationRequestByIdMessage
  | VerifyPresentationMessage

function isPresentProofMessage(
  properties
): properties is IssueCredentialMessageType {
  return Object.values(PresentProofMessageTypes).includes(properties.type)
}

export { IssueCredentialMessageType, isPresentProofMessage }

export * from './PresentProofMessageTypes'
export * from './CreatePresentationRequest'
export * from './GetPresentationExchangeRecordById'
export * from './GetPresentationExchangeRecords'
export * from './GetPresentationRequestCredentials'
export * from './GetPresentationRequestCredentialsByReferentId'
export * from './RemovePresentation'
export * from './SendPresentation'
export * from './SendPresentationProposal'
export * from './SendPresentationRequest'
export * from './SendPresentationRequestById'
export * from './VerifyPresentation'
