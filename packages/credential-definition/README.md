# Universal Ledger Agent - Aries Cloudagent Credential Definition Plugin

This package handles everything that has to do with credential definitions in Hyperledger Aries. It has classes to perform credential definition related actions.

## Usage

### CredentialDefinitionController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { CredentialDefinitionController } from '@ula-aca/credential-definition'

const credentialDefinitionController = new CredentialDefinitionController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([credentialDefinitionController])
```

#### @ula-aca/credential-definition/get-credential-definition-by-id

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialDefinitionController,
  GetCredentialDefinitionByIdMessage,
  CredentialDefinitionMessageTypes
} from '@ula-aca/credential-definition'

const credentialDefinitionController = new CredentialDefinitionController(
  'https://aca-py-api.test'
)

const eventHandler = new EventHandler([credentialDefinitionController])

const message: GetCredentialDefinitionByIdMessage = {
  type: CredentialDefinitionMessageTypes.GET_CREDENTIAL_DEFINITION_BY_ID,
  payload: {
    credentialDefinitionId: 'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'
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

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialDefinitionController,
  GetCreatedCredentialDefinitionsMessage,
  CredentialDefinitionMessageTypes
} from '@ula-aca/credential-definition'

const credentialDefinitionController = new CredentialDefinitionController(
  'https://aca-py-api.test'
)

const eventHandler = new EventHandler([credentialDefinitionController])

const message: GetCreatedCredentialDefinitionsMessage = {
  type: CredentialDefinitionMessageTypes.GET_CREATED_CREDENTIAL_DEFINITIONS,
  payload: {
    // schemaId: '',
    // schemaIssuerDid: '',
    // schemaName: '',
    // schemaVersion: '',
    // issuerDid: '',
    // credentialDefinitionId: ''
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

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialDefinitionController,
  CreateCredentialDefinitionMessage,
  CredentialDefinitionMessageTypes
} from '@ula-aca/credential-definition'

const credentialDefinitionController = new CredentialDefinitionController(
  'https://aca-py-api.test'
)

const eventHandler = new EventHandler([credentialDefinitionController])

const message: CreateCredentialDefinitionMessage = {
  type: CredentialDefinitionMessageTypes.CREATE_CREDENTIAL_DEFINITION,
  payload: {
    tag: 'my-cred-def',
    schemaId: 'Bqqp9wananY4uW2pRHACiT:2:Test:1.0'
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
