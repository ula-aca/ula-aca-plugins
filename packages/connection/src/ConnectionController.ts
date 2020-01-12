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
  TrustpingApi,
  ConnectionInvitation
} from '@ula-aca/aries-cloudagent-interface'

import { ConnectionControllerMessageTypes } from '.'

import * as models from './connection-controller-message-models'

export default class ConnectionController implements Plugin {
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

  private async getAllConnections(): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsGet()
    return new UlaResponse({
      statusCode: response.status,
      body: response.data.results
    })
  }

  private async getConnectionById(connectionId: string): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdGet(connectionId)
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createInvitation(): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsCreateInvitationPost()

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async receiveInvitation(
    invitation: ConnectionInvitation
  ): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsReceiveInvitationPost(
      undefined,
      undefined,
      invitation
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async acceptInvitation(connectionId: string): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdAcceptInvitationPost(
      connectionId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async acceptRequest(connectionId: string): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdAcceptRequestPost(
      connectionId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  // TODO implement establishInbound()

  private async removeConnection(connectionId: string): Promise<UlaResponse> {
    const response = await this.connectionApi.connectionsIdRemovePost(
      connectionId
    )

    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  private async sendPing(connectionId: string): Promise<UlaResponse> {
    const response = await this.trustPingApi.connectionsIdSendPingPost(
      connectionId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendBasicMessage(
    connectionId: string,
    message: string
  ): Promise<UlaResponse> {
    const response = await this.basicMessageApi.connectionsIdSendMessagePost(
      connectionId,
      {
        content: message
      }
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  public async handleEvent(message: Message, callback: any): Promise<string> {
    if (
      !Object.values(ConnectionControllerMessageTypes).includes(
        message.properties.type
      )
    ) {
      return 'ignored'
    }

    // TODOC: Document messages and their properties
    let response: UlaResponse = null
    switch (message.properties.type) {
      case ConnectionControllerMessageTypes.GET_ALL_CONNECTIONS:
        response = await this.getAllConnections()
        break
      case ConnectionControllerMessageTypes.GET_CONNECTION_BY_ID:
        response = await this.getConnectionById(message.properties.connectionId)
        break
      case ConnectionControllerMessageTypes.CREATE_INVITATION:
        response = await this.createInvitation()
        break
      case ConnectionControllerMessageTypes.RECEIVE_INVITATION:
        response = await this.receiveInvitation(message.properties.invitation)
        break
      case ConnectionControllerMessageTypes.ACCEPT_INVITATION:
        response = await this.acceptInvitation(message.properties.connectionId)
        break
      case ConnectionControllerMessageTypes.ACCEPT_REQUEST:
        response = await this.acceptRequest(message.properties.connectionId)
        break
      case ConnectionControllerMessageTypes.SEND_PING:
        response = await this.sendPing(message.properties.connectionId)
        break
      case ConnectionControllerMessageTypes.SEND_BASIC_MESSAGE:
        response = await this.sendBasicMessage(
          message.properties.connectionId,
          message.properties.message
        )
        break
      case ConnectionControllerMessageTypes.ESTABLISH_INBOUND:
        throw Error('Message not (yet) implemented!')
      case ConnectionControllerMessageTypes.REMOVE_CONNECTION:
        response = await this.removeConnection(message.properties.connectionId)
        break
    }
    callback(response)
    return 'success'
  }
}
