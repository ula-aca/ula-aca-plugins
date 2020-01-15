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

import { InvitationResult } from '@ula-aca/aries-cloudagent-interface'
import { ConnectionMessageTypes } from './ConnectionMessageTypes'

interface CreateInvitationBody {
  alias?: string
  accept?: 'auto' | 'none'
  public?: string
  multi_use?: string
}

interface CreateInvitationMessage {
  type: ConnectionMessageTypes.CREATE_INVITATION
  body?: CreateInvitationBody
}

type CreateInvitationResult = InvitationResult

export { CreateInvitationMessage, CreateInvitationBody, CreateInvitationResult }
