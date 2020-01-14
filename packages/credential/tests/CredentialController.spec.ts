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
import { WalletApi, CredentialsApi } from '@ula-aca/aries-cloudagent-interface'
import {
  stubInterfaceFunction,
  stubNoAxiosResponseInterfaceFunction,
  stubInterfaceRejectsFunction
} from '@ula-aca/test-utils'

import {
  CredentialController,
  GetCredentialsMessage,
  GetCredentialByIdMessage
} from '../src'
import { RemoveCredentialMessage } from '../src/messages/RemoveCredential'

describe('[package] @ula-aca/credential', () => {
  describe('[plugin] CredentialController', () => {
    let eventHandler: EventHandler
    let credentialPlugin: CredentialController
    let credentialApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      credentialPlugin = new CredentialController('http://url.test')
      credentialPlugin.initialize(eventHandler)
    })

    afterEach(() => {
      credentialApiStubbed && credentialApiStubbed.restore()
    })
    it("plugin name should be '@ula-aca/credential/CredentialController'", () => {
      credentialPlugin.name.should.equal(
        '@ula-aca/credential/CredentialController'
      )
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

          const response = await credentialPlugin.handleEvent(message, () => {})

          response.should.equal('ignored')
        }
      })

      it("should return 'error' when statusCode is not in range 200-299", async () => {
        const data = {
          results: [
            {
              schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
              witness: {
                omega:
                  '21 129EA8716C921058BB91826FD 21 8F19B91313862FE916C0 ...'
              },
              signature_correctness_proof: {},
              rev_reg: {
                accum:
                  '21 136D54EA439FC26F03DB4b812 21 123DE9F624B86823A00D ...'
              },
              cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
              signature: {},
              values: {
                additionalProp1: {
                  encoded:
                    '412821674062189604125602903860586582569826459817431467861859655321',
                  raw: 'Alex'
                },
                additionalProp2: {
                  encoded:
                    '412821674062189604125602903860586582569826459817431467861859655321',
                  raw: 'Alex'
                },
                additionalProp3: {
                  encoded:
                    '412821674062189604125602903860586582569826459817431467861859655321',
                  raw: 'Alex'
                }
              },
              rev_reg_id:
                'WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0'
            }
          ]
        }
        const statusCode = 300
        const expectedResult = 'error'

        credentialApiStubbed = stubInterfaceFunction({
          Class: CredentialsApi,
          functionName: 'credentialsGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/credential/get-credentials',
          body: {}
        } as GetCredentialsMessage)

        const eventRes = await credentialPlugin.handleEvent(message, () => {})

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

        credentialApiStubbed = stubInterfaceFunction({
          Class: CredentialsApi,
          functionName: 'credentialsGet',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type: '@ula-aca/credential/get-credentials',
          body: {}
        } as GetCredentialsMessage)

        await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
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

        credentialApiStubbed = stubNoAxiosResponseInterfaceFunction({
          Class: CredentialsApi,
          functionName: 'credentialsGet',
          data
        })

        const message = new Message({
          type: '@ula-aca/credential/get-credentials',
          body: {}
        } as GetCredentialsMessage)

        await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
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

        credentialApiStubbed = stubInterfaceRejectsFunction({
          Class: CredentialsApi,
          functionName: 'credentialsGet',
          data
        })

        const message = new Message({
          type: '@ula-aca/credential/get-credentials',
          body: {}
        } as GetCredentialsMessage)

        await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
          res.should.deep.equal(expectedResult)
        })
      })
    })

    describe('events', () => {
      it('@ula-aca/credential/get-credentials', async () => {
        const data = {
          results: [
            {
              schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
              witness: {
                omega:
                  '21 129EA8716C921058BB91826FD 21 8F19B91313862FE916C0 ...'
              },
              signature_correctness_proof: {},
              rev_reg: {
                accum:
                  '21 136D54EA439FC26F03DB4b812 21 123DE9F624B86823A00D ...'
              },
              cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
              signature: {},
              values: {
                additionalProp1: {
                  encoded:
                    '412821674062189604125602903860586582569826459817431467861859655321',
                  raw: 'Alex'
                },
                additionalProp2: {
                  encoded:
                    '412821674062189604125602903860586582569826459817431467861859655321',
                  raw: 'Alex'
                },
                additionalProp3: {
                  encoded:
                    '412821674062189604125602903860586582569826459817431467861859655321',
                  raw: 'Alex'
                }
              },
              rev_reg_id:
                'WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0'
            }
          ]
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        credentialApiStubbed = stubInterfaceFunction({
          Class: CredentialsApi,
          functionName: 'credentialsGet',
          status: statusCode,

          data
        })

        const message = new Message({
          type: '@ula-aca/credential/get-credentials',
          body: {}
        } as GetCredentialsMessage)

        await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
          credentialApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })
      it('@ula-aca/credential/get-credential-by-id', async () => {
        const data = {
          schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
          witness: {
            omega: '21 129EA8716C921058BB91826FD 21 8F19B91313862FE916C0 ...'
          },
          signature_correctness_proof: {},
          rev_reg: {
            accum: '21 136D54EA439FC26F03DB4b812 21 123DE9F624B86823A00D ...'
          },
          cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          signature: {},
          values: {
            additionalProp1: {
              encoded:
                '412821674062189604125602903860586582569826459817431467861859655321',
              raw: 'Alex'
            },
            additionalProp2: {
              encoded:
                '412821674062189604125602903860586582569826459817431467861859655321',
              raw: 'Alex'
            },
            additionalProp3: {
              encoded:
                '412821674062189604125602903860586582569826459817431467861859655321',
              raw: 'Alex'
            }
          },
          rev_reg_id:
            'WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0'
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        credentialApiStubbed = stubInterfaceFunction({
          Class: CredentialsApi,
          functionName: 'credentialIdGet',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/credential/get-credential-by-id',
          body: {
            credential_id: 'credential-id'
          }
        } as GetCredentialByIdMessage)

        await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
          credentialApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })

      it('@ula-aca/credential/get-credential-by-id', async () => {
        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        credentialApiStubbed = stubInterfaceFunction({
          Class: CredentialsApi,
          functionName: 'credentialIdRemovePost',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/credential/remove-credential',
          body: {
            credential_id: 'credential-id'
          }
        } as RemoveCredentialMessage)

        await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
          credentialApiStubbed.should.have.been.calledOnce
          res.should.deep.equal(expectedResult)
        })
      })
    })
  })
})
