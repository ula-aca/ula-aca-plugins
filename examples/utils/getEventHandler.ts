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

import { EventHandler, Plugin } from 'universal-ledger-agent'

import { ConnectionController } from '@ula-aca/connection'
import { AcaControllerPluginOptions } from '@ula-aca/core'
import { CredentialDefinitionController } from '@ula-aca/credential-definition'
import { CredentialController } from '@ula-aca/credential/src'
import { IssueCredentialController } from '@ula-aca/issue-credential'
import { PresentProofController } from '@ula-aca/present-proof'
import { SchemaController } from '@ula-aca/schema'
import {
  WebhookRelayEventRouter,
  WebhookRelayOptions
} from '@ula-aca/webhook-relay-event-router'

function getEventHandler({
  acaUrl,
  acaWhrUrl,
  acaWhrApiKey,
  webhookEventHandlerPlugins = []
}: {
  acaUrl: string
  acaApiKey?: string
  acaWhrUrl: string
  acaWhrApiKey?: string
  webhookEventHandlerPlugins?: Plugin[]
}): EventHandler {
  // Standard Plugins
  const controllerConfiguration: AcaControllerPluginOptions = {
    basePath: acaUrl
  }

  const webhookRelayRouterConfiguration: WebhookRelayOptions = {
    url: acaWhrUrl,
    apiKey: acaWhrApiKey,
    fastForward: false
  }

  const connectionController = new ConnectionController(controllerConfiguration)
  const schemaController = new SchemaController(controllerConfiguration)
  const issueCredentialController = new IssueCredentialController(
    controllerConfiguration
  )
  const presentProofController = new PresentProofController(
    controllerConfiguration
  )
  const credentialDefinitionController = new CredentialDefinitionController(
    controllerConfiguration
  )
  const credentialController = new CredentialController(controllerConfiguration)

  const webhookRelay = new WebhookRelayEventRouter(
    webhookRelayRouterConfiguration
  )

  const eventHandler = new EventHandler([
    schemaController,
    credentialDefinitionController,
    connectionController,
    presentProofController,
    issueCredentialController,
    credentialController,
    webhookRelay,
    ...webhookEventHandlerPlugins
  ])

  return eventHandler
}

export { getEventHandler }
