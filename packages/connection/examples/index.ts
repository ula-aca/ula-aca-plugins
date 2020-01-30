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
  GetConnectionsResult,
  GetConnectionsBody,
  ConnectionMessageTypes,
  GetConnectionsMessage,
  GetConnectionByIdBody,
  GetConnectionByIdResult,
  GetConnectionByIdMessage,
  CreateInvitationBody,
  CreateInvitationResult,
  CreateInvitationMessage,
  ReceiveInvitationBody,
  ReceiveInvitationResult,
  ReceiveInvitationMessage,
  AcceptInvitationBody,
  AcceptInvitationResult,
  AcceptInvitationMessage,
  AcceptRequestBody,
  AcceptRequestResult,
  AcceptRequestMessage,
  EstablishInboundBody,
  EstablishInboundResult,
  EstablishInboundMessage,
  RemoveConnectionBody,
  RemoveConnectionResult,
  RemoveConnectionMessage,
  SendPingBody,
  SendPingResult,
  SendPingMessage,
  SendBasicMessageBody,
  SendBasicMessageResult,
  SendBasicMessageMessage
} from '../src'

async function getConnections(
  eventHandler: EventHandler,
  body?: GetConnectionsBody
): Promise<GetConnectionsResult> {
  return new Promise((resolve, reject) => {
    const message: GetConnectionsMessage = {
      type: ConnectionMessageTypes.GET_CONNECTIONS,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetConnectionsResult = response.body
      resolve(result)
    })
  })
}

async function getConnectionById(
  eventHandler: EventHandler,
  body: GetConnectionByIdBody
): Promise<GetConnectionByIdResult> {
  return new Promise((resolve, reject) => {
    const message: GetConnectionByIdMessage = {
      type: ConnectionMessageTypes.GET_CONNECTION_BY_ID,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetConnectionByIdResult = response.body
      resolve(result)
    })
  })
}

async function createInvitation(
  eventHandler: EventHandler,
  body?: CreateInvitationBody
): Promise<CreateInvitationResult> {
  return new Promise((resolve, reject) => {
    const message: CreateInvitationMessage = {
      type: ConnectionMessageTypes.CREATE_INVITATION,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: CreateInvitationResult = response.body
      resolve(result)
    })
  })
}

async function receiveInvitation(
  eventHandler: EventHandler,
  body: ReceiveInvitationBody
): Promise<ReceiveInvitationResult> {
  return new Promise((resolve, reject) => {
    const message: ReceiveInvitationMessage = {
      type: ConnectionMessageTypes.RECEIVE_INVITATION,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: ReceiveInvitationResult = response.body
      resolve(result)
    })
  })
}

async function acceptInvitation(
  eventHandler: EventHandler,
  body: AcceptInvitationBody
): Promise<AcceptInvitationResult> {
  return new Promise((resolve, reject) => {
    const message: AcceptInvitationMessage = {
      type: ConnectionMessageTypes.ACCEPT_INVITATION,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: AcceptInvitationResult = response.body
      resolve(result)
    })
  })
}

async function acceptRequest(
  eventHandler: EventHandler,
  body: AcceptRequestBody
): Promise<AcceptRequestResult> {
  return new Promise((resolve, reject) => {
    const message: AcceptRequestMessage = {
      type: ConnectionMessageTypes.ACCEPT_REQUEST,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: AcceptRequestResult = response.body
      resolve(result)
    })
  })
}

async function establishInbound(
  eventHandler: EventHandler,
  body: EstablishInboundBody
): Promise<EstablishInboundResult> {
  return new Promise((resolve, reject) => {
    const message: EstablishInboundMessage = {
      type: ConnectionMessageTypes.ESTABLISH_INBOUND,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: EstablishInboundResult = response.body
      resolve(result)
    })
  })
}

async function removeConnection(
  eventHandler: EventHandler,
  body: RemoveConnectionBody
): Promise<RemoveConnectionResult> {
  return new Promise((resolve, reject) => {
    const message: RemoveConnectionMessage = {
      type: ConnectionMessageTypes.REMOVE_CONNECTION,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: RemoveConnectionResult = response.body
      resolve(result)
    })
  })
}

async function sendPing(
  eventHandler: EventHandler,
  body: SendPingBody
): Promise<SendPingResult> {
  return new Promise((resolve, reject) => {
    const message: SendPingMessage = {
      type: ConnectionMessageTypes.SEND_PING,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendPingResult = response.body
      resolve(result)
    })
  })
}

async function sendBasicMessage(
  eventHandler: EventHandler,
  body: SendBasicMessageBody
): Promise<SendBasicMessageResult> {
  return new Promise((resolve, reject) => {
    const message: SendBasicMessageMessage = {
      type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendBasicMessageResult = response.body
      resolve(result)
    })
  })
}

export {
  getConnections,
  getConnectionById,
  createInvitation,
  receiveInvitation,
  acceptInvitation,
  acceptRequest,
  establishInbound,
  removeConnection,
  sendPing,
  sendBasicMessage
}
