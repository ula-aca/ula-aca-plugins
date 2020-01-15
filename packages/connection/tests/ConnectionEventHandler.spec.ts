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
  ConnectionEventMessage,
  BasicMessageEventMessage
} from '@ula-aca/aca-webhook-event-models'
import { ConnectionEventHandler } from '../src'

class ConnectionHandler extends ConnectionEventHandler {
  async onBasicMessage(): Promise<void> {}

  async onInit(): Promise<void> {}

  async onInvitation(): Promise<void> {}

  async onRequest(): Promise<void> {}

  async onResponse(): Promise<void> {}

  async onActive(): Promise<void> {}

  async onInactive(): Promise<void> {}

  async onError(): Promise<void> {}
}

describe('[package] @ula-aca/connection', () => {
  describe('[plugin] ConnectionEventHandler', () => {
    let eventHandler: EventHandler
    let connectionHandler: ConnectionHandler
    let connectionHandlerStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      connectionHandler = new ConnectionHandler()
      connectionHandler.initialize(eventHandler)
    })

    afterEach(() => {
      connectionHandlerStubbed && connectionHandlerStubbed.restore()
    })

    it("plugin name should be '@ula-aca/connection/ConnectionEventHandler'", () => {
      connectionHandler.name.should.equal(
        '@ula-aca/connection/ConnectionEventHandler'
      )
    })

    describe('[function] handleEvent()', () => {
      it("should return 'ignored' when an unknown message type is passed", async () => {
        const ignoreMessageTypes = [
          'get-connectios',
          'random-message',
          'a',
          'register-naim'
        ]

        for (const messageType of ignoreMessageTypes) {
          const message = new Message({
            type: messageType
          })

          const response = await connectionHandler.handleEvent(
            message,
            () => {}
          )
          response.should.equal('ignored')
        }
      })

      it("should return 'error' when a function throws", async () => {
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
          state: 'init',
          alias: 'Bob, providing quotes'
        }
        const expectedResult = 'error'

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onInit')
          .rejects()

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        const eventRes = await connectionHandler.handleEvent(message, () => {})

        eventRes.should.equal(expectedResult)
      })

      it('should call the callback with the error and statusCode 500 when a function throws', async () => {
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
          state: 'init',
          alias: 'Bob, providing quotes'
        }
        const error = new Error('Something went wrong')

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onInit')
          .rejects(error)

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          res.statusCode.should.equal(500)
          res.body.should.deep.equal({
            error
          })
        })
      })
    })

    describe('@ula-aca/connection-event events', () => {
      it('it should call the callback with an error if the connection state is not a known state', async () => {
        const data = {
          state: 'unknown'
        }

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          res.statusCode.should.equal(500)
        })
      })

      it('init status should result in onInit() callback call', async () => {
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
          state: 'init',
          alias: 'Bob, providing quotes'
        }

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onInit')
          .resolves()

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          connectionHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('invitation status should result in onInvitation() callback call', async () => {
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
          state: 'invitation',
          alias: 'Bob, providing quotes'
        }

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onInvitation')
          .resolves()

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          connectionHandlerStubbed.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('request status should result in onRequest() callback call', async () => {
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
          state: 'request',
          alias: 'Bob, providing quotes'
        }

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onRequest')
          .resolves()

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          connectionHandlerStubbed.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('response status should result in onResponse() callback call', async () => {
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
          state: 'response',
          alias: 'Bob, providing quotes'
        }

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onResponse')
          .resolves()

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          connectionHandlerStubbed.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('active status should result in onActive() callback call', async () => {
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

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onActive')
          .resolves()

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          connectionHandlerStubbed.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('inactive status should result in onInactive() callback call', async () => {
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
          state: 'inactive',
          alias: 'Bob, providing quotes'
        }

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onInactive')
          .resolves()

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        })

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          connectionHandlerStubbed.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('error status should result in onError() callback call', async () => {
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
          state: 'error',
          alias: 'Bob, providing quotes'
        }

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onError')
          .resolves()

        const message = new Message({
          type: '@ula-aca/connection-event',
          body: data
        } as ConnectionEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          connectionHandlerStubbed.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('received status should result in onBasicMessage() callback call', async () => {
        const data = {
          connection_id: 'some connection id',
          state: 'received',
          content: 'Hello',
          message_id: 'some message id'
        }

        connectionHandlerStubbed = sinon
          .stub(ConnectionHandler.prototype, 'onBasicMessage')
          .resolves()

        const message = new Message({
          type: '@ula-aca/basic-message-event',
          body: data
        } as BasicMessageEventMessage)

        await connectionHandler.handleEvent(message, (res: UlaResponse) => {
          connectionHandlerStubbed.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })
    })
  })
})
