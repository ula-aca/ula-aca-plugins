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

import { EventHandler } from 'universal-ledger-agent'

import {
  RegisterNymResult,
  GetVerkeyByDidResult,
  GetEndpointByDidResult,
  GetTransactionAuthorAgreementResult
} from '@ula-aca/ledger'

import { getEventHandler } from './utils'
import {
  registerNym,
  getVerkeyByDid,
  getEndpointByDid,
  getTransactionAuthorAgreement
} from './utils/ledger'
import { getTestDids, fetchPublicDid } from './utils/wallet'

describe('[package] @ula-aca/ledger', () => {
  describe('[plugin] LedgerController', () => {
    const eventHandler: EventHandler = getEventHandler({
      acaUrl: process.env.FABER_ACA_URL,
      acaApiKey: process.env.FABER_ACA_API_KEY,
      acaWhrUrl: process.env.FABER_ACA_WHR_URL,
      acaWhrApiKey: process.env.FABER_ACA_WHR_API_KEY
    })

    let testDids: { verkey: string; did: string }[]

    before(async () => {
      testDids = await getTestDids(eventHandler, 3)
    })

    it('@ula-aca/ledger/register-nym', async () => {
      for (const testDid of testDids) {
        const response = await registerNym(eventHandler, testDid)

        response.statusCode.should.equal(200)
        const result: RegisterNymResult = response.body
        result.success.should.equal(true)
      }
    })

    it('@ula-aca/ledger/get-verkey-by-did', async () => {
      for (const testDid of testDids) {
        const response = await getVerkeyByDid(eventHandler, {
          did: testDid.did
        })

        response.statusCode.should.equal(200)
        const result: GetVerkeyByDidResult = response.body
        result.verkey.should.equal(testDid.verkey)
      }
    })

    describe('@ula-aca/ledger/get-endpoint-by-did', () => {
      it("should return 'null' for the endpoint when did is not public", async () => {
        for (const testDid of testDids) {
          const response = await getEndpointByDid(eventHandler, {
            did: testDid.did
          })

          response.statusCode.should.equal(200)
          const result: GetEndpointByDidResult = response.body
          result.should.have.property('endpoint', null)
        }
      })

      it('should return a string for the endpoint when did is public', async () => {
        const fetchDidResult = await fetchPublicDid(eventHandler)

        const response = await getEndpointByDid(eventHandler, {
          did: fetchDidResult.body.result.did
        })

        response.statusCode.should.equal(200)
        const result: GetEndpointByDidResult = response.body
        result.endpoint.should.be.a('string')
      })
    })

    it('@ula-aca/ledger/get-transaction-author-agreement', async () => {
      const response = await getTransactionAuthorAgreement(eventHandler)

      response.statusCode.should.equal(200)
      const result: GetTransactionAuthorAgreementResult = response.body

      result.result.should.have.property('taa_required')
      result.result.should.have.property('aml_record')
      result.result.should.have.property('taa_accepted')
      result.result.should.have.property('taa_record')
    })
  })
})
