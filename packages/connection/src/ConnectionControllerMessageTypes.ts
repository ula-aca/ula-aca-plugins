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

export enum ConnectionControllerMessageTypes {
  GET_ALL_CONNECTIONS = '@ula-aca/connection/get-all-connections',
  GET_CONNECTION_BY_ID = '@ula-aca/connection/get-connection-by-id',
  CREATE_INVITATION = '@ula-aca/connection/create-invitation',
  RECEIVE_INVITATION = '@ula-aca/connection/receive-invitation',
  ACCEPT_INVITATION = '@ula-aca/connection/accept-invitation',
  ACCEPT_REQUEST = '@ula-aca/connection/accept-request',
  ESTABLISH_INBOUND = '@ula-aca/connection/establish-inbound',
  REMOVE_CONNECTION = '@ula-aca/connection/remove-connection',
  SEND_PING = '@ula-aca/connection/send-ping',
  SEND_BASIC_MESSAGE = '@ula-aca/connection/basic-message'
}
