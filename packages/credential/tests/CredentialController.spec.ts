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

import { CredentialsApi } from '@ula-aca/aries-cloudagent-interface'
import { stubInterfaceFunction } from '@ula-aca/test-utils'

import {
  CredentialController,
  GetCredentialsMessage,
  GetCredentialByIdMessage,
  RemoveCredentialMessage
} from '../src'

describe('[package] @ula-aca/credential', () => {
  describe('[plugin] CredentialController', () => {
    let eventHandler: EventHandler
    let credentialPlugin: CredentialController
    let credentialApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      credentialPlugin = new CredentialController()
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
    })

    describe('events', () => {
      describe('@ula-aca/credential/get-credentials', () => {
        it('should pass the parameters to CredentialsApi function credentialsGet', async () => {
          const start = '1'
          const count = '2'
          const wql = '{}'

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
            body: {
              start,
              count,
              wql
            }
          } as GetCredentialsMessage)

          await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
            credentialApiStubbed.should.have.been.calledWithExactly(
              start,
              count,
              wql
            )
            res.should.deep.equal(expectedResult)
          })
        })

        it('should work when no body is passed', async () => {
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
            type: '@ula-aca/credential/get-credentials'
          } as GetCredentialsMessage)

          await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
            credentialApiStubbed.should.have.been.calledOnce
            res.should.deep.equal(expectedResult)
          })
        })
      })

      it('@ula-aca/credential/get-credential-by-id', async () => {
        const credentialId = '3253a790-e776-49e2-a30b-7f63401a4540'

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
            credential_id: credentialId
          }
        } as GetCredentialByIdMessage)

        await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
          credentialApiStubbed.should.have.been.calledOnceWithExactly(
            credentialId
          )
          res.should.deep.equal(expectedResult)
        })
      })

      it('@ula-aca/credential/remove-credential', async () => {
        const credentialId = '3253a790-e776-49e2-a30b-7f63401a4540'

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

        credentialApiStubbed = stubInterfaceFunction({
          Class: CredentialsApi,
          functionName: 'credentialIdRemovePost',
          status: statusCode,
          data
        })

        const message = new Message({
          type: '@ula-aca/credential/remove-credential',
          body: {
            credential_id: credentialId
          }
        } as RemoveCredentialMessage)

        await credentialPlugin.handleEvent(message, (res: UlaResponse) => {
          credentialApiStubbed.should.have.been.calledOnceWithExactly(
            credentialId
          )
          res.should.deep.equal(expectedResult)
        })
      })
    })
  })
})
