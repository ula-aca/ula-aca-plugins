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
  CreateLocalDidResult,
  GetDidsResult,
  FetchPublicDidResult,
  SetTagPolicyResult,
  GetTagPolicyResult,
  AssignPublicDidResult
} from '@ula-aca/wallet'

import faker from 'faker'
import {
  createLocalDid,
  getDids,
  getTestDids,
  fetchPublicDid,
  setTagPolicy,
  getTagPolicy,
  assignPublicDid
} from './utils/wallet'

import { getEventHandler } from './utils'
import { getExistingCredentialDefinitionIds } from './utils/credentialDefinition'

describe('[package] @ula-aca/wallet', () => {
  describe('[plugin] WalletController', () => {
    const eventHandler: EventHandler = getEventHandler({
      acaUrl: process.env.FABER_ACA_URL,
      acaApiKey: process.env.FABER_ACA_API_KEY,
      acaWhrUrl: process.env.FABER_ACA_WHR_URL,
      acaWhrApiKey: process.env.FABER_ACA_WHR_API_KEY
    })

    let testDids: {
      did: string
      verkey: string
      public: boolean
    }[]

    let testCredDefIds: string[]

    before(async () => {
      testDids = await getTestDids(eventHandler, 3)
    })

    describe('@ula-aca/wallet/get-dids', () => {
      it('should return the test dids when all dids are retrieved', async () => {
        const response = await getDids(eventHandler)

        response.statusCode.should.equal(200)
        const result: GetDidsResult = response.body
        result.results.should.deep.contain.members(testDids)
      })

      it('should return the did(s) corresponding to the filters passed', async () => {
        for (const testDid of testDids) {
          const didResponse = await getDids(eventHandler, {
            did: testDid.did
          })
          didResponse.statusCode.should.equal(200)
          const didResult: GetDidsResult = didResponse.body
          didResult.results.should.deep.include(testDid)

          const verkeyResponse = await getDids(eventHandler, {
            verkey: testDid.verkey
          })
          verkeyResponse.statusCode.should.equal(200)
          const verkeyResult: GetDidsResult = verkeyResponse.body
          verkeyResult.results.should.deep.include(testDid)

          const publicResponse = await getDids(eventHandler, {
            verkey: testDid.verkey
          })
          publicResponse.statusCode.should.equal(200)
          const publicResult: GetDidsResult = publicResponse.body
          publicResult.results.should.deep.include(testDid)
        }
      })
    })

    it('@ula-aca/wallet/create-local-did', async () => {
      for (let i = 0; i < 3; i += 1) {
        const response = await createLocalDid(eventHandler)
        response.statusCode.should.equal(200)
        const result: CreateLocalDidResult = response.body

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        result.result.public.should.be.oneOf(['true', 'false'])
        result.result.did.should.be.a('string')
        result.result.verkey.should.be.a('string')
      }
    })

    it('@ula-aca/fetch-public-did', async () => {
      const response = await fetchPublicDid(eventHandler)

      response.statusCode.should.equal(200)
      const result: FetchPublicDidResult = response.body

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      result.result.public.should.be.oneOf(['true', 'false'])
      result.result.did.should.be.a('string')
      result.result.verkey.should.be.a('string')
    })

    it('@ula-aca/wallet/set-tagging-policy / @ula-aca/wallet/get-tagging-policy', async () => {
      testCredDefIds = await getExistingCredentialDefinitionIds(eventHandler, 3)

      for (const testCredDefId of testCredDefIds) {
        const taggables = Array.from(new Set(faker.lorem.words(5).split(' ')))

        const response = await setTagPolicy(eventHandler, {
          credential_definition_id: testCredDefId,
          taggables
        })

        response.statusCode.should.equal(200)
        const result: SetTagPolicyResult = response.body
        result.should.be.empty

        // Check if taggables are set by getting the tag policy
        const getTagPolicyResponse = await getTagPolicy(eventHandler, {
          credential_definition_id: testCredDefId
        })
        const getTagPolicyResult: GetTagPolicyResult = getTagPolicyResponse.body
        getTagPolicyResult.taggables.should.have.members(taggables)
      }
    })

    it('@ula-aca/wallet/assign-public-did', async () => {
      // IMPORTANT: We assign the current public did as the public did. Seems weird, but if we assign a random did
      // it won't have any permissions so we can't change the did back. To fix this we must register the newly created did
      // with the von-network before assigning as we already do in the network-setup docker compose file.
      const currentPublicDid = ((await fetchPublicDid(eventHandler)).body as FetchPublicDidResult).result

      const assignResponse = await assignPublicDid(eventHandler, {
        did: currentPublicDid.did
      })
      assignResponse.statusCode.should.equal(200)
      const assignResult: AssignPublicDidResult = assignResponse.body

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      assignResult.result.public.should.equal('true')
      assignResult.result.did.should.equal(currentPublicDid.did)
      assignResult.result.verkey.should.equal(currentPublicDid.verkey)
    })
  })
})
