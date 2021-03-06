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

import sinon from 'sinon'
import { EventHandler, Message, UlaResponse } from 'universal-ledger-agent'

import { WalletApi } from '@ula-aca/aries-cloudagent-interface'
import { stubInterfaceFunction } from '@ula-aca/test-utils'

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
      walletPlugin = new WalletController()
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
    })

    describe('events', () => {
      describe('@ula-aca/wallet/get-dids', () => {
        it('should pass the parameters to WalletApi function walletDidGet', async () => {
          const did = 'WgWxqztrNooG92RXvxSTWv'
          const verkey = 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'
          // eslint-disable-next-line no-underscore-dangle
          const _public = 'false'

          const data = {
            results: [
              {
                public: _public,
                did,
                verkey
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
            body: {
              public: _public,
              did,
              verkey
            }
          } as GetDidsMessage)

          await walletPlugin.handleEvent(message, (res: UlaResponse) => {
            walletApiStubbed.should.have.been.calledOnceWithExactly(
              did,
              verkey,
              _public
            )
            res.should.deep.equal(expectedResult)
          })
        })

        it('should work when no body is passed', async () => {
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
            type: '@ula-aca/wallet/get-dids'
          } as GetDidsMessage)

          await walletPlugin.handleEvent(message, (res: UlaResponse) => {
            walletApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          })
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
          type: '@ula-aca/wallet/create-local-did'
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
          type: '@ula-aca/wallet/fetch-public-did'
        } as FetchPublicDidMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })

      it('@ula-aca/wallet/assign-public-did', async () => {
        const did = 'did:sov:mnjkl98uipsndg2hdjdjuf7'

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
            did
          }
        } as AssignPublicDidMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnceWithExactly(did)
          res.should.deep.equal(expectedResult)
        })
      })

      it('@ula-aca/wallet/get-tagging-policy', async () => {
        const credentialDefinitionId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
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
            credential_definition_id: credentialDefinitionId
          }
        } as GetTagPolicyMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnceWithExactly(
            credentialDefinitionId
          )
          res.should.deep.equal(expectedResult)
        })
      })

      it('@ula-aca/wallet/set-tagging-policy', async () => {
        const credentialDefinitionId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        const postBody = {
          taggables: ['score']
        }
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
            ...postBody,
            credential_definition_id: credentialDefinitionId
          }
        } as SetTagPolicyMessage)

        await walletPlugin.handleEvent(message, (res: UlaResponse) => {
          walletApiStubbed.should.have.been.calledOnceWithExactly(
            credentialDefinitionId,
            postBody
          )
          res.should.deep.equal(expectedResult)
        })
      })
    })
  })
})
