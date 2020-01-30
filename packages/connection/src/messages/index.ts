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

import { AcceptInvitationMessage } from './AcceptInvitation'
import { AcceptRequestMessage } from './AcceptRequest'
import { ConnectionMessageTypes } from './ConnectionMessageTypes'
import { CreateInvitationMessage } from './CreateInvitation'
import { EstablishInboundMessage } from './EstablishInbound'
import { GetConnectionByIdMessage } from './GetConnectionById'
import { GetConnectionsMessage } from './GetConnections'
import { ReceiveInvitationMessage } from './ReceiveInvitation'
import { RemoveConnectionMessage } from './RemoveConnection'
import { SendBasicMessageMessage } from './SendBasicMessage'
import { SendPingMessage } from './SendPing'

type ConnectionMessageType =
  | AcceptInvitationMessage
  | AcceptRequestMessage
  | CreateInvitationMessage
  | GetConnectionByIdMessage
  | GetConnectionsMessage
  | EstablishInboundMessage
  | ReceiveInvitationMessage
  | RemoveConnectionMessage
  | SendBasicMessageMessage
  | SendPingMessage

function isConnectionMessage(properties: {
  type: string
}): properties is ConnectionMessageType {
  return Object.values(ConnectionMessageTypes).includes(
    properties.type as ConnectionMessageTypes
  )
}

export { ConnectionMessageType, isConnectionMessage }

export * from './AcceptInvitation'
export * from './AcceptRequest'
export * from './ConnectionMessageTypes'
export * from './CreateInvitation'
export * from './GetConnectionById'
export * from './GetConnections'
export * from './ReceiveInvitation'
export * from './RemoveConnection'
export * from './SendBasicMessage'
export * from './SendPing'
export * from './EstablishInbound'
