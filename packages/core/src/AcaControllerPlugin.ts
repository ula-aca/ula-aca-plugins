/* eslint-disable no-underscore-dangle */
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

import { AxiosError } from 'axios'
import {
  Plugin,
  UlaResponse,
  EventHandler,
  Message
} from 'universal-ledger-agent'

import {
  Configuration,
  ConfigurationParameters
} from '@ula-aca/aries-cloudagent-interface'

import { UlaCallback } from '.'

type AcaControllerPluginOptions = ConfigurationParameters

abstract class AcaControllerPlugin implements Plugin {
  protected apiConfig: Configuration

  private _eventHandler?: EventHandler

  constructor(options: AcaControllerPluginOptions = {}) {
    this.apiConfig = new Configuration({
      ...options
    })
  }

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

    // eslint-disable-next-line func-names,no-param-reassign
    descriptor.value = async function(
      message: Message,
      callback: UlaCallback
    ): Promise<string> {
      try {
        const result = await fn.apply(this, [message, callback])
        return result
      } catch (err) {
        let response: UlaResponse

        const axiosErr = err as AxiosError
        if (axiosErr.response) {
          response = new UlaResponse({
            statusCode: axiosErr.response.status,
            body: {
              error: axiosErr.response.data
            }
          })
        } else if (axiosErr.toJSON) {
          // couldn't get repsonse
          response = new UlaResponse({
            statusCode: 500,
            body: {
              error: axiosErr.toJSON()
            }
          })
        } else {
          // not an axios error
          response = new UlaResponse({
            statusCode: 500,
            body: {
              error: err
            }
          })
        }

        callback(response)
        return Promise.resolve('error')
      }
    }
  }
}

export { AcaControllerPlugin, AcaControllerPluginOptions }
