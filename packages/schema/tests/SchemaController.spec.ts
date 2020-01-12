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
import { SchemaApi } from '@ula-aca/aries-cloudagent-interface'
import { stubInterfaceFunction } from '@ula-aca/test-utils'
import {
  SchemaController,
  GetCreatedSchemasMessage,
  CreateSchemaMessage,
  GetSchemaByIdMessage
} from '../src'

describe('[package] @ula-aca/schema', () => {
  describe('[plugin] SchemaController', () => {
    let eventHandler: EventHandler
    let schemaPlugin: SchemaController
    let schemaApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      schemaPlugin = new SchemaController('http://url.test')
      schemaPlugin.initialize(eventHandler)
    })

    afterEach(() => {
      schemaApiStubbed && schemaApiStubbed.restore()
    })

    it("plugin name should be '@ula-aca/schema/SchemaController'", () => {
      schemaPlugin.name.should.equal('@ula-aca/schema/SchemaController')
    })

    describe('[function] handleEvent()', () => {
      it("should return 'ignored' when an unknown message type is passed", async () => {
        const ignoreMessageTypes = [
          'create-shem',
          'random-message',
          'a',
          'get-schema'
        ]

        for (const messageType of ignoreMessageTypes) {
          const message = new Message({
            type: messageType
          })

          const response = await schemaPlugin.handleEvent(message, () => {})

          response.should.equal('ignored')
        }
      })

      it("should return 'error' when statusCode is not in range 200-299", async () => {
        const statusCode = 300
        const expectedResult = 'error'

        schemaApiStubbed = stubInterfaceFunction({
          Class: SchemaApi,
          functionName: 'schemasCreatedGet',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/schema/get-created-schemas'
        } as GetCreatedSchemasMessage)

        const eventRes = await schemaPlugin.handleEvent(message, () => {})

        eventRes.should.equal(expectedResult)
      })

      it('should call the callback with the error and statusCode when an API call fails', async () => {
        const schemaId = 'Non-existent schema id'
        const data = '500 Internal Server Error\n\nServer got itself in trouble'

        const statusCode = 500

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        schemaApiStubbed = stubInterfaceFunction({
          Class: SchemaApi,
          functionName: 'schemasIdGet',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type: '@ula-aca/schema/get-schema-by-id',
          payload: { schemaId }
        } as GetSchemaByIdMessage)

        await schemaPlugin.handleEvent(message, (res: UlaResponse) => {
          res.should.deep.equal(expectedResult)
        })
      })

      describe('events', () => {
        describe('@ula-aca/schema/get-created-schemas', () => {
          it('should pass the parameters to SchemaApi function schemasCreatedGet', async () => {
            const schemaId = 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0'
            const schemaIssuerDid = 'WgWxqztrNooG92RXvxSTWv'
            const schemaName = 'schema_name'
            const schemaVersion = '1.0'

            const data = {
              schema_ids: ['WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0']
            }
            const statusCode = 200

            const expectedResult = new UlaResponse({
              body: data,
              statusCode
            })

            schemaApiStubbed = stubInterfaceFunction({
              Class: SchemaApi,
              functionName: 'schemasCreatedGet',
              data,
              status: statusCode
            })

            const message = new Message({
              type: '@ula-aca/schema/get-created-schemas',
              payload: { schemaId, schemaIssuerDid, schemaName, schemaVersion }
            } as GetCreatedSchemasMessage)

            await schemaPlugin.handleEvent(message, (res: UlaResponse) => {
              schemaApiStubbed.should.have.been.calledWith(
                schemaId,
                schemaIssuerDid,
                schemaName,
                schemaVersion
              )
              res.should.deep.equal(expectedResult)
            })
          })

          it('should work when no payload is passed', async () => {
            const data = {
              schema_ids: ['WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0']
            }
            const statusCode = 200

            const expectedResult = new UlaResponse({
              body: data,
              statusCode
            })

            schemaApiStubbed = stubInterfaceFunction({
              Class: SchemaApi,
              functionName: 'schemasCreatedGet',
              data,
              status: statusCode
            })

            const message = new Message({
              type: '@ula-aca/schema/get-created-schemas'
            } as GetCreatedSchemasMessage)

            await schemaPlugin.handleEvent(message, (res: UlaResponse) => {
              schemaApiStubbed.should.have.been.calledWith()
              res.should.deep.equal(expectedResult)
            })
          })
        })

        it('@ula-aca/schema/get-schema-by-id', async () => {
          const schemaId = 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0'

          const data = {
            schema_json: {
              attr_names: ['score'],
              name: 'schema_name',
              version: '1.0',
              ver: '1.0',
              seqNo: 999,
              id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0'
            }
          }
          const statusCode = 200

          const expectedResult = new UlaResponse({
            body: data,
            statusCode
          })

          schemaApiStubbed = stubInterfaceFunction({
            Class: SchemaApi,
            functionName: 'schemasIdGet',
            data,
            status: statusCode
          })

          const message = new Message({
            type: '@ula-aca/schema/get-schema-by-id',
            payload: { schemaId }
          } as GetSchemaByIdMessage)

          await schemaPlugin.handleEvent(message, (res: UlaResponse) => {
            schemaApiStubbed.should.have.been.calledWith(schemaId)
            res.should.deep.equal(expectedResult)
          })
        })

        it('@ula-aca/schema/create-schema', async () => {
          const attributes = ['first_name', 'last_name']
          const schemaName = 'schema_name'
          const schemaVersion = '1.0'

          const data = {
            schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0'
          }
          const statusCode = 200

          const expectedResult = new UlaResponse({
            body: data,
            statusCode
          })

          schemaApiStubbed = stubInterfaceFunction({
            Class: SchemaApi,
            functionName: 'schemasPost',
            data,
            status: statusCode
          })

          const message = new Message({
            type: '@ula-aca/schema/create-schema',
            payload: { attributes, schemaName, schemaVersion }
          } as CreateSchemaMessage)

          await schemaPlugin.handleEvent(message, (res: UlaResponse) => {
            schemaApiStubbed.should.have.been.calledWith({
              schema_name: schemaName,
              schema_version: schemaVersion,
              attributes
            })
            res.should.deep.equal(expectedResult)
          })
        })
      })
    })
  })
})
