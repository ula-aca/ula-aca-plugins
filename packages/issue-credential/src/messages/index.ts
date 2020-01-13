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

import { IssueCredentialMessageTypes } from './IssueCredentialMessageTypes'
import { GetExchangeRecordsMessage } from './GetExchangeRecords'
import { GetExchangeRecordByIdMessage } from './GetExchangeRecordById'
import { GetMemeTypesMessage } from './GetMemeTypes'
import { IssueMessage } from './Issue'
import { ProblemReportMessage } from './ProblemReport'
import { RemoveExchangeRecordMessage } from './RemoveExchangeRecord'
import { SendCredentialMessage } from './SendCredential'
import { SendOfferMessage } from './SendOffer'
import { SendOfferByIdMessage } from './SendOfferById'
import { SendProposalMessage } from './SendProposal'
import { SendRequestMessage } from './SendRequest'
import { StoreMessage } from './Store'

type IssueCredentialMessageType =
  | GetExchangeRecordsMessage
  | GetExchangeRecordByIdMessage
  | GetMemeTypesMessage
  | IssueMessage
  | ProblemReportMessage
  | RemoveExchangeRecordMessage
  | SendCredentialMessage
  | SendOfferMessage
  | SendOfferByIdMessage
  | SendProposalMessage
  | SendRequestMessage
  | StoreMessage

function isIssueCredentialMessage(
  properties
): properties is IssueCredentialMessageType {
  return Object.values(IssueCredentialMessageTypes).includes(properties.type)
}

export { IssueCredentialMessageType, isIssueCredentialMessage }

export * from './IssueCredentialMessageTypes'
export * from './GetExchangeRecords'
export * from './GetExchangeRecordById'
export * from './GetMemeTypes'
export * from './Issue'
export * from './ProblemReport'
export * from './RemoveExchangeRecord'
export * from './SendCredential'
export * from './SendOffer'
export * from './SendOfferById'
export * from './SendProposal'
export * from './SendRequest'
export * from './Store'
