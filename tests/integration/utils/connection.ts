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

import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionMessageTypes,
  CreateInvitationBody,
  CreateInvitationMessage,
  ReceiveInvitationMessage,
  ReceiveInvitationBody,
  AcceptInvitationBody,
  AcceptInvitationMessage,
  AcceptRequestBody,
  AcceptRequestMessage,
  GetConnectionsBody,
  GetConnectionsMessage,
  GetConnectionByIdBody,
  GetConnectionByIdMessage,
  RemoveConnectionBody,
  RemoveConnectionMessage,
  EstablishInboundBody,
  EstablishInboundMessage,
  SendPingBody,
  SendPingMessage,
  SendBasicMessageBody,
  SendBasicMessageMessage
} from '@ula-aca/connection'

import { eventPromise } from '.'

const createInvitation = (
  eventHandler: EventHandler,
  body?: CreateInvitationBody
): Promise<UlaResponse> => {
  const message: CreateInvitationMessage = {
    type: ConnectionMessageTypes.CREATE_INVITATION,
    body
  }

  return eventPromise(eventHandler, message)
}

const receiveInvitation = (
  eventHandler: EventHandler,
  body: ReceiveInvitationBody
): Promise<UlaResponse> => {
  const message: ReceiveInvitationMessage = {
    type: ConnectionMessageTypes.RECEIVE_INVITATION,
    body
  }

  return eventPromise(eventHandler, message)
}

const acceptInvitation = (
  eventHandler: EventHandler,
  body: AcceptInvitationBody
): Promise<UlaResponse> => {
  const message: AcceptInvitationMessage = {
    type: ConnectionMessageTypes.ACCEPT_INVITATION,
    body
  }

  return eventPromise(eventHandler, message)
}

const acceptRequest = (
  eventHandler: EventHandler,
  body: AcceptRequestBody
): Promise<UlaResponse> => {
  const message: AcceptRequestMessage = {
    type: ConnectionMessageTypes.ACCEPT_REQUEST,
    body
  }

  return eventPromise(eventHandler, message)
}

const getConnections = (
  eventHandler: EventHandler,
  body?: GetConnectionsBody
): Promise<UlaResponse> => {
  const message: GetConnectionsMessage = {
    type: ConnectionMessageTypes.GET_CONNECTIONS,
    body
  }

  return eventPromise(eventHandler, message)
}

const getConnectionById = (
  eventHandler: EventHandler,
  body: GetConnectionByIdBody
): Promise<UlaResponse> => {
  const message: GetConnectionByIdMessage = {
    type: ConnectionMessageTypes.GET_CONNECTION_BY_ID,
    body
  }

  return eventPromise(eventHandler, message)
}

const removeConnection = (
  eventHandler: EventHandler,
  body: RemoveConnectionBody
): Promise<UlaResponse> => {
  const message: RemoveConnectionMessage = {
    type: ConnectionMessageTypes.REMOVE_CONNECTION,
    body
  }

  return eventPromise(eventHandler, message)
}

const establishInbound = (
  eventHandler: EventHandler,
  body: EstablishInboundBody
): Promise<UlaResponse> => {
  const message: EstablishInboundMessage = {
    type: ConnectionMessageTypes.ESTABLISH_INBOUND,
    body
  }

  return eventPromise(eventHandler, message)
}

const sendPing = (
  eventHandler: EventHandler,
  body: SendPingBody
): Promise<UlaResponse> => {
  const message: SendPingMessage = {
    type: ConnectionMessageTypes.SEND_PING,
    body
  }

  return eventPromise(eventHandler, message)
}

const sendBasicMessage = (
  eventHandler: EventHandler,
  body: SendBasicMessageBody
): Promise<UlaResponse> => {
  const message: SendBasicMessageMessage = {
    type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
    body
  }

  return eventPromise(eventHandler, message)
}

export {
  createInvitation,
  receiveInvitation,
  acceptInvitation,
  acceptRequest,
  getConnections,
  getConnectionById,
  removeConnection,
  establishInbound,
  sendPing,
  sendBasicMessage
}
