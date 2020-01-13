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

enum IssueCredentialMessageTypes {
  GET_MEME_TYPES = '@ula-aca/issue-credential/get-meme-types',
  GET_EXCHANGE_RECORDS = '@ula-aca/issue-credential/get-all-exchange-records',
  GET_EXCHANGE_RECORD_BY_ID = '@ula-aca/issue-credential/get-exchange-record-by-id',
  SEND_CREDENTIAL = '@ula-aca/issue-credential/send-credential',
  SEND_PROPOSAL = '@ula-aca/issue-credential/send-proposal',
  SEND_OFFER = '@ula-aca/issue-credential/send-offer',
  SEND_OFFER_BY_ID = '@ula-aca/issue-credential/send-offer-by-id',
  SEND_REQUEST = '@ula-aca/issue-credential/send-request',
  ISSUE = '@ula-aca/issue-credential/issue',
  STORE = '@ula-aca/issue-credential/store',
  PROBLEM_REPORT = '@ula-aca/issue-credential/problem-report',
  REMOVE_EXCHANGE_RECORD = '@ula-aca/issue-credential/remove'
}

export { IssueCredentialMessageTypes }
