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

import { PresentProofApi } from '@ula-aca/aries-cloudagent-interface'
import { stubInterfaceFunction } from '@ula-aca/test-utils'

import {
  PresentProofController,
  GetExchangeRecordsMessage,
  GetRequestCredentialsMessage,
  GetPresentationRequestCredentialsByReferentIdMessage,
  SendProposalMessage,
  CreatePresentationRequestMessage,
  SendRequestMessage,
  SendRequestByIdMessage,
  SendPresentationMessage,
  VerifyPresentationMessage,
  RemoveExchangeRecordMessage,
  PresentProofMessageTypes,
  GetExchangeRecordByIdMessage
} from '../src'

const presentationRequestRequest = {
  connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  comment: 'string',
  proof_request: {
    name: 'Proof request',
    requested_attributes: {
      additionalProp1: {
        name: 'favouriteDrink',
        restrictions: [
          {
            schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
            issuer_did: 'WgWxqztrNooG92RXvxSTWv',
            cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
            schema_name: 'transcript',
            schema_version: '1.0',
            schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
            credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
          }
        ],
        non_revoked: {
          to_epoch: 1576152338,
          from_epoch: 1576152338
        }
      }
    },
    nonce: '1234567890',
    requested_predicates: {
      additionalProp1: {
        name: 'index',
        restrictions: [
          {
            schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
            issuer_did: 'WgWxqztrNooG92RXvxSTWv',
            cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
            schema_name: 'transcript',
            schema_version: '1.0',
            schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
            credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
          }
        ],
        non_revoked: {
          to_epoch: 1576152338,
          from_epoch: 1576152338
        }
      }
    },
    version: '1.0'
  }
}

describe('[package] @ula-aca/present-proof', () => {
  describe('[plugin] PresentProofController', () => {
    let eventHandler: EventHandler
    let presentProofControllerPlugin: PresentProofController
    let presentProofApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      presentProofControllerPlugin = new PresentProofController()
      presentProofControllerPlugin.initialize(eventHandler)
    })

    afterEach(() => {
      presentProofApiStubbed && presentProofApiStubbed.restore()
    })
    it("plugin name should be '@ula-aca/present-proof/PresentProofController'", () => {
      presentProofControllerPlugin.name.should.equal(
        '@ula-aca/present-proof/PresentProofController'
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

          const response = await presentProofControllerPlugin.handleEvent(
            message,
            () => {}
          )

          response.should.equal('ignored')
        }
      })
    })

    describe('events', () => {
      it('@ula-aca/present-proof/get-exchange-records', async () => {
        const data = {
          results: [
            {
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
          ]
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.GET_EXCHANGE_RECORDS
        } as GetExchangeRecordsMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/get-exchange-record-by-id', async () => {
        const presentationExchangeId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsPresExIdGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.GET_EXCHANGE_RECORD_BY_ID,
          body: {
            presentation_exchange_id: presentationExchangeId
          }
        } as GetExchangeRecordByIdMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationExchangeId
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/get-presentation-request-credentials', async () => {
        const presentationExchangeId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const start = '1'
        const count = '1'
        const extraQuery = 'extra'

        const data = [
          {
            cred_info: {
              referent: '',
              attrs: {
                first_name: 'alice'
              },
              schema_id: 'schema_id',
              cred_def_id: 'cred_def_id',
              rev_reg_id: 'rev_reg_id',
              cred_rev_id: 'cred_rev_id'
            },
            interval: 'string',
            presentation_referents: ['something']
          }
        ]
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsPresExIdCredentialsGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS,
          body: {
            presentation_exchange_id: presentationExchangeId,
            start,
            count,
            extra_query: extraQuery
          }
        } as GetRequestCredentialsMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationExchangeId,
              start,
              count,
              extraQuery
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/get-presentation-request-credentials-with-referent', async () => {
        const presentationExchangeId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const referent = '5717-4562-b3fc-2c963f66afa6-3fa85f64'
        const start = '1'
        const count = '1'
        const extraQuery = 'extra'

        const data = {
          "we-don't-know-what-this-returns": 'but-this-tests-that',
          'it-will-return': 'what-is-returned',
          'if-it-would': 'return-something'
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsPresExIdCredentialsReferentGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type:
            PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS_WITH_REFERENT,
          body: {
            presentation_exchange_id: presentationExchangeId,
            referent,
            start,
            count,
            extra_query: extraQuery
          }
        } as GetPresentationRequestCredentialsByReferentIdMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationExchangeId,
              referent,
              start,
              count,
              extraQuery
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/send-proposal', async () => {
        const presentationProposalRequest = {
          connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          presentation_proposal: {
            '@type':
              'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/present-proof/1.0/presentation-preview',
            attributes: [
              {
                name: 'favourite_drink',
                cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                'mime-type': 'image/jpeg',
                value: 'martini'
              }
            ],
            predicates: [
              {
                name: 'high_score',
                cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                predicate: '>=',
                threshold: 0
              }
            ]
          },
          comment: 'string',
          auto_present: true
        }

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
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofSendProposalPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.SEND_PROPOSAL,
          body: presentationProposalRequest
        } as SendProposalMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationProposalRequest
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/create-presentation-request', async () => {
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
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofCreateRequestPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.CREATE_PRESENTATION_REQUEST,
          body: presentationRequestRequest
        } as CreatePresentationRequestMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationRequestRequest
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/send-request', async () => {
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
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofSendRequestPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.SEND_REQUEST,
          body: presentationRequestRequest
        } as SendRequestMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationRequestRequest
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/send-proof-presentation-request-by-id', async () => {
        const presentationExchangeId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsPresExIdSendRequestPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.SEND_REQUEST_BY_ID,
          body: {
            presentation_exchange_id: presentationExchangeId,
            ...presentationRequestRequest
          }
        } as SendRequestByIdMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationExchangeId,
              presentationRequestRequest
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/send-presentation', async () => {
        const presentationExchangeId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const presentationRequest = {
          self_attested_attributes: {
            additionalProp1: 'self_attested_value',
            additionalProp2: 'self_attested_value',
            additionalProp3: 'self_attested_value'
          },
          requested_attributes: {
            additionalProp1: {
              revealed: true,
              cred_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            },
            additionalProp2: {
              revealed: true,
              cred_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            },
            additionalProp3: {
              revealed: true,
              cred_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            }
          },
          requested_predicates: {
            additionalProp1: {
              cred_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            },
            additionalProp2: {
              cred_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            },
            additionalProp3: {
              cred_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            }
          }
        }

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
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsPresExIdSendPresentationPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.SEND_PRESENTATION,
          body: {
            presentation_exchange_id: presentationExchangeId,
            ...presentationRequest
          }
        } as SendPresentationMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationExchangeId,
              presentationRequest
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/verify-presentation', async () => {
        const presentationExchangeId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsPresExIdVerifyPresentationPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.VERIFY_PRESENTATION,
          body: {
            presentation_exchange_id: presentationExchangeId
          }
        } as VerifyPresentationMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationExchangeId
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('@ula-aca/present-proof/remove-exchange-record', async () => {
        const presentationExchangeId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const data = {
          "we-don't-know-what-this-returns": 'but-this-tests-that',
          'it-will-return': 'what-is-returned',
          'if-it-would': 'return-something'
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsPresExIdRemovePost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.REMOVE_EXCHANGE_RECORD,
          body: {
            presentation_exchange_id: presentationExchangeId
          }
        } as RemoveExchangeRecordMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnceWithExactly(
              presentationExchangeId
            )
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })
  })
})
