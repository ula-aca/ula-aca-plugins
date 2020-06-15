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

import { AcaControllerPluginOptions } from '@ula-aca/core'
import { logEvent } from '@ula-aca/test-utils'
import {
  WebhookRelayEventRouter,
  WebhookRelayOptions
} from '@ula-aca/webhook-relay-event-router'

import { createInvitation, receiveInvitation } from '.'
import {
  ConnectionController,
  CreateInvitationBody,
  ConnectionMessageTypes,
  ReceiveInvitationBody
} from '../src'

async function run(): Promise<void> {
  const connControllerFaber = new ConnectionController({
    basePath: process.env.FABER_ACA_URL
  })

  const webhookRelayConfiguration: WebhookRelayOptions = {
    url: process.env.FABER_ACA_WHR_URL,
    apiKey: process.env.FABER_ACA_WHR_API_KEY,
    fastForward: false
  }

  const webhookRelayFaber = new WebhookRelayEventRouter(
    webhookRelayConfiguration
  )

  const eventHandlerFaber = new EventHandler([
    connControllerFaber,
    webhookRelayFaber
  ])

  const aliceConf: AcaControllerPluginOptions = {
    basePath: process.env.ALICE_ACA_URL
  }
  const connControllerAlice = new ConnectionController(aliceConf)
  const webhookRelayAlice = new WebhookRelayEventRouter(
    webhookRelayConfiguration
  )
  const eventHandlerAlice = new EventHandler([
    connControllerAlice,
    webhookRelayAlice
  ])

  // --- CREATE_INVITATION ---
  const createInvitationBody: CreateInvitationBody = {
    alias: 'Invitation created by Faber for Alice'
  }
  const createdInvitation = await createInvitation(
    eventHandlerFaber,
    createInvitationBody
  )

  logEvent({
    type: ConnectionMessageTypes.CREATE_INVITATION,
    comment: 'Faber created invitation',
    input: createInvitationBody,
    output: createdInvitation
  })

  // --- RECEIVE_INVITATION ---
  const receiveInvitationBody: ReceiveInvitationBody = {
    ...createdInvitation.invitation,
    alias: 'Invitation received by Alice from Faber'
  }

  const receivedInvitation = await receiveInvitation(
    eventHandlerAlice,
    receiveInvitationBody
  )
  logEvent({
    type: ConnectionMessageTypes.RECEIVE_INVITATION,
    comment: 'Alice received invitation',
    input: receiveInvitationBody,
    output: receivedInvitation
  })

  // WebSocket will keep running
  process.exit()
}

run().catch((e) => {
  console.log(e)
})
