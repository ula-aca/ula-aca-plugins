# Universal Ledger Agent - Aries Cloudagent Credential Definition Plugin

This package handles everything that has to do with credential definitions in Hyperledger Aries. It allows to create and retrieve credential definitions from the ledger connected to the Aries Cloudagent.

## Usage

### CredentialDefinitionController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { CredentialDefinitionController } from '@ula-aca/credential-definition'

const credentialDefinitionController = new CredentialDefinitionController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([credentialDefinitionController])
```

#### @ula-aca/credential-definition/get-credential-definition-by-id

Gets a credential definition from the ledger

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialDefinitionController,
  GetCredentialDefinitionByIdMessage,
  CredentialDefinitionMessageTypes
} from '@ula-aca/credential-definition'

const credentialDefinitionController = new CredentialDefinitionController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([credentialDefinitionController])

const message: GetCredentialDefinitionByIdMessage = {
  type: CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID,
  body: {
    credential_definition_id: 'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /credential-definitions/{id} api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credential-definition/get_credential_definitions__id_
    const result: GetCredentialDefinitionByIdResult = response.body
  }
})
```

#### @ula-aca/credential-definition/get-created-credential-definitions

Search for matching credential definitions that agent originated

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialDefinitionController,
  GetCreatedCredentialDefinitionsMessage,
  CredentialDefinitionMessageTypes
} from '@ula-aca/credential-definition'

const credentialDefinitionController = new CredentialDefinitionController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([credentialDefinitionController])

const message: GetCreatedCredentialDefinitionsMessage = {
  type: CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS,
  body: {
    // schema_id: '',
    // schema_issuer_did: '',
    // schema_name: '',
    // schema_version: '',
    // issuer_did: '',
    // credential_definition_id: ''
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /credential-definitions/created api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credential-definition/get_credential_definitions_created
    const result: GetCreatedCredentialDefinitionsResult = response.body
  }
})
```

#### @ula-aca/credential-definition/create-credential-definition

Sends a credential definition to the ledger

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialDefinitionController,
  CreateCredentialDefinitionMessage,
  CredentialDefinitionMessageTypes
} from '@ula-aca/credential-definition'

const credentialDefinitionController = new CredentialDefinitionController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([credentialDefinitionController])

const message: CreateCredentialDefinitionMessage = {
  type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION,
  body: {
    tag: 'my-cred-def',
    schema_id: 'Bqqp9wananY4uW2pRHACiT:2:Test:1.0'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /credential-definitions post request api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credential-definition/post_credential_definitions
    const result: CreateCredentialDefinitionResult = response.body
  }
})
```

## Examples

For example usage see the [`examples/`](./examples) directory.
