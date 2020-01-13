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

enum PresentProofMessageTypes {
  GET_EXCHANGE_RECORDS = '@ula-aca/present-proof/get-all-exchange-records',
  GET_EXCHANGE_RECORD_BY_ID = '@ula-aca/present-proof/get-exchange-record-by-id',
  GET_PRESENTATION_REQUEST_CREDENTIALS = '@ula-aca/present-proof/get-presentation-request-credentials',
  GET_PRESENTATION_REQUEST_CREDENTIALS_WITH_REFERENT = '@ula-aca/present-proof/get-presentation-request-credentials-with-referent',
  SEND_PROPOSAL = '@ula-aca/present-proof/send-proposal',
  CREATE_PRESENTATION_REQUEST = '@ula-aca/present-proof/create-presentation-request',
  SEND_REQUEST = '@ula-aca/present-proof/send-request',
  SEND_REQUEST_BY_ID = '@ula-aca/present-proof/send-proof-presentation-request-by-id',
  SEND_PRESENTATION = '@ula-aca/present-proof/send-presentation',
  VERIFY_PRESENTATION = '@ula-aca/present-proof/verify-presentation',
  REMOVE_EXCHANGE_RECORD = '@ula-aca/present-proof/remove-exchange-record'
}

export { PresentProofMessageTypes }
