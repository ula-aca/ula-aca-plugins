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

interface RemoveExchangeRecordBody {
  credential_exchange_id: string
}

interface RemoveExchangeRecordMessage {
  type: IssueCredentialMessageTypes.REMOVE_EXCHANGE_RECORD
  body: RemoveExchangeRecordBody
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RemoveExchangeRecordResult = any

export {
  RemoveExchangeRecordMessage,
  RemoveExchangeRecordBody,
  RemoveExchangeRecordResult
}
