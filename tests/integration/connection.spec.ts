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

import { CreateInvitationResult } from '@ula-aca/connection'

import { getEventHandler, getEventHandlerPlugins } from './utils'
import { createInvitation, receiveInvitation } from './utils/connection'

describe('[package] @ula-aca/credential-definition', () => {
  describe('[plugin] CredentialDefinitionController', () => {
    const faberHandlerPlugins = getEventHandlerPlugins()
    const faberEventHandler = getEventHandler({
      acaUrl: process.env.FABER_ACA_URL,
      acaApiKey: process.env.FABER_ACA_API_KEY,
      acaWhrUrl: process.env.FABER_ACA_WHR_URL,
      acaWhrApiKey: process.env.FABER_ACA_WHR_API_KEY,
      eventHandlerPlugins: Object.values(faberHandlerPlugins)
    })

    const aliceHandlerPlugins = getEventHandlerPlugins()
    const aliceEventHandler = getEventHandler({
      acaUrl: process.env.FABER_ACA_URL,
      acaApiKey: process.env.FABER_ACA_API_KEY,
      acaWhrUrl: process.env.FABER_ACA_WHR_URL,
      acaWhrApiKey: process.env.FABER_ACA_WHR_API_KEY,
      eventHandlerPlugins: Object.values(aliceHandlerPlugins)
    })

    it('auto', async () => {
      const invitationResponse = await createInvitation(faberEventHandler, {
        accept: 'auto',
        alias: 'FABER_TEST'
      })

      invitationResponse.statusCode.should.equal(200)
      const invitation = invitationResponse.body as CreateInvitationResult

      await receiveInvitation(aliceEventHandler, {
        ...invitation.invitation,
        accept: 'auto',
        alias: 'ALICE_TEST'
      })
    })
  })
})
