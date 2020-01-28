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

import {
  Plugin,
  EventHandler,
  Message,
  UlaResponse
} from 'universal-ledger-agent'

import {
  Configuration,
  ConnectionApi,
  BasicmessageApi,
  TrustpingApi
} from '@ula-aca/aries-cloudagent-interface'

import { AxiosError } from 'axios'
import {
  ConnectionMessageTypes,
  isConnectionMessage,
  GetConnectionsBody,
  GetConnectionByIdBody,
  CreateInvitationBody,
  ReceiveInvitationBody,
  AcceptInvitationBody,
  AcceptRequestBody,
  EstablishInboundBody,
  RemoveConnectionBody,
  SendPingBody,
  SendBasicMessageBody,
  EstablishInboundResult,
  SendBasicMessageResult,
  RemoveConnectionResult
} from './messages'

class ConnectionController implements Plugin {
  protected eventHandler?: EventHandler

  private connectionApi: ConnectionApi

  private basicMessageApi: BasicmessageApi

  private trustPingApi: TrustpingApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.connectionApi = new ConnectionApi(apiConfig)
    this.basicMessageApi = new BasicmessageApi(apiConfig)
    this.trustPingApi = new TrustpingApi(apiConfig)
  }

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name(): string {
    return '@ula-aca/connection/ConnectionController'
  }

  private async getAllConnections({
    alias,
    initiator,
    invitation_key,
    my_did,
    state,
    their_did,
    their_role
  }: GetConnectionsBody = {}): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsGet(
      alias,
      initiator,
      invitation_key,
      my_did,
      state,
      their_did,
      their_role
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getConnectionById({
    connection_id
  }: GetConnectionByIdBody): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdGet(connection_id)

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createInvitation({
    alias,
    accept,
    public: _public,
    multi_use
  }: CreateInvitationBody = {}): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsCreateInvitationPost(
      alias,
      accept,
      _public,
      multi_use
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async receiveInvitation(
    body: ReceiveInvitationBody
  ): Promise<UlaResponse> {
    const { alias, accept, ...invitationBody } = body
    const response = await this.connectionApi.connectionsReceiveInvitationPost(
      alias,
      accept,
      invitationBody
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async acceptInvitation({
    connection_id,
    my_endpoint,
    my_label
  }: AcceptInvitationBody): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdAcceptInvitationPost(
      connection_id,
      my_endpoint,
      my_label
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async acceptRequest({
    connection_id,
    my_endpoint
  }: AcceptRequestBody): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdAcceptRequestPost(
      connection_id,
      my_endpoint
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async establishInbound({
    connection_id,
    ref_id
  }: EstablishInboundBody): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdEstablishInboundRefIdPost(
      connection_id,
      ref_id
    )

    const body = (response.data as unknown) as EstablishInboundResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async removeConnection({
    connection_id
  }: RemoveConnectionBody): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdRemovePost(
      connection_id
    )

    const body = (response.data as unknown) as RemoveConnectionResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async sendPing({
    connection_id,
    comment
  }: SendPingBody): Promise<UlaResponse> {
    const response = await this.trustPingApi.connectionsIdSendPingPost(
      connection_id,
      { comment }
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendBasicMessage({
    connection_id,
    content
  }: SendBasicMessageBody): Promise<UlaResponse> {
    const response = await this.basicMessageApi.connectionsIdSendMessagePost(
      connection_id,
      {
        content
      }
    )

    const body = (response.data as unknown) as SendBasicMessageResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  public async handleEvent(
    message: Message,
    callback: (res: UlaResponse) => Promise<void> | void
  ): Promise<string> {
    if (!isConnectionMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse
    try {
      switch (message.properties.type) {
        case ConnectionMessageTypes.GET_CONNECTIONS:
          response = await this.getAllConnections(message.properties.body)
          break
        case ConnectionMessageTypes.GET_CONNECTION_BY_ID:
          response = await this.getConnectionById(message.properties.body)
          break
        case ConnectionMessageTypes.CREATE_INVITATION:
          response = await this.createInvitation(message.properties.body)
          break
        case ConnectionMessageTypes.RECEIVE_INVITATION:
          response = await this.receiveInvitation(message.properties.body)
          break
        case ConnectionMessageTypes.ACCEPT_INVITATION:
          response = await this.acceptInvitation(message.properties.body)
          break
        case ConnectionMessageTypes.ACCEPT_REQUEST:
          response = await this.acceptRequest(message.properties.body)
          break
        case ConnectionMessageTypes.ESTABLISH_INBOUND:
          response = await this.establishInbound(message.properties.body)
          break
        case ConnectionMessageTypes.SEND_PING:
          response = await this.sendPing(message.properties.body)
          break
        case ConnectionMessageTypes.SEND_BASIC_MESSAGE:
          response = await this.sendBasicMessage(message.properties.body)
          break
        case ConnectionMessageTypes.REMOVE_CONNECTION:
          response = await this.removeConnection(message.properties.body)
          break
      }
    } catch (err) {
      const axiosErr = err as AxiosError

      if (axiosErr.response) {
        response = new UlaResponse({
          statusCode: axiosErr.response.status,
          body: {
            error: axiosErr.response.data
          }
        })
      } else if (axiosErr.toJSON) {
        // couldn't get repsonse
        response = new UlaResponse({
          statusCode: 500,
          body: {
            error: axiosErr.toJSON()
          }
        })
      } else {
        // not an axios error
        response = new UlaResponse({
          statusCode: 500,
          body: {
            error: err
          }
        })
      }
    }
    callback(response)
    return response.statusCode < 200 || response.statusCode >= 300
      ? 'error'
      : 'success'
  }
}

export { ConnectionController }
