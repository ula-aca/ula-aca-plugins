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
import { EventHandler, Message, UlaResponse } from 'universal-ledger-agent'

import sinon from 'sinon'
import {
  ConnectionApi,
  TrustpingApi,
  BasicmessageApi
} from '@ula-aca/aries-cloudagent-interface'
import { stubInterfaceFunction } from '@ula-aca/test-utils'

import {
  ConnectionController,
  ConnectionMessageTypes,
  GetConnectionsMessage,
  CreateInvitationMessage,
  AcceptInvitationMessage,
  GetConnectionByIdMessage,
  AcceptRequestMessage,
  RemoveConnectionMessage,
  ReceiveInvitationMessage,
  SendBasicMessageMessage,
  EstablishInboundMessage,
  SendPingMessage
} from '../src'

describe('[package] @ula-aca/connection', () => {
  describe('[plugin] ConnectionController', () => {
    let eventHandler: EventHandler
    let connectionControllerPlugin: ConnectionController
    let connectionApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      connectionControllerPlugin = new ConnectionController('http://url.test')
      connectionControllerPlugin.initialize(eventHandler)
    })

    afterEach(() => {
      connectionApiStubbed && connectionApiStubbed.restore()
    })
    it("plugin name should be '@ula-aca/connection/ConnectionController'", () => {
      connectionControllerPlugin.name.should.equal(
        '@ula-aca/connection/ConnectionController'
      )
    })

    describe('[function] handleEvent()', () => {
      it("should return 'ignored' when an unknown message type is passed", async () => {
        const ignoreMessageTypes = [
          'get-connections',
          'random-message',
          'a',
          'register-naim'
        ]

        for (const messageType of ignoreMessageTypes) {
          const message = new Message({
            type: messageType
          })

          const response = await connectionControllerPlugin.handleEvent(
            message,
            () => {}
          )

          response.should.equal('ignored')
        }
      })
      it("should return 'error' when statusCode is not in range 200-299", async () => {
        const statusCode = 300
        const expectedResult = 'error'

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsGet',
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.GET_CONNECTIONS,
          body: {}
        } as GetConnectionsMessage)

        const eventRes = await connectionControllerPlugin.handleEvent(
          message,
          () => {}
        )

        eventRes.should.equal(expectedResult)
      })
      it('should call the callback with the error and statusCode when an API call fails', async () => {
        const data = '400: Bad Request'
        const statusCode = 400

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsCreateInvitationPost',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type: ConnectionMessageTypes.CREATE_INVITATION,
          body: {}
        } as CreateInvitationMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })

    describe('events', () => {
      it('@ula-aca/connection/get-connections', async () => {
        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.GET_CONNECTIONS,
          body: {}
        } as GetConnectionsMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/get-connection-by-id', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsIdGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.GET_CONNECTION_BY_ID,
          body: {
            connection_id
          }
        } as GetConnectionByIdMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/create-invitation', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsCreateInvitationPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.CREATE_INVITATION,
          body: {
            connection_id
          }
        } as CreateInvitationMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/accept-invitation', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsIdAcceptInvitationPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.ACCEPT_INVITATION,
          body: {
            connection_id
          }
        } as AcceptInvitationMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/accept-request', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsIdAcceptRequestPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.ACCEPT_REQUEST,
          body: {
            connection_id
          }
        } as AcceptRequestMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/establish-inbound', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const ref_id = '4562-b3fc-2c963f66afa6-3fa85f64-5717'
        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsIdEstablishInboundRefIdPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.ESTABLISH_INBOUND,
          body: {
            connection_id,
            ref_id
          }
        } as EstablishInboundMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/establish-inbound', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const ref_id = '4562-b3fc-2c963f66afa6-3fa85f64-5717'
        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsIdEstablishInboundRefIdPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.ESTABLISH_INBOUND,
          body: {
            connection_id,
            ref_id
          }
        } as EstablishInboundMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/remove-connection', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsIdRemovePost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.REMOVE_CONNECTION,
          body: {
            connection_id
          }
        } as RemoveConnectionMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/receive-invitation', async () => {
        const invitation = {
          recipientKeys: ['H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'],
          did: 'WgWxqztrNooG92RXvxSTWv',
          routingKeys: ['H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'],
          label: 'Bob',
          imageUrl: 'http://192.168.56.101/img/logo.jpg',
          '@id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          serviceEndpoint: 'http://192.168.56.101:8020'
        }

        const data = {
          my_did: 'WgWxqztrNooG92RXvxSTWv',
          inbound_connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          their_label: 'Bob',
          initiator: 'self',
          invitation_mode: 'once',
          their_did: 'WgWxqztrNooG92RXvxSTWv',
          routing_state: 'active',
          accept: 'auto',
          invitation_key: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV',
          their_role: 'Point of contact',
          request_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          created_at: '2019-12-12 12:05:38Z',
          error_msg: 'No DIDDoc provided; cannot connect to public DID',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'active',
          alias: 'Bob, providing quotes'
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: ConnectionApi,
          functionName: 'connectionsReceiveInvitationPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.RECEIVE_INVITATION,
          body: {
            ...invitation
          }
        } as ReceiveInvitationMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/send-basic-message', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const content = 'test message'
        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: BasicmessageApi,
          functionName: 'connectionsIdSendMessagePost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
          body: {
            connection_id,
            content
          }
        } as SendBasicMessageMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/connection/send-trust-ping', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        connectionApiStubbed = stubInterfaceFunction({
          Class: TrustpingApi,
          functionName: 'connectionsIdSendPingPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.SEND_PING,
          body: {
            connection_id
          }
        } as SendPingMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })
  })
})
