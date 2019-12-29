/*
 * Copyright 2019 Utrecht Innovation.
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

export default interface PresentationExchangeRecord {
  connection_id: string
  state:
    | 'proposal_sent'
    | 'proposal_received'
    | 'request_sent'
    | 'request_received'
    | 'presentation_sent'
    | 'presentation_received'
    | 'verified'
  thread_id: string
  presentation_exchange_id: string
  initiator: 'self' | 'external'
  presentation_proposal_dict: string
  presentation_request: string
  presentation: string
  verified: 'true' | 'false'
  auto_present: boolean
  error_msg?: string
}
