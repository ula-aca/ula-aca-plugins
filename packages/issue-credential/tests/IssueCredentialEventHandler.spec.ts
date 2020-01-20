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

import { IssueCredentialEventHandler } from '../src'

class IssueHandler extends IssueCredentialEventHandler {
  async onProposalSent(): Promise<void> {}

  async onProposalReceived(): Promise<void> {}

  async onOfferSent(): Promise<void> {}

  async onOfferReceived(): Promise<void> {}

  async onRequestSent(): Promise<void> {}

  async onRequestReceived(): Promise<void> {}

  async onIssued(): Promise<void> {}

  async onCredentialAcknowledged(): Promise<void> {}

  async onCredentialReceived(): Promise<void> {}
}

describe('[package] @ula-aca/present-proof', () => {
  describe('[plugin] PresentProofController', () => {
    let eventHandler: EventHandler
    let issueHandler: IssueHandler
    let issueHandlerStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      issueHandler = new IssueHandler()
      issueHandler.initialize(eventHandler)
    })

    afterEach(() => {
      issueHandlerStubbed && issueHandlerStubbed.restore()
    })
    it("plugin name should be '@ula-aca/issue-credential/IssueCredentialEventHandler'", () => {
      issueHandler.name.should.equal(
        '@ula-aca/issue-credential/IssueCredentialEventHandler'
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

          const response = await issueHandler.handleEvent(message, () => {})
          response.should.equal('ignored')
        }
      })

      it("should return 'error' when statusCode is not in range 200-299", async () => {
        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'proposal_sent',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }
        const statusCode = 300
        const expectedResult = 'error'

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onProposalSent',
          data,
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          body: {}
        })

        const eventRes = await issueHandler.handleEvent(message, () => {})

        eventRes.should.equal(expectedResult)
      })
      it('should call the callback with the error and statusCode when an API call fails', async () => {
        const data = '400: Bad Request'
        const statusCode = 400

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onProposalSent',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          body: {}
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          res.statusCode.should.equal(500)
        })
      })
    })

    describe('aca-present-proof-event events', () => {
      it('proposal_sent status should result in onProposalSent() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'proposal_sent',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onProposalSent',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('proposal_received status should result in onProposalReceived() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'proposal_received',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onProposalReceived',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('offer_sent status should result in onOfferSent() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'offer_sent',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onOfferSent',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('offer_received status should result in onOfferReceived() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'offer_received',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onOfferReceived',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('request_sent status should result in onRequestSent() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'request_sent',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onRequestSent',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('request_received status should result in onRequestReceived() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'request_received',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onRequestReceived',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('issued status should result in onIssued() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'issued',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onIssued',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('credential_received status should result in onCredentialReceived() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'credential_received',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onCredentialReceived',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
      it('credential_acked status should result in onCredentialAcknowledged() callback call', async () => {
        const statusCode = 200

        const data = {
          raw_credential: {},
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          role: 'issuer',
          credential_offer: {},
          state: 'credential_acked',
          credential_request: {},
          initiator: 'self',
          credential: {},
          created_at: '2019-12-12 12:05:38Z',
          credential_request_metadata: {},
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: {},
          updated_at: '2019-12-12 12:05:38Z',
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = stubInterfaceFunction({
          Class: IssueHandler,
          functionName: 'onCredentialAcknowledged',
          status: statusCode
        })

        const message = new Message({
          type: 'aca-issue-credential-event',
          payload: data
        })

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.calledWith(data).should.be.ok
          res.statusCode.should.equal(200)
        })
      })
    })
  })
})
