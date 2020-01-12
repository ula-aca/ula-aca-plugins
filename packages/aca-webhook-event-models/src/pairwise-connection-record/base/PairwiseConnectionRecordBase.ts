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

import { PairwiseConnectionRecordState } from '.'

export interface PairwiseConnectionRecordBase {
  connection_id: string
  state: PairwiseConnectionRecordState
  my_did?: string
  their_did?: string
  their_label?: string
  their_role?: string
  inbound_connection_id?: string
  initiator: 'self' | 'external' | 'multiuse'
  invitation_key: string
  request_id?: string
  routing_state: 'none' | 'request' | 'active' | 'error'
  accept: 'manual' | 'auto'
  error_msg?: string
  invitation_mode: 'once' | 'multi'
  alias?: string
}
