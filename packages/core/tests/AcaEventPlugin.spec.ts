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

import { UlaCallback, AcaEventPlugin } from '../src'

class TestEventPlugin extends AcaEventPlugin {
  get name(): string {
    return '@ula-aca/core/TestEventPlugin'
  }

  public async getUlaResponse(): Promise<UlaResponse> {
    const response = new UlaResponse({
      statusCode: 200,
      body: {}
    })

    return Promise.resolve(response)
  }

  @AcaEventPlugin.handleError
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
  describe('[plugin] AcaEventPlugin', () => {
    it('should throw an error when trying to access the eventHandler while the plugin is not initialized', () => {
      const testEventPlugin = new TestEventPlugin()

      const getEventHandler = (): EventHandler => testEventPlugin.eventHandler

      getEventHandler.should.throw(
        'Plugin not initialized. Did you forget to call initialize() ?'
      )
    })

    it('eventHandler property should be accessible after the plugin is initialized', () => {
      const testEventPlugin = new TestEventPlugin()
      const eventHandler = new EventHandler([])
      testEventPlugin.initialize(eventHandler)

      testEventPlugin.eventHandler.should.equal(eventHandler)
    })

    describe('@AcaControllerPlugin.handleError()', () => {
      let testEventPlugin: TestEventPlugin
      let eventHandler: EventHandler
      let getUlaResponseStubbed: sinon.SinonStub<[], Promise<UlaResponse>>

      beforeEach(() => {
        testEventPlugin = new TestEventPlugin()
        eventHandler = new EventHandler([])
        testEventPlugin.initialize(eventHandler)
      })

      afterEach(() => {
        // eslint-disable-next-line no-unused-expressions
        getUlaResponseStubbed && getUlaResponseStubbed.restore()
      })

      it("should return 'error' when the decorated function throws", async () => {
        const message = new Message({
          type: 'test-event'
        })
        getUlaResponseStubbed = sinon
          .stub(TestEventPlugin.prototype, 'getUlaResponse')
          .rejects()

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const result = await testEventPlugin.handleEvent(message, () => {})

        result.should.equal('error')
      })

      it('should call the callback with the the error and status 500 when the decorated function throws', () => {
        const data = new Error('Thrown error')
        const status = 500

        const expectedResult = new UlaResponse({
          statusCode: status,
          body: {
            error: data
          }
        })

        getUlaResponseStubbed = sinon
          .stub(TestEventPlugin.prototype, 'getUlaResponse')
          .rejects(data)

        testEventPlugin.handleEvent(
          new Message({ type: 'test-event' }),
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })
    })
  })
})
