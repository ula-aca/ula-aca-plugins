/* eslint-disable max-classes-per-file */
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
import { Message, UlaResponse, EventHandler } from 'universal-ledger-agent'

import { AcaControllerPlugin, UlaCallback } from '../src'

class TestControllerPlugin extends AcaControllerPlugin {
  get name(): string {
    return '@ula-aca/core/TestControllerPlugin'
  }

  public async getUlaResponse(): Promise<UlaResponse> {
    const response = new UlaResponse({
      statusCode: 200,
      body: {}
    })

    return Promise.resolve(response)
  }

  @AcaControllerPlugin.handleError
  public async handleEvent(
    _message: Message,
    callback: UlaCallback
  ): Promise<string> {
    const response = await this.getUlaResponse()

    callback(response)
    return 'success'
  }
}

describe('[package] @ula-aca/core', () => {
  describe('[plugin] AcaControllerPlugin', () => {
    it('should work without constructor params', () => {
      const testControllerPlugin = new TestControllerPlugin()
      testControllerPlugin.should.be.instanceOf(TestControllerPlugin)
    })

    it('should work with constructor params', () => {
      const testControllerPlugin = new TestControllerPlugin({
        basePath: 'https://aca.url'
      })
      testControllerPlugin.should.be.instanceOf(TestControllerPlugin)
    })

    it('should throw an error when trying to access the eventHandler while the plugin is not initialized', () => {
      const testControllerPlugin = new TestControllerPlugin()

      const getEventHandler = (): EventHandler =>
        testControllerPlugin.eventHandler

      getEventHandler.should.throw(
        'Plugin not initialized. Did you forget to call initialize() ?'
      )
    })

    it('eventHandler property should be accessible after the plugin is initialized', () => {
      const testControllerPlugin = new TestControllerPlugin()
      const eventHandler = new EventHandler([])
      testControllerPlugin.initialize(eventHandler)

      testControllerPlugin.eventHandler.should.equal(eventHandler)
    })

    describe('@AcaControllerPlugin.handleError()', () => {
      let testControllerPlugin: TestControllerPlugin
      let eventHandler: EventHandler
      let getUlaResponseStubbed: sinon.SinonStub<[], Promise<UlaResponse>>

      beforeEach(() => {
        testControllerPlugin = new TestControllerPlugin()
        eventHandler = new EventHandler([])
        testControllerPlugin.initialize(eventHandler)
      })

      afterEach(() => {
        getUlaResponseStubbed && getUlaResponseStubbed.restore()
      })

      it("should return 'error' when the decorated function throws", async () => {
        const message = new Message({
          type: 'test-event'
        })
        getUlaResponseStubbed = sinon
          .stub(TestControllerPlugin.prototype, 'getUlaResponse')
          .rejects()

        const result = await testControllerPlugin.handleEvent(message, () => {})

        result.should.equal('error')
      })

      it('should call the callback with the error response if the API call fails', () => {
        const data = '400: Bad Request'
        const status = 400

        const expectedResult = new UlaResponse({
          statusCode: status,
          body: {
            error: data
          }
        })

        getUlaResponseStubbed = sinon
          .stub(TestControllerPlugin.prototype, 'getUlaResponse')
          .rejects({
            response: {
              status,
              data
            }
          })

        testControllerPlugin.handleEvent(
          new Message({ type: 'test-event' }),
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('should call the callback with the axiosErr and response 500 when there is no response from the API', () => {
        const data = new Error('Axios Err')
        const status = 500

        const expectedResult = new UlaResponse({
          statusCode: status,
          body: {
            error: data
          }
        })

        getUlaResponseStubbed = sinon
          .stub(TestControllerPlugin.prototype, 'getUlaResponse')
          .rejects({
            toJSON: () => data
          })

        testControllerPlugin.handleEvent(
          new Message({ type: 'test-event' }),
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('should call the callback with the the error and status 500 when the error is not an AxiosError', () => {
        const data = new Error('Non axios error')
        const status = 500

        const expectedResult = new UlaResponse({
          statusCode: status,
          body: {
            error: data
          }
        })

        getUlaResponseStubbed = sinon
          .stub(TestControllerPlugin.prototype, 'getUlaResponse')
          .rejects(data)

        testControllerPlugin.handleEvent(
          new Message({ type: 'test-event' }),
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })
  })
})
