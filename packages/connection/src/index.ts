/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
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
} from 'aries-cloudagent-interface'

export default class AcaConnections implements Plugin {
  private eventHandler?: EventHandler

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
    return 'AcaConnections'
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

  private async basicMessage(
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

  async handleEvent(message: Message, callback: any): Promise<string> {
    // TODOC: Document messages and their properties
    let response: UlaResponse
    switch (message.properties.type) {
      case 'get-all-connections':
        response = await this.getAllConnections()
        break
      case 'get-connection-by-id':
        response = await this.getConnectionById(message.properties.connectionId)
        break
      case 'create-invitation':
        response = await this.createInvitation()
        break
      case 'receive-invitation':
        response = await this.receiveInvitation(message.properties.invitation)
        break
      case 'accept-invitation':
        response = await this.acceptInvitation(message.properties.connectionId)
        break
      case 'accept-request':
        response = await this.acceptInvitation(message.properties.connectionId)
        break
      case 'establish-inbound':
        throw Error('Message not implemented!')
      case 'remove-connection':
        response = await this.removeConnection(message.properties.connectionId)
        break
      case 'basic-message':
        response = await this.basicMessage(
          message.properties.connectionId,
          message.properties.message
        )
        break
      default:
        throw Error(`Unknown message type: ${message.properties.type}`)
    }
    if (response.statusCode > 200 && response.statusCode < 300) {
      console.warn('Bad request: ', response.body)
    }

    console.log(response)

    await callback(response)
    return 'success'
  }
}
