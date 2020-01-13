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

import { IssueCredentialApi } from '@ula-aca/aries-cloudagent-interface'
import { stubInterfaceFunction } from '@ula-aca/test-utils'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  GetExchangeRecordsMessage,
  GetExchangeRecordByIdMessage,
  SendCredentialMessage,
  SendProposalMessage,
  SendOfferByIdMessage,
  SendRequestMessage,
  StoreMessage,
  ProblemReportMessage,
  GetMemeTypesMessage,
  SendOfferMessage,
  IssueMessage,
  RemoveExchangeRecordMessage
} from '../src'

describe('[package] @ula-aca/issue-credential', () => {
  describe('[plugin] IssueCredentialController', () => {
    let eventHandler: EventHandler
    let issueCredentialControllerPlugin: IssueCredentialController
    let issueCredentialApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      issueCredentialControllerPlugin = new IssueCredentialController(
        'http://url.test'
      )
      issueCredentialControllerPlugin.initialize(eventHandler)
    })

    afterEach(() => {
      issueCredentialApiStubbed && issueCredentialApiStubbed.restore()
    })
    it("plugin name should be '@ula-aca/issue-credential/IssueCredentialController'", () => {
      issueCredentialControllerPlugin.name.should.equal(
        '@ula-aca/issue-credential/IssueCredentialController'
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

          const response = await issueCredentialControllerPlugin.handleEvent(
            message,
            () => {}
          )

          response.should.equal('ignored')
        }
      })
      it("should return 'error' when statusCode is not in range 200-299", async () => {
        const data = {
          results: [
            {
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
              error_msg:
                'credential definition identifier is not set in proposal',
              auto_issue: false
            }
          ]
        }
        const statusCode = 300
        const expectedResult = 'error'

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.GET_EXCHANGE_RECORDS
        } as GetExchangeRecordsMessage)

        const eventRes = await issueCredentialControllerPlugin.handleEvent(
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

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsGet',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.GET_EXCHANGE_RECORDS,
          body: {}
        } as GetExchangeRecordsMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })

    describe('events', () => {
      it('@ula-aca/issue-credential/get-meme-types', async () => {
        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialMimeTypesCredentialIdGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.GET_MEME_TYPES,
          body: {}
        } as GetMemeTypesMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/get-exchange-records', async () => {
        const data = {
          results: [
            {
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
              error_msg:
                'credential definition identifier is not set in proposal',
              auto_issue: false
            }
          ]
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.GET_EXCHANGE_RECORDS,
          body: {}
        } as GetExchangeRecordsMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/get-exchange-record-by-id', async () => {
        const credential_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsCredExIdGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.GET_EXCHANGE_RECORD_BY_ID,
          body: {
            credential_id
          }
        } as GetExchangeRecordByIdMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/send-credential', async () => {
        const credential_proposal_req = {
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal: {
            '@type':
              'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview',
            attributes: [
              {
                name: 'favourite_drink',
                'mime-type': 'image/jpeg',
                value: 'martini'
              }
            ]
          },
          issuer_did: 'WgWxqztrNooG92RXvxSTWv',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          comment: 'string',
          cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          schema_name: 'preferences',
          schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
          schema_version: '1.0'
        }

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

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialSendPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.SEND_CREDENTIAL,
          body: credential_proposal_req
        } as SendCredentialMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/send-proposal', async () => {
        const credential_proposal_req = {
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          credential_proposal: {
            '@type':
              'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview',
            attributes: [
              {
                name: 'favourite_drink',
                'mime-type': 'image/jpeg',
                value: 'martini'
              }
            ]
          },
          issuer_did: 'WgWxqztrNooG92RXvxSTWv',
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          comment: 'string',
          cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          schema_name: 'preferences',
          schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
          schema_version: '1.0'
        }

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

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialSendProposalPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.SEND_PROPOSAL,
          body: credential_proposal_req
        } as SendProposalMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/send-offer', async () => {
        const credential_offer_req = {
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          comment: 'string',
          cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          credential_preview: {
            '@type':
              'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview',
            attributes: [
              {
                name: 'favourite_drink',
                'mime-type': 'image/jpeg',
                value: 'martini'
              }
            ]
          },
          auto_issue: true
        }

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

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialSendOfferPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.SEND_OFFER,
          body: credential_offer_req
        } as SendOfferMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/send-offer-by-id', async () => {
        const credential_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsCredExIdSendOfferPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.SEND_OFFER_BY_ID,
          body: {
            cred_ex_id: credential_exchange_id
          }
        } as SendOfferByIdMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/send-request', async () => {
        const credential_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsCredExIdSendRequestPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.SEND_REQUEST,
          body: {
            cred_ex_id: credential_exchange_id
          }
        } as SendRequestMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/issue', async () => {
        const cred_issue_req = {
          credential_preview: {
            '@type':
              'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview',
            attributes: [
              {
                name: 'favourite_drink',
                'mime-type': 'image/jpeg',
                value: 'martini'
              }
            ]
          },
          comment: 'string'
        }

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

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsCredExIdIssuePost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.ISSUE,
          body: cred_issue_req
        } as IssueMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/store', async () => {
        const credential_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsCredExIdStorePost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.STORE,
          body: {
            cred_ex_id: credential_exchange_id
          }
        } as StoreMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/problem-report', async () => {
        const credential_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const report_text = 'hey I have a problem'

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: {},
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsCredExIdProblemReportPost',
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.PROBLEM_REPORT,
          body: {
            cred_ex_id: credential_exchange_id,
            explain_ltxt: report_text
          }
        } as ProblemReportMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/issue-credential/remove-exchange-record', async () => {
        const credential_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const statusCode = 200
        const expectedResult = new UlaResponse({
          body: {},
          statusCode
        })

        issueCredentialApiStubbed = stubInterfaceFunction({
          Class: IssueCredentialApi,
          functionName: 'issueCredentialRecordsCredExIdRemovePost',
          status: statusCode
        })

        const message = new Message({
          type: IssueCredentialMessageTypes.REMOVE_EXCHANGE_RECORD,
          body: {
            cred_ex_id: credential_exchange_id
          }
        } as RemoveExchangeRecordMessage)

        await issueCredentialControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            issueCredentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })
  })
})
