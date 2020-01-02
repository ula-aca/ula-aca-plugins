/*
 * Copyright 2019 ula-aca.
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

import { ConnectionControllerMessageTypes } from './ConnectionControllerMessageTypes'

export interface GetAllConnections {
  type: ConnectionControllerMessageTypes.GET_ALL_CONNECTIONS
}

export interface GetConnectionById {
  type: ConnectionControllerMessageTypes.GET_CONNECTION_BY_ID
  connectionId: string
}

export interface CreateInvitation {
  type: ConnectionControllerMessageTypes.CREATE_INVITATION
}

export interface ReceiveInvitation {
  type: ConnectionControllerMessageTypes.RECEIVE_INVITATION
  invitation: string
}

export interface AcceptInvitation {
  type: ConnectionControllerMessageTypes.ACCEPT_INVITATION
  connectionId: string
}

export interface AcceptRequest {
  type: ConnectionControllerMessageTypes.ACCEPT_REQUEST
  connectionId: string
}

export interface RemoveConnection {
  type: ConnectionControllerMessageTypes.REMOVE_CONNECTION
  connectionId: string
}

export interface SendPing {
  type: ConnectionControllerMessageTypes.SEND_PING
  connectionId: string
}

export interface SendBasicMessage {
  type: ConnectionControllerMessageTypes.SEND_BASIC_MESSAGE
  connectionId: string
  message: string
}
