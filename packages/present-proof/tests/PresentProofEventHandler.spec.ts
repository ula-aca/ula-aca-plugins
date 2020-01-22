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

import { stubInterfaceFunction } from '@ula-aca/test-utils'
import { PresentProofEventHandler } from '../src'

class ProofHandler extends PresentProofEventHandler {
  async onProposalSent(): Promise<void> {}

  async onProposalReceived(): Promise<void> {}

  async onRequestSent(): Promise<void> {}

  async onRequestReceived(): Promise<void> {}

  async onPresentationSent(): Promise<void> {}

  async onPresentationReceived(): Promise<void> {}

  async onVerified(): Promise<void> {}
}

describe('[package] @ula-aca/present-proof', () => {
  describe('[plugin] PresentProofController', () => {
    let eventHandler: EventHandler
    let proofHandler: ProofHandler
    let proofHandlerStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      proofHandler = new ProofHandler()
      proofHandler.initialize(eventHandler)
    })

    afterEach(() => {
      proofHandlerStubbed && proofHandlerStubbed.restore()
    })
    it("plugin name should be '@ula-aca/present-proof/PresentProofEventHandler'", () => {
      proofHandler.name.should.equal(
        '@ula-aca/present-proof/PresentProofEventHandler'
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

          const response = await proofHandler.handleEvent(message, () => {})
          response.should.equal('ignored')
        }
      })

      it("should return 'error' when a function throws", async () => {
        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'proposal_sent'
        }

        const expectedResult = 'error'

        proofHandlerStubbed = sinon
          .stub(ProofHandler.prototype, 'onProposalSent')
          .rejects()

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        const eventRes = await proofHandler.handleEvent(message, () => {})

        eventRes.should.equal(expectedResult)
      })

      it('should call the callback with the error and statusCode 500 when a function throws', async () => {
        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'proposal_sent'
        }
        const error = new Error('Something went wrong')

        proofHandlerStubbed = sinon
          .stub(ProofHandler.prototype, 'onProposalSent')
          .rejects(error)

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        await proofHandler.handleEvent(message, (res: UlaResponse) => {
          res.statusCode.should.equal(500)
          res.body.should.deep.equal({
            error
          })
        })
      })
    })

    describe('@ula-aca/present-proof-event events', () => {
      it('proposal_sent status should result in onProposalSent() callback call', async () => {
        const statusCode = 200

        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'proposal_sent'
        }

        proofHandlerStubbed = stubInterfaceFunction({
          Class: ProofHandler,
          functionName: 'onProposalSent',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        await proofHandler.handleEvent(message, (res: UlaResponse) => {
          proofHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('proposal_received status should result in onProposalReceived() callback call', async () => {
        const statusCode = 200

        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'proposal_received'
        }

        proofHandlerStubbed = stubInterfaceFunction({
          Class: ProofHandler,
          functionName: 'onProposalReceived',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        await proofHandler.handleEvent(message, (res: UlaResponse) => {
          proofHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('request_sent status should result in onRequestSent() callback call', async () => {
        const statusCode = 200

        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'request_sent'
        }

        proofHandlerStubbed = stubInterfaceFunction({
          Class: ProofHandler,
          functionName: 'onRequestSent',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        await proofHandler.handleEvent(message, (res: UlaResponse) => {
          proofHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('request_received status should result in onRequestReceived() callback call', async () => {
        const statusCode = 200

        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'request_received'
        }

        proofHandlerStubbed = stubInterfaceFunction({
          Class: ProofHandler,
          functionName: 'onRequestReceived',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        await proofHandler.handleEvent(message, (res: UlaResponse) => {
          proofHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('presentation_sent status should result in onPresentationSent() callback call', async () => {
        const statusCode = 200

        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'presentation_sent'
        }

        proofHandlerStubbed = stubInterfaceFunction({
          Class: ProofHandler,
          functionName: 'onPresentationSent',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        await proofHandler.handleEvent(message, (res: UlaResponse) => {
          proofHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('presentation_received status should result in onPresentationReceived() callback call', async () => {
        const statusCode = 200

        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'presentation_received'
        }

        proofHandlerStubbed = stubInterfaceFunction({
          Class: ProofHandler,
          functionName: 'onPresentationReceived',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        await proofHandler.handleEvent(message, (res: UlaResponse) => {
          proofHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('verified status should result in onVerified() callback call', async () => {
        const statusCode = 200

        const data = {
          presentation: {},
          error_msg: 'Invalid structure',
          verified: 'true',
          auto_present: false,
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          initiator: 'self',
          presentation_proposal_dict: {},
          role: 'prover',
          presentation_request: {},
          created_at: '2019-12-12 12:05:38Z',
          presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          updated_at: '2019-12-12 12:05:38Z',
          state: 'verified'
        }

        proofHandlerStubbed = stubInterfaceFunction({
          Class: ProofHandler,
          functionName: 'onVerified',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/present-proof-event',
          body: data
        })

        await proofHandler.handleEvent(message, (res: UlaResponse) => {
          proofHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
    })
  })
})
