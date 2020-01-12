/*
 * Copyright 2019-present ula-aca
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
import { CredentialExchangeRecordState } from '.'

export interface CredentialExchangeRecordBase {
  credential_exchange_id: string
  connection_id: string
  thread_id: string
  parent_thread_id?: string
  initiator: 'self' | 'external'
  state: CredentialExchangeRecordState
  credential_definition_id: string
  schema_id: string
  credential_proposal_dict: string
  credential_offer: string
  credential_request: string
  credential_request_metadata: string
  credential_id: string
  raw_credential: string
  credential: string
  auto_offer: boolean
  auto_issue: boolean
  error_msg?: string
}
