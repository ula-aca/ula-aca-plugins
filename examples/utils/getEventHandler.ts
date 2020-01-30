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
import { CredentialDefinitionController } from '@ula-aca/credential-definition'
import { IssueCredentialController } from '@ula-aca/issue-credential'
import { PresentProofController } from '@ula-aca/present-proof'
import { CredentialController } from '@ula-aca/credential/src'

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
  const connectionController = new ConnectionController(acaUrl)
  const schemaController = new SchemaController(acaUrl)
  const issueCredentialController = new IssueCredentialController(acaUrl)
  const presentProofController = new PresentProofController(acaUrl)
  const credentialDefinitionController = new CredentialDefinitionController(
    acaUrl
  )
  const credentialController = new CredentialController(acaUrl)

  const webhookRelay = new WebhookRelayEventRouter(acaWhrUrl, {
    headers: {
      Authorization: acaWhrApiKey
    }
  })

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
