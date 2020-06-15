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
/* eslint-disable no-underscore-dangle */
import {
  Plugin,
  UlaResponse,
  EventHandler,
  Message
} from 'universal-ledger-agent'

import { UlaCallback } from '.'

abstract class AcaEventPlugin implements Plugin {
  private _eventHandler?: EventHandler

  initialize(eventHandler: EventHandler): void {
    this._eventHandler = eventHandler
  }

  abstract get name(): string

  /**
   * Get the eventHandler
   *
   * @throws When plugin is not initialized
   */
  get eventHandler(): EventHandler {
    if (!this._eventHandler)
      throw new Error(
        'Plugin not initialized. Did you forget to call initialize() ?'
      )

    return this._eventHandler
  }

  abstract handleEvent(message: Message, callback: UlaCallback): Promise<string>

  static handleError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _target: any,
    _key: string,
    descriptor: PropertyDescriptor
  ): void {
    const fn = descriptor.value

    // eslint-disable-next-line no-param-reassign,func-names
    descriptor.value = async function (
      message: Message,
      callback: (res: UlaResponse) => Promise<void> | void
    ): Promise<string> {
      try {
        const response = await fn.apply(this, [message, callback])
        return response
      } catch (err) {
        const response = new UlaResponse({
          statusCode: 500,
          body: {
            error: err
          }
        })

        callback(response)
        return Promise.resolve('error')
      }
    }
  }
}

export { AcaEventPlugin }
