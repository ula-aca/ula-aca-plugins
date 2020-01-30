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
  CredentialExchangeRecordProposalSent,
  CredentialExchangeRecordProposalReceived,
  CredentialExchangeRecordOfferSent,
  CredentialExchangeRecordOfferReceived,
  CredentialExchangeRecordRequestSent,
  CredentialExchangeRecordRequestReceived,
  CredentialExchangeRecordIssued,
  CredentialExchangeRecordCredentialAcknowledged,
  CredentialExchangeRecordCredentialReceived,
  IssueCredentialEventMessage,
  CredentialExchangeRecordBase,
  CredentialExchangeRecordState
} from '@ula-aca/webhook-event-models'

import { IssueCredentialEventHandler } from '../src'

/* eslint-disable @typescript-eslint/no-unused-vars */
class IssueHandler extends IssueCredentialEventHandler {
  async onProposalSent(
    _message: CredentialExchangeRecordProposalSent
  ): Promise<void> {}

  async onProposalReceived(
    _message: CredentialExchangeRecordProposalReceived
  ): Promise<void> {}

  async onOfferSent(
    _message: CredentialExchangeRecordOfferSent
  ): Promise<void> {}

  async onOfferReceived(
    _message: CredentialExchangeRecordOfferReceived
  ): Promise<void> {}

  async onRequestSent(
    _message: CredentialExchangeRecordRequestSent
  ): Promise<void> {}

  async onRequestReceived(
    _message: CredentialExchangeRecordRequestReceived
  ): Promise<void> {}

  async onIssued(_message: CredentialExchangeRecordIssued): Promise<void> {}

  async onCredentialAcknowledged(
    _message: CredentialExchangeRecordCredentialAcknowledged
  ): Promise<void> {}

  async onCredentialReceived(
    _message: CredentialExchangeRecordCredentialReceived
  ): Promise<void> {}
}
/* eslint-enable @typescript-eslint/no-unused-vars */

describe('[package] @ula-aca/issue-credential', () => {
  describe('[plugin] IssueCredentialEventHandler', () => {
    let eventHandler: EventHandler
    let issueHandler: IssueHandler
    let issueHandlerStubbed: sinon.SinonStub<[any], Promise<void>>

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
    })

    describe('aca-present-proof-event events', () => {
      it('it should call the callback with an error if the connection state is not a known state', async () => {
        const data = {
          state: 'unknown'
        }

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          res.statusCode.should.equal(500)
        })
      })

      it('proposal_sent status should result in onProposalSent() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.PROPOSAL_SENT,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onProposalSent')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('proposal_received status should result in onProposalReceived() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.PROPOSAL_RECEIVED,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onProposalReceived')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('offer_sent status should result in onOfferSent() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.OFFER_SENT,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onOfferSent')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('offer_received status should result in onOfferReceived() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.OFFER_RECEIVED,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onOfferReceived')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('request_sent status should result in onRequestSent() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.REQUEST_SENT,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onRequestSent')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('request_received status should result in onRequestReceived() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.REQUEST_RECEIVED,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onRequestReceived')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('issued status should result in onIssued() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.ISSUED,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onIssued')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('credential_received status should result in onCredentialReceived() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.CREDENTIAL_RECEIVED,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onCredentialReceived')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })

      it('credential_acked status should result in onCredentialAcknowledged() callback call', async () => {
        const data: CredentialExchangeRecordBase = {
          raw_credential: '',
          parent_thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          auto_offer: false,
          credential_offer: '',
          state: CredentialExchangeRecordState.CREDENTIAL_ACKNOWLEDGED,
          credential_request: '',
          initiator: 'self',
          credential: '',
          credential_request_metadata: '',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          thread_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal_dict: { credential_proposal: { attributes: [] } },
          credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          error_msg: 'credential definition identifier is not set in proposal',
          auto_issue: false
        }

        issueHandlerStubbed = sinon
          .stub(IssueHandler.prototype, 'onCredentialAcknowledged')
          .resolves()

        const message = new Message({
          type: '@ula-aca/issue-credential-event',
          body: data
        } as IssueCredentialEventMessage)

        await issueHandler.handleEvent(message, (res: UlaResponse) => {
          issueHandlerStubbed.should.be.calledOnceWithExactly(data)
          res.statusCode.should.equal(200)
        })
      })
    })
  })
})
