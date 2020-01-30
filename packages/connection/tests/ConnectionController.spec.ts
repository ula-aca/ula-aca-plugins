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
import sinon from 'sinon'
import { EventHandler, Message, UlaResponse } from 'universal-ledger-agent'

import {
  ConnectionApi,
  TrustpingApi,
  BasicmessageApi
} from '@ula-aca/aries-cloudagent-interface'
import { stubInterfaceFunction } from '@ula-aca/test-utils'
import { PairwiseConnectionRecordState } from '@ula-aca/webhook-event-models'

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
  SendPingMessage,
  GetConnectionsBody
} from '../src'

describe('[package] @ula-aca/connection', () => {
  describe('[plugin] ConnectionController', () => {
    let eventHandler: EventHandler
    let connectionControllerPlugin: ConnectionController
    let connectionApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      connectionControllerPlugin = new ConnectionController()
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
    })

    describe('events', () => {
      describe('@ula-aca/connection/get-connections', () => {
        it('should pass the parameters to ConnectionApi function connectionsGet', async () => {
          const data = {
            results: [
              {
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
            ]
          }
          const statusCode = 200

          const body: GetConnectionsBody = {
            alias: 'Bob, providing quotes',
            initiator: 'self',
            invitation_key: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV',
            my_did: 'WgWxqztrNooG92RXvxSTWv',
            state: PairwiseConnectionRecordState.ACTIVE,
            their_did: 'WgWxqztrNooG92RXvxSTWv',
            their_role: 'Point of contact'
          }

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
            body
          } as GetConnectionsMessage)

          await connectionControllerPlugin.handleEvent(
            message,
            (res: UlaResponse) => {
              connectionApiStubbed.should.have.been.calledOnceWithExactly(
                body.alias,
                body.initiator,
                body.invitation_key,
                body.my_did,
                body.state,
                body.their_did,
                body.their_role
              )
              res.should.deep.equal(expectedResult)
            }
          )
        })

        it('should work when no body is passed', async () => {
          const data = {
            results: [
              {
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
            ]
          }
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
            type: ConnectionMessageTypes.GET_CONNECTIONS
          } as GetConnectionsMessage)

          await connectionControllerPlugin.handleEvent(
            message,
            (res: UlaResponse) => {
              connectionApiStubbed.should.have.been.calledOnce
              res.should.deep.equal(expectedResult)
            }
          )
        })
      })

      it('@ula-aca/connection/get-connection-by-id', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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
            connectionApiStubbed.should.have.been.calledOnceWithExactly(
              connection_id
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      describe('@ula-aca/connection/create-invitation', () => {
        it('should pass the parameters to ConnectionApi function connectionsCreateInvitationPost', async () => {
          const alias = 'My Conn'
          const accept = 'auto'
          const publicVar = 'public'
          const multiUse = 'multiUse'

          const data = {
            connection_id: '9711acba-6609-4213-bbf2-ac87ee73b936',
            invitation: {
              '@type':
                'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation',
              '@id': 'efe55823-6d44-4fff-82fa-d11d6ff4f303',
              recipientKeys: ['EZFomuXpkDp2Jo9Ns8jHrRN9qzA1sPzP9oQqNmqJVffU'],
              label: 'Alice Agent',
              serviceEndpoint: 'http://alice-aca-py:8000'
            },
            invitation_url:
              'http://alice-aca-py:8000?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiZWZlNTU4MjMtNmQ0NC00ZmZmLTgyZmEtZDExZDZmZjRmMzAzIiwgInJlY2lwaWVudEtleXMiOiBbIkVaRm9tdVhwa0RwMkpvOU5zOGpIclJOOXF6QTFzUHpQOW9RcU5tcUpWZmZVIl0sICJsYWJlbCI6ICJBbGljZSBBZ2VudCIsICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2FsaWNlLWFjYS1weTo4MDAwIn0='
          }
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
              alias,
              accept,
              public: publicVar,
              multi_use: multiUse
            }
          } as CreateInvitationMessage)

          await connectionControllerPlugin.handleEvent(
            message,
            (res: UlaResponse) => {
              connectionApiStubbed.should.have.been.calledOnceWithExactly(
                alias,
                accept,
                publicVar,
                multiUse
              )
              res.should.deep.equal(expectedResult)
            }
          )
        })

        it('should work when no body is passed', async () => {
          const data = {
            connection_id: '9711acba-6609-4213-bbf2-ac87ee73b936',
            invitation: {
              '@type':
                'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation',
              '@id': 'efe55823-6d44-4fff-82fa-d11d6ff4f303',
              recipientKeys: ['EZFomuXpkDp2Jo9Ns8jHrRN9qzA1sPzP9oQqNmqJVffU'],
              label: 'Alice Agent',
              serviceEndpoint: 'http://alice-aca-py:8000'
            },
            invitation_url:
              'http://alice-aca-py:8000?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiZWZlNTU4MjMtNmQ0NC00ZmZmLTgyZmEtZDExZDZmZjRmMzAzIiwgInJlY2lwaWVudEtleXMiOiBbIkVaRm9tdVhwa0RwMkpvOU5zOGpIclJOOXF6QTFzUHpQOW9RcU5tcUpWZmZVIl0sICJsYWJlbCI6ICJBbGljZSBBZ2VudCIsICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2FsaWNlLWFjYS1weTo4MDAwIn0='
          }
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
            type: ConnectionMessageTypes.CREATE_INVITATION
          } as CreateInvitationMessage)

          await connectionControllerPlugin.handleEvent(
            message,
            (res: UlaResponse) => {
              connectionApiStubbed.should.have.been.calledOnce
              res.should.deep.equal(expectedResult)
            }
          )
        })
      })

      it('@ula-aca/connection/accept-invitation', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const my_label = 'MYLABEL'
        const my_endpoint = 'http://alice-aca-py:8000'

        const data = {
          my_did: 'FamApy5DRyvQr2NMnrKnQz',
          connection_id: 'd7dfbcd4-a803-4df7-bf46-d77211c7baeb',
          their_label: 'Faber Agent',
          initiator: 'external',
          invitation_mode: 'once',
          routing_state: 'none',
          accept: 'manual',
          invitation_key: '85MPLpTB7s2wwBuoHhjwSm68tB4zbtsHGGxjKHsnt1cb',
          request_id: '2f813644-a2b8-4bbb-988a-158cfe3220aa',
          created_at: '2020-01-15 19:03:38.039625Z',
          updated_at: '2020-01-15 19:03:51.555091Z',
          state: 'request',
          alias: '8002'
        }
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
            connection_id,
            my_endpoint,
            my_label
          }
        } as AcceptInvitationMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnceWithExactly(
              connection_id,
              my_endpoint,
              my_label
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/connection/accept-request', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const my_endpoint = 'http://alice-aca-py:8000'

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
          functionName: 'connectionsIdAcceptRequestPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: ConnectionMessageTypes.ACCEPT_REQUEST,
          body: {
            connection_id,
            my_endpoint
          }
        } as AcceptRequestMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnceWithExactly(
              connection_id,
              my_endpoint
            )
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
            connectionApiStubbed.should.have.been.calledOnceWithExactly(
              connection_id,
              ref_id
            )
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
            connectionApiStubbed.should.have.been.calledOnceWithExactly(
              connection_id
            )
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
        const alias = 'alias'
        const accept = 'auto'

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
            ...invitation,
            alias,
            accept
          }
        } as ReceiveInvitationMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnceWithExactly(
              alias,
              accept,
              invitation
            )
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
            connectionApiStubbed.should.have.been.calledOnceWithExactly(
              connection_id,
              { content }
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/connection/send-trust-ping', async () => {
        const connection_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const comment = 'string'

        const data = {
          thread_id: '3689faf6-adec-467a-8aea-f86a3799a01a'
        }
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
            connection_id,
            comment
          }
        } as SendPingMessage)

        await connectionControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            connectionApiStubbed.should.have.been.calledOnceWithExactly(
              connection_id,
              { comment }
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })
  })
})
