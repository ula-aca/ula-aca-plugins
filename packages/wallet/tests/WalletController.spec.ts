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
import { WalletApi } from '@ula-aca/aries-cloudagent-interface'
import {
  stubInterfaceFunction,
  stubNoAxiosResponseInterfaceFunction,
  stubInterfaceRejectsFunction
} from '@ula-aca/test-utils'
import {
  WalletController,
  GetDidsMessage,
  AssignPublicDidMessage,
  GetTagPolicyMessage,
  SetTagPolicyMessage,
  CreateLocalDidMessage,
  FetchPublicDidMessage
} from '../src'

describe('[package] @ula-aca/wallet', () => {
  describe('[plugin] WalletController', () => {
    let eventHandler: EventHandler
    let walletPlugin: WalletController
    let walletApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      walletPlugin = new WalletController('http://url.test')
      walletPlugin.initialize(eventHandler)
    })

    afterEach(() => {
      walletApiStubbed && walletApiStubbed.restore()
    })
    it("plugin name should be '@ula-aca/wallet/WalletController'", () => {
      walletPlugin.name.should.equal('@ula-aca/wallet/WalletController')
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

          const response = await walletPlugin.handleEvent(message, () => {})

          response.should.equal('ignored')
        }
      })

      it("should return 'error' when statusCode is not in range 200-299", async () => {
        const data = {
          results: [
            {
              public: false,
              did: 'WgWxqztrNooG92RXvxSTWv',
              verkey: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'
            }
          ]
        }
        const statusCode = 300
        const expectedResult = 'error'

        walletApiStubbed = stubInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletDidGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/wallet/get-dids',
          body: {}
        } as GetDidsMessage)

        const eventRes = await walletPlugin.handleEvent(message, () => {})

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

        walletApiStubbed = stubInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletDidGet',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type: '@ula-aca/wallet/get-dids',
          body: {}
        } as GetDidsMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          res.should.deep.equal(expectedResult)
        })
      })

      it('should call the callback with the the axiosErr and status 500 when there is no response from the API', async () => {
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

        walletApiStubbed = stubNoAxiosResponseInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletDidGet',
          data
        })

        const message = new Message({
          type: '@ula-aca/wallet/get-dids',
          body: {}
        } as GetDidsMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          res.should.deep.equal(expectedResult)
        })
      })

      it('should call the callback with the the error and status 500 when the error is not an AxiosError', async () => {
        const data = new Error('Something went wrong')
        const statusCode = 500

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        walletApiStubbed = stubInterfaceRejectsFunction({
          Class: WalletApi,
          functionName: 'walletDidGet',
          data
        })

        const message = new Message({
          type: '@ula-aca/wallet/get-dids',
          body: {}
        } as GetDidsMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          res.should.deep.equal(expectedResult)
        })
      })
    })

    describe('events', () => {
      it('@ula-aca/wallet/get-dids', async () => {
        const data = {
          results: [
            {
              public: false,
              did: 'WgWxqztrNooG92RXvxSTWv',
              verkey: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'
            }
          ]
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        walletApiStubbed = stubInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletDidGet',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/wallet/get-dids',
          body: {}
        } as GetDidsMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })
      it('@ula-aca/wallet/create-local-did', async () => {
        const data = {
          results: [
            {
              public: false,
              did: 'WgWxqztrNooG92RXvxSTWv',
              verkey: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'
            }
          ]
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        walletApiStubbed = stubInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletDidCreatePost',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/wallet/create-local-did',
          body: {}
        } as CreateLocalDidMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })
      it('@ula-aca/wallet/fetch-public-did', async () => {
        const data = {
          result: {
            public: false,
            did: 'WgWxqztrNooG92RXvxSTWv',
            verkey: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'
          }
        }

        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        walletApiStubbed = stubInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletDidPublicGet',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/wallet/fetch-public-did',
          body: {}
        } as FetchPublicDidMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })
      it('@ula-aca/wallet/assign-public-did', async () => {
        const data = {
          result: {
            public: false,
            did: 'WgWxqztrNooG92RXvxSTWv',
            verkey: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'
          }
        }

        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        walletApiStubbed = stubInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletDidPublicPost',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/wallet/assign-public-did',
          body: {
            did: 'did:sov:mnjkl98uipsndg2hdjdjuf7'
          }
        } as AssignPublicDidMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })
      it('@ula-aca/wallet/get-tagging-policy', async () => {
        const data = {
          taggables: ['score']
        }

        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        walletApiStubbed = stubInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletTagPolicyIdGet',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/wallet/get-tagging-policy',
          body: {
            credential_definition_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
          }
        } as GetTagPolicyMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })
      it('@ula-aca/wallet/set-tagging-policy', async () => {
        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        walletApiStubbed = stubInterfaceFunction({
          Class: WalletApi,
          functionName: 'walletTagPolicyIdPost',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/wallet/set-tagging-policy',
          body: {
            taggables: ['score']
          }
        } as SetTagPolicyMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })
    })
  })
})
