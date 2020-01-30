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

/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from 'sinon'

// TODO: rename and improve functions

function stubInterfaceFunction({
  Class,
  functionName,
  status,
  data,
  rejects = false
}: {
  Class: any
  functionName: string
  status: number
  data?: any
  rejects?: boolean
}): sinon.SinonStub {
  const stub = sinon.stub(Class.prototype, functionName)

  if (rejects) {
    return stub.rejects({
      response: {
        status,
        data
      }
    })
  }

  return stub.resolves({
    status,
    data
  })
}

function stubInterfaceRejectsFunction({
  Class,
  functionName,
  data = undefined
}: {
  Class: any
  functionName: string
  data?: any
}): sinon.SinonStub {
  return sinon.stub(Class.prototype, functionName).rejects(data)
}

function stubNoAxiosResponseInterfaceFunction({
  Class,
  functionName,
  data
}: {
  Class: any
  functionName: string
  data: any
}): sinon.SinonStub {
  const stub = sinon.stub(Class.prototype, functionName)

  return stub.rejects({
    toJSON: () => data
  })
}

export * from './eventLogger'
export {
  stubInterfaceFunction,
  stubInterfaceRejectsFunction,
  stubNoAxiosResponseInterfaceFunction
}
