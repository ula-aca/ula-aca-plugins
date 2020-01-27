/*
 * Copyright 2020-present ula-aca
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
import { LedgerApi } from '@ula-aca/aries-cloudagent-interface'
import {
  stubInterfaceFunction,
  stubNoAxiosResponseInterfaceFunction,
  stubInterfaceRejectsFunction
} from '@ula-aca/test-utils'
import {
  LedgerController,
  GetTransactionAuthorAgreementMessage,
  RegisterNymMessage,
  GetEndpointByDidMessage,
  AcceptTransactionAuthorAgreementMessage,
  GetVerkeyByDidMessage
} from '../src'

describe('[package] @ula-aca/ledger', () => {
  describe('[plugin] LedgerController', () => {
    let eventHandler: EventHandler
    let ledgerPlugin: LedgerController
    let ledgerApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      ledgerPlugin = new LedgerController('http://url.test')
      ledgerPlugin.initialize(eventHandler)
    })

    afterEach(() => {
      ledgerApiStubbed && ledgerApiStubbed.restore()
    })
    it("plugin name should be '@ula-aca/ledger/LedgerController'", () => {
      ledgerPlugin.name.should.equal('@ula-aca/ledger/LedgerController')
    })

    describe('[function] handleEvent()', () => {
      it("should return 'ignored' when an unknown message type is passed", async () => {
        const ignoreMessageTypes = [
          'get-taa',
          'random-message',
          'a',
          'register-naim'
        ]

        for (const messageType of ignoreMessageTypes) {
          const message = new Message({
            type: messageType
          })

          const response = await ledgerPlugin.handleEvent(message, () => {})

          response.should.equal('ignored')
        }
      })

      it("should return 'error' when statusCode is not in range 200-299", async () => {
        const statusCode = 300
        const expectedResult = 'error'

        ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerTaaGet',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/get-transaction-author-agreement'
        } as GetTransactionAuthorAgreementMessage)

        const eventRes = await ledgerPlugin.handleEvent(message, () => {})

        eventRes.should.equal(expectedResult)
      })

      it('should call the callback with the error and statusCode when an API call fails', async () => {
        const body = {
          mechanism: 'string',
          version: 'string',
          text: 'string'
        }
        const data = '400: Bad Request'
        const statusCode = 400

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerTaaAcceptPost',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type: '@ula-aca/ledger/accept-transaction-author-agreement',
          body
        } as AcceptTransactionAuthorAgreementMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          res.should.deep.equal(expectedResult)
        })
      })

      it('should call the callback with the the axiosErr and status 500 when there is no response from the API', async () => {
        const body = {
          mechanism: 'string',
          version: 'string',
          text: 'string'
        }

        const data = {
          message: 'Error'
        }
        const statusCode = 500

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        ledgerApiStubbed = stubNoAxiosResponseInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerTaaAcceptPost',
          data
        })

        const message = new Message({
          type: '@ula-aca/ledger/accept-transaction-author-agreement',
          body
        } as AcceptTransactionAuthorAgreementMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          res.should.deep.equal(expectedResult)
        })
      })

      it('should call the callback with the the error and status 500 when the error is not an AxiosError', async () => {
        const body = {
          mechanism: 'string',
          version: 'string',
          text: 'string'
        }

        const data = new Error('Something went wrong')
        const statusCode = 500

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        ledgerApiStubbed = stubInterfaceRejectsFunction({
          Class: LedgerApi,
          functionName: 'ledgerTaaAcceptPost',
          data
        })

        const message = new Message({
          type: '@ula-aca/ledger/accept-transaction-author-agreement',
          body
        } as AcceptTransactionAuthorAgreementMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          res.should.deep.equal(expectedResult)
        })
      })
    })

    describe('events', () => {
      it('@ula-aca/ledger/register-nym', async () => {
        const did = '2gv3WyywspB2mYAwe2Sdp4'
        const verkey = 'vNGkvdXNyyvTPfhvXNRLFk28pjiCNMyYiEmxrvYkXz2'
        const alias = 'MyNym'
        const role = 'TRUST_ANCHOR'

        const data = {
          'returns-nothing': 'but-this-tests-that',
          'it-will-return': 'what-is-returned',
          'if-it-would': 'return-something'
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerRegisterNymPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/register-nym',
          body: {
            did,
            verkey,
            alias,
            role
          }
        } as RegisterNymMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.calledOnceWithExactly(
            did,
            verkey,
            alias,
            role
          )
          res.should.deep.equal(expectedResult)
        })
      })

      it('@ula-aca/ledger/get-verkey-by-did', async () => {
        const did = '2gv3WyywspB2mYAwe2Sdp4'

        const data = {
          verkey: 'FL8LysUdgqABauZipoRVJwjycGggdNS54w7UQyjMjSmM'
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerDidVerkeyGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/get-verkey-by-did',
          body: {
            did
          }
        } as GetVerkeyByDidMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.calledOnceWithExactly(did)
          res.should.deep.equal(expectedResult)
        })
      })

      it('@ula-aca/ledger/get-endpoint-by-did', async () => {
        const did = '2gv3WyywspB2mYAwe2Sdp4'

        const data = {
          endpoint: 'http://alice-aca-py:8000'
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerDidEndpointGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/get-endpoint-by-did',
          body: {
            did
          }
        } as GetEndpointByDidMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.calledOnceWithExactly(did)
          res.should.deep.equal(expectedResult)
        })
      })

      it('@ula-aca/ledger/get-transaction-author-agreement', async () => {
        const data = {
          result: {
            aml_record: null,
            taa_record: null,
            taa_required: false,
            taa_accepted: null
          }
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerTaaGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/get-transaction-author-agreement'
        } as GetTransactionAuthorAgreementMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })

      describe('@ula-aca/ledger/accept-transaction-author-agreement', () => {
        it('should pass the parameters to LedgerApi function ledgerTaaAcceptPost', async () => {
          const body = {
            mechanism: 'mechanism',
            version: '1.0',
            text: 'text'
          }

          const data = {
            "don't-know-if-it-returns-something": 'but-this-tests-that',
            'it-will-return': 'what-is-returned',
            'if-it-would': 'return-something'
          }
          const statusCode = 200

          const expectedResult = new UlaResponse({
            body: data,
            statusCode
          })

          ledgerApiStubbed = stubInterfaceFunction({
            Class: LedgerApi,
            functionName: 'ledgerTaaAcceptPost',
            data,
            status: statusCode
          })

          const message = new Message({
            type: '@ula-aca/ledger/accept-transaction-author-agreement',
            body
          } as AcceptTransactionAuthorAgreementMessage)

          await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
            ledgerApiStubbed.should.have.been.calledOnceWithExactly(body)
            res.should.deep.equal(expectedResult)
          })
        })

        it('should work when no body is passed', async () => {
          const data = {
            "don't-know-if-it-returns-something": 'but-this-tests-that',
            'it-will-return': 'what-is-returned',
            'if-it-would': 'return-something'
          }
          const statusCode = 200

          const expectedResult = new UlaResponse({
            body: data,
            statusCode
          })

          ledgerApiStubbed = stubInterfaceFunction({
            Class: LedgerApi,
            functionName: 'ledgerTaaAcceptPost',
            data,
            status: statusCode
          })

          const message = new Message({
            type: '@ula-aca/ledger/accept-transaction-author-agreement'
          } as AcceptTransactionAuthorAgreementMessage)

          await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
            ledgerApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          })
        })
      })
    })
  })
})
