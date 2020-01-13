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

import { PresentProofApi } from '@ula-aca/aries-cloudagent-interface'
import { stubInterfaceFunction } from '@ula-aca/test-utils'
import { PresentationExchangeRecordState } from 'packages/aca-webhook-event-models/lib/PresentationExchangeRecordEvent'
import { SendRequestMessage } from 'packages/issue-credential/lib/issue-credential/src'
import {
  PresentProofController,
  GetPresentationExchangeRecordsMessage,
  GetPresentationRequestCredentialsMessage,
  GetPresentationRequestCredentialsByReferentIdMessage,
  SendPresentationProposalMessage,
  CreatePresentationRequestMessage,
  SendPresentationRequestMessage,
  SendPresentationRequestByIdMessage,
  SendPresentationMessage,
  VerifyPresentationMessage,
  RemovePresentationExchangeRecordMessage
} from '../src'
import {
  PresentProofMessageTypes,
  GetPresentationExchangeRecordByIdMessage
} from '../lib/present-proof/src/messages'

describe('[package] @ula-aca/present-proof', () => {
  describe('[plugin] PresentProofController', () => {
    let eventHandler: EventHandler
    let presentProofControllerPlugin: PresentProofController
    let presentProofApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      presentProofControllerPlugin = new PresentProofController(
        'http://url.test'
      )
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
      it("should return 'error' when statusCode is not in range 200-299", async () => {
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
        const statusCode = 300
        const expectedResult = 'error'

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.GET_EXCHANGE_RECORDS,
          body: {}
        } as GetPresentationExchangeRecordsMessage)

        const eventRes = await presentProofControllerPlugin.handleEvent(
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

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsGet',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type: PresentProofMessageTypes.GET_EXCHANGE_RECORDS,
          body: {}
        } as GetPresentationExchangeRecordsMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
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
        const statusCode = 300
        const expectedResult = 'error'

        presentProofApiStubbed = stubInterfaceFunction({
          Class: PresentProofApi,
          functionName: 'presentProofRecordsGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: PresentProofMessageTypes.GET_EXCHANGE_RECORDS,
          body: {}
        } as GetPresentationExchangeRecordsMessage)

        const eventRes = await presentProofControllerPlugin.handleEvent(
          message,
          () => {}
        )
        presentProofApiStubbed.should.have.been.calledOnce
        eventRes.should.equal(expectedResult)
      })
      it('@ula-aca/present-proof/get-exchange-record-by-id', async () => {
        const presentation_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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
            presentation_exchange_id
          }
        } as GetPresentationExchangeRecordByIdMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/get-presentation-request-credentials', async () => {
        const presentation_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const data = {}
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
            presentation_exchange_id
          }
        } as GetPresentationRequestCredentialsMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/get-presentation-request-credentials-with-referent', async () => {
        const presentation_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const referent = '5717-4562-b3fc-2c963f66afa6-3fa85f64'

        const data = {}
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
            presentation_exchange_id,
            referent
          }
        } as GetPresentationRequestCredentialsByReferentIdMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/send-proposal', async () => {
        const presentation_proposal_request = {
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
          body: presentation_proposal_request
        } as SendPresentationProposalMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/create-presentation-request', async () => {
        const presentation_request_request = {
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
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp2: {
                name: 'favouriteDrink',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp3: {
                name: 'favouriteDrink',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
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
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp2: {
                name: 'index',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp3: {
                name: 'index',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
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

        const data = {}
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
          body: presentation_request_request
        } as CreatePresentationRequestMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/send-request', async () => {
        const presentation_request_request = {
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
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp2: {
                name: 'favouriteDrink',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp3: {
                name: 'favouriteDrink',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
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
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp2: {
                name: 'index',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp3: {
                name: 'index',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
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
          body: presentation_request_request
        } as SendPresentationRequestMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/send-proof-presentation-request-by-id', async () => {
        const presentation_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const presentation_request_request = {
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
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp2: {
                name: 'favouriteDrink',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp3: {
                name: 'favouriteDrink',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
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
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp2: {
                name: 'index',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
                  }
                ],
                non_revoked: {
                  to_epoch: 1576152338,
                  from_epoch: 1576152338
                }
              },
              additionalProp3: {
                name: 'index',
                restrictions: [
                  {
                    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
                    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
                    schema_name: 'transcript',
                    schema_version: '1.0',
                    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
                    credential_definition_id:
                      'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
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
            presentation_exchange_id,
            ...presentation_request_request
          }
        } as SendPresentationRequestByIdMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/send-presentation', async () => {
        const presentation_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const presentation_request = {
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
            presentation_exchange_id,
            ...presentation_request
          }
        } as SendPresentationMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/verify-presentation', async () => {
        const presentation_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

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
            presentation_exchange_id
          }
        } as VerifyPresentationMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
      it('@ula-aca/present-proof/remove-exchange-record', async () => {
        const presentation_exchange_id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const data = {}
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
            presentation_exchange_id
          }
        } as RemovePresentationExchangeRecordMessage)

        await presentProofControllerPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            presentProofApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })
  })
})
