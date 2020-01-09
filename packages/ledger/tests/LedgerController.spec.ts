/* eslint-disable @typescript-eslint/no-empty-function */
/*
 * Copyright 2020  ula-aca.
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
import { LedgerApi } from '@ula-aca/aries-cloudagent-interface'
import {
  LedgerController,
  GetTransactionAuthorAgreementMessage,
  RegisterNymMessage,
  GetVerkeyByDidPayload,
  GetEndpointByDidMessage,
  GetEndpointByDidPayload,
  AcceptTransactionAuthorAgreementMessage,
  GetVerkeyByDidMessage
} from '../src'

function stubInterfaceFunction({
  Class,
  functionName,
  status = 200,
  data = undefined
}): sinon.SinonStub {
  return sinon.stub(Class.prototype, functionName).resolves({
    status,
    data
  } as any)
}

describe('@ula-aca/ledger', () => {
  describe('LedgerController Plugin', () => {
    it("plugin name should be '@ula-aca/ledger/LedgerController'", () => {
      const acaUrl = 'http://fake'
      const ledgerPlugin = new LedgerController(acaUrl)

      ledgerPlugin.name.should.equal('@ula-aca/ledger/LedgerController')
    })

    describe('handleEvent()', () => {
      it('should only handle messages it is supposed to', async () => {
        const eventHandler = new EventHandler([])
        const acaUrl = 'http://ula.test:7002'
        const ledgerPlugin = new LedgerController(acaUrl)

        ledgerPlugin.initialize(eventHandler)

        const ingoreMessageTypes = [
          'register-naim',
          'random-message',
          'a',
          'get-taa'
        ]

        // eslint-disable-next-line no-restricted-syntax
        for (const messageType of ingoreMessageTypes) {
          const message = new Message({
            type: messageType
          })

          // eslint-disable-next-line @typescript-eslint/no-empty-function,no-await-in-loop
          const response = await ledgerPlugin.handleEvent(message, () => {})

          response.should.equal('ignored')
        }
      })

      it("should return 'error' when statusCode is not in 200", async () => {
        const eventHandler = new EventHandler([])
        const acaUrl = 'http://url.test'
        const ledgerPlugin = new LedgerController(acaUrl)
        ledgerPlugin.initialize(eventHandler)

        const statusCode = 300
        const expectedResult = 'error'

        const ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerTaaGet',
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/get-transaction-author-agreement'
        } as GetTransactionAuthorAgreementMessage)

        const eventRes = await ledgerPlugin.handleEvent(message, () => {})

        ledgerApiStubbed.restore()
        eventRes.should.equal(expectedResult)
      })
    })

    describe('events', () => {
      const eventHandler = new EventHandler([])
      const acaUrl = 'http://url.test'
      const ledgerPlugin = new LedgerController(acaUrl)
      ledgerPlugin.initialize(eventHandler)

      it('@ula-aca/ledger/register-nym', async () => {
        const did = '2gv3WyywspB2mYAwe2Sdp4'
        const verkey = 'vNGkvdXNyyvTPfhvXNRLFk28pjiCNMyYiEmxrvYkXz2'
        const alias = 'MyNym'
        const role = 'TRUST_ANCHOR'

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        const ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerRegisterNymPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/register-nym',
          payload: {
            did,
            verkey,
            alias,
            role
          }
        } as RegisterNymMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.calledWith(did, verkey, alias, role)
          res.should.deep.equal(expectedResult)
          ledgerApiStubbed.restore()
        })
      })

      it('@ula-aca/ledger/get-verkey-by-did', async () => {
        const did = '2gv3WyywspB2mYAwe2Sdp4'

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        const ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerDidVerkeyGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/get-verkey-by-did',
          payload: {
            did
          }
        } as GetVerkeyByDidMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.calledWith(did)
          res.should.deep.equal(expectedResult)
          ledgerApiStubbed.restore()
        })
      })

      it('@ula-aca/ledger/get-endpoint-by-did', async () => {
        const did = '2gv3WyywspB2mYAwe2Sdp4'

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        const ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerDidEndpointGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/get-endpoint-by-did',
          payload: {
            did
          }
        } as GetEndpointByDidMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.calledWith(did)
          res.should.deep.equal(expectedResult)
          ledgerApiStubbed.restore()
        })
      })

      it('@ula-aca/ledger/get-transaction-author-agreement', async () => {
        const data = {
          result: {
            aml_record: null,
            taa_record: null,
            taa_required: false,
            taa_accepted: null
          }
        }
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        const ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerTaaGet',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/get-transaction-author-agreement'
        } as GetTransactionAuthorAgreementMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.called
          res.should.deep.equal(expectedResult)
          ledgerApiStubbed.restore()
        })
      })

      it('@ula-aca/ledger/accept-transaction-author-agreement', async () => {
        const payload = {
          mechanism: 'mechanism',
          version: '1.0',
          text: 'text'
        }

        const data = {}
        const statusCode = 200

        const expectedResult = new UlaResponse({
          body: data,
          statusCode
        })

        const ledgerApiStubbed = stubInterfaceFunction({
          Class: LedgerApi,
          functionName: 'ledgerTaaAcceptPost',
          data,
          status: statusCode
        })

        const message = new Message({
          type: '@ula-aca/ledger/accept-transaction-author-agreement',
          payload
        } as AcceptTransactionAuthorAgreementMessage)

        await ledgerPlugin.handleEvent(message, (res: UlaResponse) => {
          ledgerApiStubbed.should.have.been.calledWith(payload)
          res.should.deep.equal(expectedResult)
          ledgerApiStubbed.restore()
        })
      })
    })
  })
})
